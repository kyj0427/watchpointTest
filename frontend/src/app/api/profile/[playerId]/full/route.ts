// app/api/profile/[playerId]/full/route.ts
import { NextResponse } from "next/server";

// ====== 환경 ======
const OVERFAST = process.env.OVERFAST_BASE ?? "https://overfast-api.tekrop.fr";
const ELASTIC_HOST = process.env.ELASTIC_HOST ?? "http://192.168.0.31:9200";
const ELASTIC_USER = process.env.ELASTIC_USER ?? "elastic";
const ELASTIC_PASS = process.env.ELASTIC_PASS ?? "changeme";
const HERO_INDEX   = process.env.HERO_INDEX   ?? "test_overwatch_heroes";

// ====== 랭크 순서 ======
const ORDER = [
  "Bronze","Silver","Gold","Platinum","Diamond","Master","Grandmaster","Champion","Ultimate",
];

// ====== 영웅 별칭/슬러그 ======
const HERO_ALIASES: Record<string,string> = {
  "soldier-76": "soldier-76", // Soldier: 76
  "torbjorn": "torbjorn",     // Torbjörn
  "dva": "dva",               // D.Va
  "wrecking-ball": "wrecking-ball",
  "cassidy": "cassidy",       // (구) mccree
  "mccree": "cassidy",
  "ramattra": "ramattra",
  "illari": "illari",
  "kiriko": "kiriko",
  "junker-queen": "junker-queen",
  "lifeweaver": "lifeweaver",
};

