// server.js
// -------------------------------------------------------------
// Watchpoint API Gateway (Express)
// - Overfast 프록시 (+ 규격화 응답)
// - Elasticsearch 패스스루
// - Competitive/Quickplay (?mode=competitive|quickplay)
// - 플랫폼 (?platform=pc|xbl|psn)
// - 레이트리밋 재시도/로깅 + 디버그 패스스루
// - 영웅 메타(이미지/역할) ES 병합 + 중복 정규화/집계
// -------------------------------------------------------------

"use strict";
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// 상수/환경
// -------------------------------------------------------------
const OVERFAST = process.env.OVERFAST_BASE || "https://overfast-api.tekrop.fr";
const ELASTIC_HOST = process.env.ELASTIC_HOST || "http://192.168.0.31:9200";
const ELASTIC_AUTH = {
  username: process.env.ELASTIC_USER || "elastic",
  password: process.env.ELASTIC_PASS || "changeme",
};
const HERO_INDEX = process.env.HERO_INDEX || "test_overwatch_heroes";
const PORT = Number(process.env.PORT || 4000);

// -------------------------------------------------------------
// 영웅 별칭/슬러그
// -------------------------------------------------------------
const HERO_ALIASES = {
  "soldier-76": "soldier-76",
  "torbjorn": "torbjorn",
  "dva": "dva",
  "wrecking-ball": "wrecking-ball",
  "cassidy": "cassidy",
  "mccree": "cassidy",
  "ramattra": "ramattra",
  "illari": "illari",
  "kiriko": "kiriko",
  "junker-queen": "junker-queen",
  "lifeweaver": "lifeweaver",
};

function heroSlug(s = "") {
  return String(s)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[:.'’]/g, "")
    .replace(/[^a-z0-9-]/g, "");
}
const CANON = (name = "") => HERO_ALIASES[heroSlug(name)] || heroSlug(name);

// -------------------------------------------------------------
// 로깅 & 헬스체크
// -------------------------------------------------------------
app.use((req, _res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

app.get("/healthz", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.get("/api/_health", (_req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString(),
    overfast: OVERFAST,
    elastic: ELASTIC_HOST,
    hero_index: HERO_INDEX,
    port: PORT,
  });
});

// -------------------------------------------------------------
// 유틸
// -------------------------------------------------------------
function mapByKey(arr, key = "key", val = "value") {
  const m = new Map();
  for (const x of arr || []) m.set(String(x?.[key]), x?.[val]);
  return m;
}
const toNum = (v, d = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};
const sanitizePlayerId = (id) => String(id || "").replace("#", "-");
const readPlayerId = (req) => sanitizePlayerId(req.params.playerId ?? req.query.tag ?? "");

// 레이트리밋/일시 오류 자동 재시도
async function getWithRetry(url, params = {}, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const { data } = await axios.get(url, { params, timeout: 15000 });
      return data;
    } catch (e) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.error || e.message || "";
      const retryAfter = Number(e?.response?.headers?.["retry-after"]);
      const retryable =
        status === 429 ||
        status >= 500 ||
        String(msg).toLowerCase().includes("rate") ||
        String(msg).toLowerCase().includes("timeout");

      if (i === tries - 1 || !retryable) throw e;

      const backoffMs = retryAfter
        ? retryAfter * 1000 + 500
        : i === 0
        ? 1000
        : (i + 1) * 1500;

      console.warn(`Retrying after ${backoffMs}ms due to ${status || ""} ${msg}`);
      await new Promise((r) => setTimeout(r, backoffMs));
    }
  }
}

// ---- OverFast 원본(디버그)
async function fetchOverfast(path, params = {}) {
  const url = `${OVERFAST}${path}`;
  const r = await axios.get(url, {
    params,
    timeout: 15000,
    validateStatus: () => true,
  });
  return {
    ok: r.status >= 200 && r.status < 300,
    status: r.status,
    url: r.request?.res?.responseUrl || url,
    params,
    headers: {
      retry_after: r.headers["retry-after"] || null,
      ratelimit: r.headers["x-ratelimit-remaining"] || null,
    },
    data: r.data,
  };
}

// ---- stats 파라미터(gamemode/game_mode) 유연 호출
async function fetchStatsFlexible(id, platform, gamemode) {
  const base = `${OVERFAST}/players/${encodeURIComponent(id)}/stats`;
  try {
    return await getWithRetry(base, { gamemode, platform });
  } catch (_) {
    return await getWithRetry(base, { game_mode: gamemode, platform });
  }
}