const heroSlug = (s = "") =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[:.'’]/g, "")
    .replace(/[^a-z0-9-]/g, "");

// ====== 유틸 ======
const mapByKey = (arr: any[] = [], key = "key", val = "value") => {
  const m = new Map<string, any>();
  for (const x of arr || []) m.set(String(x?.[key]), x?.[val]);
  return m;
};
const toNum = (v: any, d = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};
const unwrap = (x: any) => (x && typeof x === "object" && "data" in x ? x.data : x);

// ====== ES 메타 캐시(서버 인스턴스 내 5분) ======
type HeroMeta = {
  heroName: string;
  heroRole?: string | null;
  heroImages?: string[];
  heroDetailUrl?: string | null;
  heroIcon?: string | null;
};
let HERO_CACHE: { at: number; map: Record<string, HeroMeta> } = { at: 0, map: {} };
const HERO_CACHE_TTL = 5 * 60 * 1000;

async function loadHeroMeta(force = false) {
  if (!force && Date.now() - HERO_CACHE.at < HERO_CACHE_TTL && Object.keys(HERO_CACHE.map).length)
    return HERO_CACHE.map;

  const authHeader =
    ELASTIC_USER && ELASTIC_PASS
      ? { Authorization: "Basic " + Buffer.from(`${ELASTIC_USER}:${ELASTIC_PASS}`).toString("base64") }
      : {};

  const body = {
    size: 300,
    _source: ["heroName", "heroRole", "heroImages", "heroDetailUrl"],
    query: { match_all: {} },
  };

  const res = await fetch(`${ELASTIC_HOST}/${HERO_INDEX}/_search`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`ES hero meta fetch failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const hits: any[] = data?.hits?.hits || [];
  const map: Record<string, HeroMeta> = {};

  for (const h of hits) {
    const src = h?._source || {};
    const key = heroSlug(src.heroName ?? "");
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

// ====== 라우트 ======
export async function GET(req: Request, { params }: { params: { playerId: string } }) {
  try {
    const id = params.playerId;
    if (!id) return NextResponse.json({ error: "playerId required" }, { status: 400 });

    const { searchParams } = new URL(req.url);
    const mode = (searchParams.get("mode") || "competitive") as "competitive" | "quickplay";
    const platform = searchParams.get("platform") || "pc";

    // Overfast URL
    const summaryUrl = `${OVERFAST}/players/${encodeURIComponent(id)}/summary?platform=${platform}`;
    const statsUrl   = `${OVERFAST}/players/${encodeURIComponent(id)}/stats?gamemode=${mode}&platform=${platform}`;
    console.log("[full] summary:", summaryUrl);
    console.log("[full] stats  :", statsUrl);

    // ES 메타 로딩(병렬)
    const [summaryRes, statsRes, heroMetaMap] = await Promise.all([
      fetch(summaryUrl, { cache: "no-store" }),
      fetch(statsUrl,   { cache: "no-store" }),
      loadHeroMeta(false),
    ]);

    if (!summaryRes.ok) return NextResponse.json({ error: "summary fetch failed" }, { status: 502 });
    if (!statsRes.ok)   return NextResponse.json({ error: "stats fetch failed" }, { status: 502 });

    const summary = unwrap(await summaryRes.json());
    const stats   = unwrap(await statsRes.json()); // 평면 구조: "all-heroes", "tracer", ...

    // ---------- 대표티어 ----------
    const comp = summary?.competitive?.[platform] ?? summary?.competitive?.pc ?? {};
    let best = { label: "Unranked", score: -1 };
    (["tank","damage","support"] as const).forEach((role) => {
      const div = String(comp?.[role]?.division || "");
      const tierN = comp?.[role]?.tier;
      if (!div) return;
      const idx = ORDER.findIndex(o => o.toLowerCase() === div.toLowerCase());
      const score = (idx >= 0 ? idx : 0) * 10 + (typeof tierN === "number" ? tierN : 0);
      if (score > best.score) best = { label: `${div}${tierN ? ` ${tierN}` : ""}`, score };
    });

    // ---------- 누적 전적 ----------
    const allHeroesArr: any[] = Array.isArray(stats?.["all-heroes"]) ? stats["all-heroes"] : [];
    const gameSec = allHeroesArr.find(s => s?.category === "game");
    const gameMap = mapByKey(gameSec?.stats || [], "key", "value");

    const wins   = toNum(gameMap.get("games_won"), 0);
    const games  = toNum(gameMap.get("games_played"), wins);
    let losses   = toNum(gameMap.get("games_lost"), Math.max(0, games - wins));
    if (losses > games) losses = Math.max(0, games - wins);

    const winrate = games ? +((wins * 100) / games).toFixed(1) : 0;

    const left = {
      profile: {
        username: summary?.username,
        avatar: summary?.avatar,
        namecard: summary?.namecard,
        endorsement: summary?.endorsement?.level ?? null,
        last_updated_at: summary?.last_updated_at,
      },
      rank: best.label,
      totals: { wins, losses, games, winrate },
      roles: {
        tank:    comp?.tank    ? { division: comp.tank.division,    tier: comp.tank.tier ?? null }    : null,
        damage:  comp?.damage  ? { division: comp.damage.division,  tier: comp.damage.tier ?? null }  : null,
        support: comp?.support ? { division: comp.support.division, tier: comp.support.tier ?? null } : null,
      },
    };

    // ---------- 영웅별 표(ES 메타 병합) ----------
    const heroRows: any[] = [];
    const missing: string[] = [];

    const metaOf = (k: string) => {
      const k1 = heroSlug(k);
      const k2 = HERO_ALIASES[k1] || k1;
      return heroMetaMap[k2] || null;
    };

    if (stats && typeof stats === "object") {
      for (const [key, arr] of Object.entries(stats)) {
        if (key === "all-heroes") continue;
        if (!Array.isArray(arr)) continue;

        const byCat = (cat: string) => (arr as any[]).find(s => s?.category === cat);
        const val = (cat: string, k: string) => {
          const sec = byCat(cat);
          const it = sec?.stats?.find((x: any) => x?.key === k);
          return it?.value ?? 0;
        };

        const hero        = key; // e.g. "tracer", "soldier-76"
        const meta        = metaOf(hero);
        if (!meta) missing.push(hero);

        const gamesPlayed = toNum(val("game", "games_played"), 0);
        const winsH       = toNum(val("game", "games_won"), 0);
        const lossesH     = toNum(val("game", "games_lost"), Math.max(0, gamesPlayed - winsH));
        const winrtH      = gamesPlayed ? Math.round((winsH * 100) / gamesPlayed) : 0;

        const kills  = toNum(val("combat", "final_blows"), toNum(val("combat", "eliminations"), 0));
        const deaths = toNum(val("combat", "deaths"), 0);
        const kd     = deaths ? `${(kills / deaths).toFixed(2)} : 1` : "-";

        const obj10m =
          val("average", "objective_time_avg_per_10_min") ||
          val("average", "objective_contest_time_avg_per_10_min") ||
          null;

        const playSec = toNum(val("game", "time_played"), 0);

        heroRows.push({
          hero,
          role:   meta?.heroRole ?? null,
          icon:   meta?.heroIcon ?? "/images/heroes/_placeholder.png", // ← 플홀더
          images: meta?.heroImages ?? [],
          detailUrl: meta?.heroDetailUrl ?? null,
          wins: winsH,
          losses: lossesH,
          games: gamesPlayed,
          winrate: winrtH,
          kd,
          objective_avg_10m: obj10m,
          playtime: playSec,
        });
      }
    }

    heroRows.sort((a, b) => (b.playtime || 0) - (a.playtime || 0));

    // 최종
    console.log("[full] all-heroes len:", allHeroesArr.length, "keys:", Object.keys(stats || {}));
    return NextResponse.json({
      left,
      right: { heroes: heroRows },
      mode,
      platform,
      debug: { missing_meta: missing }, // ← 누락된 키 확인용
    });

  } catch (e: any) {
    console.error("[full route] error:", e?.message || e);
    return NextResponse.json({ error: e?.message || "internal error" }, { status: 500 });
  }
}