// ---- summary 정규화
function normalizeSummary(summary, platform = "pc") {
  if (!summary || typeof summary !== "object")
    return { profile: {}, competitive: {}, quickplay: {} };

  const profile = {
    username: summary.username || summary.name || "",
    avatar: summary.avatar || "",
    namecard: summary.namecard || "",
    endorsement: summary?.endorsement?.level ?? summary?.endorsement_level ?? null,
    last_updated_at: summary.last_updated_at || Math.floor(Date.now() / 1000),
  };

  const compPlat = summary?.competitive?.[platform] || summary?.competitive || {};
  const qpPlat = summary?.quickplay?.[platform] || summary?.quickplay || summary?.qp || {};

  return { profile, competitive: compPlat, quickplay: qpPlat };
}

// -------------------------------------------------------------
// 영웅 메타(이름/역할/이미지) 로딩 + 캐시
// -------------------------------------------------------------
const HERO_CACHE_TTL_MS = 5 * 60 * 1000; // 5분
let HERO_CACHE = { at: 0, map: {} };

async function loadHeroMeta(force = false) {
  if (!force && Date.now() - HERO_CACHE.at < HERO_CACHE_TTL_MS) {
    return HERO_CACHE.map;
  }

  const body = {
    size: 300,
    _source: ["heroName", "heroRole", "heroImages", "heroDetailUrl"],
    query: { match_all: {} },
  };

  const { data } = await axios.post(
    `${ELASTIC_HOST}/${HERO_INDEX}/_search`,
    body,
    {
      auth: ELASTIC_AUTH,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    }
  );

  const hits = data?.hits?.hits || [];
  const map = {};
  for (const h of hits) {
    const src = h?._source || {};
    const key = heroSlug(src.heroName);
    map[key] = {
      heroName: src.heroName,
      heroRole: src.heroRole ?? null,
      heroImages: Array.isArray(src.heroImages) ? src.heroImages : [],
      heroDetailUrl: src.heroDetailUrl ?? null,
      heroIcon: Array.isArray(src.heroImages) ? src.heroImages[0] : null,
    };
  }

  HERO_CACHE = { at: Date.now(), map };
  return map;
}

app.get("/api/meta/heroes", async (req, res) => {
  try {
    const m = await loadHeroMeta(req.query.force === "1");
    res.json({ total: Object.keys(m).length, byName: m });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// -------------------------------------------------------------
// 디버그 패스스루
// -------------------------------------------------------------
async function debugSummaryHandler(req, res) {
  const id = readPlayerId(req);
  if (!id) return res.status(400).json({ error: "missing tag or playerId" });
  const platform = String(req.query.platform || "pc");
  try {
    const out = await fetchOverfast(`/players/${encodeURIComponent(id)}/summary`, { platform });
    res.status(out.status).json(out);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
app.get("/api/_debug/summary", debugSummaryHandler);
app.get("/api/_debug/summary/:playerId", debugSummaryHandler);

async function debugStatsHandler(req, res) {
  const id = readPlayerId(req);
  if (!id) return res.status(400).json({ error: "missing tag or playerId" });
  const platform = String(req.query.platform || "pc");
  const gamemode = String(req.query.gamemode || "competitive");
  try {
    const first = await fetchOverfast(`/players/${encodeURIComponent(id)}/stats`, {
      gamemode,
      platform,
    });
    if (first.ok) return res.status(first.status).json({ tried: "gamemode", ...first });

    const second = await fetchOverfast(`/players/${encodeURIComponent(id)}/stats`, {
      game_mode: gamemode,
      platform,
    });
    res.status(second.status).json({ tried: "game_mode", first_status: first.status, ...second });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
app.get("/api/_debug/stats", debugStatsHandler);
app.get("/api/_debug/stats/:playerId", debugStatsHandler);

// -------------------------------------------------------------
// 플레이어 검색 → player_id 목록
// -------------------------------------------------------------
app.get("/api/players", async (req, res) => {
  const name = String(req.query.name || "").trim();
  if (!name) return res.json({ total: 0, results: [] });

  try {
    const data = await getWithRetry(`${OVERFAST}/players`, { name });
    res.json({
      total: data?.total || 0,
      results: (data?.results || []).map((r) => ({
        player_id: r.player_id,
        name: r.name,
        avatar: r.avatar,
        last_updated_at: r.last_updated_at,
      })),
    });
  } catch (e) {
    console.error("players search error:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// -------------------------------------------------------------
// 풀 프로필 (요약 + 모드별 통계)  ★ 영웅 메타 병합 + 중복 정규화/집계
// -------------------------------------------------------------
app.get("/api/profile/:playerId/full", async (req, res) => {
  const id = readPlayerId(req);
  if (!id) return res.status(400).json({ error: "missing tag or playerId" });

  const modeRaw = String(req.query.mode || "competitive").toLowerCase();
  const mode = modeRaw === "quickplay" ? "quickplay" : "competitive";
  const platform = (req.query.platform || "pc").toString();

  try {
    // 0) 영웅 메타(ES)
    const heroMeta = await loadHeroMeta();
    const metaOf = (nameOrKey = "") => heroMeta[CANON(nameOrKey)] || null;

    // 1) Summary
    const summaryRaw = await getWithRetry(
      `${OVERFAST}/players/${encodeURIComponent(id)}/summary`,
      { platform }
    );
    const { profile, competitive } = normalizeSummary(summaryRaw, platform);

    // 2) Stats
    const statsRaw = await fetchStatsFlexible(id, platform, mode);
    const stats = statsRaw && statsRaw.data ? statsRaw.data : statsRaw;

    // ---- 대표 랭크
    const order = ["bronze","silver","gold","platinum","diamond","master","grandmaster","champion","ultimate"];
    const rolesObj = competitive || {};
    const roleKeys = ["tank", "damage", "support"];
    let best = { label: "Unranked", score: -1 };
    roleKeys.forEach((role) => {
      const r = rolesObj?.[role];
      const div = (r?.division || "").toString().toLowerCase();
      const tierN = r?.tier;
      if (!div) return;
      const score = order.indexOf(div) * 10 + (typeof tierN === "number" ? tierN : 0);
      if (score > best.score) best = { label: `${r.division}${tierN ? ` ${tierN}` : ""}`, score };
    });

    // ---- 합계 (all-heroes → game)
    const allHeroesArr = Array.isArray(stats?.["all-heroes"]) ? stats["all-heroes"] : [];
    const gameSec = allHeroesArr.find((s) => s?.category === "game");
    const gameMap = mapByKey(gameSec?.stats || [], "key", "value");

    let wins   = toNum(gameMap.get("games_won"), 0);
    let games  = toNum(gameMap.get("games_played"), 0);
    let losses = toNum(gameMap.get("games_lost"), 0);
    if (!losses && games >= wins) losses = games - wins;
    const winrate = games ? +((wins * 100) / games).toFixed(1) : 0;

    // ---- 좌측 패널(+ 역할 아이콘)
    const roleIcons = {
      tank:    rolesObj?.tank?.role_icon    || "/images/roles/tank.svg",
      damage:  rolesObj?.damage?.role_icon  || "/images/roles/damage.svg",
      support: rolesObj?.support?.role_icon || "/images/roles/support.svg",
    };
    const left = {
      profile,
      rank: mode === "competitive" ? best.label : "Quickplay",
      totals: { wins, losses, games, winrate },
      roles:
        mode === "competitive"
          ? {
              tank: rolesObj?.tank
                ? { division: rolesObj.tank.division, tier: rolesObj.tank.tier ?? null }
                : null,
              damage: rolesObj?.damage
                ? { division: rolesObj.damage.division, tier: rolesObj.damage.tier ?? null }
                : null,
              support: rolesObj?.support
                ? { division: rolesObj.support.division, tier: rolesObj.support.tier ?? null }
                : null,
            }
          : { tank: null, damage: null, support: null },
      assets: { roleIcons },
    };

    // ---- 영웅 표(중복 정규화/집계)
    const acc = new Map(); // key=canon hero, val={wins,losses,games,kills,deaths,playtime,objSum,objCnt}
    if (stats && typeof stats === "object") {
      for (const [rawKey, arr] of Object.entries(stats)) {
        if (rawKey === "all-heroes" || !Array.isArray(arr)) continue;

        const byCat = (cat) => arr.find((s) => s?.category === cat);
        const val = (cat, k) => {
          const sec = byCat(cat);
          const it = sec?.stats?.find((x) => x?.key === k);
          return it?.value ?? 0;
        };

        const k = CANON(rawKey);
        const gamesPlayed = toNum(val("game", "games_played"), 0);
        const winsH       = toNum(val("game", "games_won"), 0);
        const lossesH     = toNum(val("game", "games_lost"), Math.max(0, gamesPlayed - winsH));

        const kills  = toNum(val("combat", "final_blows"), toNum(val("combat", "eliminations"), 0));
        const deaths = toNum(val("combat", "deaths"), 0);

        const obj10m =
          val("average", "objective_time_avg_per_10_min") ||
          val("average", "objective_contest_time_avg_per_10_min") ||
          null;

        const playSec = toNum(val("game", "time_played"), 0);

        const cur = acc.get(k) || { wins:0, losses:0, games:0, kills:0, deaths:0, playtime:0, objSum:0, objCnt:0 };
        cur.wins     += winsH;
        cur.losses   += lossesH;
        cur.games    += gamesPlayed;
        cur.kills    += kills;
        cur.deaths   += deaths;
        cur.playtime += playSec;
        if (obj10m != null) { cur.objSum += obj10m; cur.objCnt += 1; }
        acc.set(k, cur);
      }
    }

    const heroRows = [];
    for (const [k, o] of acc.entries()) {
      if (o.games <= 0) continue; // 0판 제거
      const meta = metaOf(k);
      const kd = o.deaths ? `${(o.kills / o.deaths).toFixed(2)} : 1` : "-";
      const winrt = o.games ? Math.round((o.wins * 100) / o.games) : 0;
      const obj10m = o.objCnt ? +(o.objSum / o.objCnt).toFixed(2) : null;

      heroRows.push({
        hero: k,
        role:   meta?.heroRole ?? null,
        icon:   meta?.heroIcon ?? null,
        images: meta?.heroImages ?? [],
        detailUrl: meta?.heroDetailUrl ?? null,
        wins: o.wins,
        losses: o.losses,
        games: o.games,
        winrate: winrt,
        kd,
        objective_avg_10m: obj10m,
        playtime: o.playtime,
      });
    }

    heroRows.sort((a, b) => (b.playtime || 0) - (a.playtime || 0));

    const payload = { left, right: { heroes: heroRows }, mode, platform };
    return res.json(payload);
  } catch (e) {
    console.error("full profile error:", e?.response?.status || "", e?.message);
    return res.status(500).json({ error: e?.message || "overfast error" });
  }
});

// -------------------------------------------------------------
// 영웅 검색 (Elasticsearch 패스스루 - 기존)
// -------------------------------------------------------------
app.post("/api/search", async (req, res) => {
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_overwatch_heroes/_search`,
      req.body,
      {
        auth: ELASTIC_AUTH,
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );
    res.json(esRes.data);
  } catch (e) {
    console.error("영웅 검색 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// -------------------------------------------------------------
// 패치노트 (기존)
// -------------------------------------------------------------
app.get("/api/patch", async (_req, res) => {
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_patchnotes_live/_search`,
      {
        query: { match_all: {} },
        size: 100,
        sort: [{ "date.keyword": "desc" }],
      },
      {
        auth: ELASTIC_AUTH,
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );
    res.json(esRes.data);
  } catch (e) {
    console.error("패치노트 API 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

app.get("/api/patch/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_patchnotes_live/_search`,
      {
        query: { match: { anchor_id: id } },
        size: 1,
      },
      {
        auth: ELASTIC_AUTH,
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );

    const patch = esRes?.data?.hits?.hits?.[0]?._source;
    if (!patch) {
      return res.status(404).json({ error: "패치노트를 찾을 수 없습니다." });
    }
    res.json(patch);
  } catch (e) {
    console.error("개별 패치노트 API 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// -------------------------------------------------------------
// 맵 (기존)
// -------------------------------------------------------------
app.get("/api/maps", async (_req, res) => {
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_overwatch_maps/_search`,
      {
        query: { match_all: {} },
        sort: [{ "name.keyword": "asc" }],
        size: 100,
      },
      {
        auth: ELASTIC_AUTH,
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );
    res.json(esRes.data);
  } catch (e) {
    console.error("맵 API 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

app.get("/api/maps/:name", async (req, res) => {
  try {
    const mapName = decodeURIComponent(req.params.name);
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_overwatch_maps/_search`,
      { query: { match: { name: mapName } }, size: 1 },
      {
        auth: ELASTIC_AUTH,
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );
    const mapData = esRes?.data?.hits?.hits?.[0]?._source;
    if (!mapData) {
      return res.status(404).json({ error: "맵을 찾을 수 없습니다." });
    }
    res.json(mapData);
  } catch (e) {
    console.error("개별 맵 API 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// -------------------------------------------------------------
// 서버 시작
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  console.log(`Elasticsearch 연결: ${ELASTIC_HOST}`);
});
