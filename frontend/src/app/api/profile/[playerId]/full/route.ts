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
const heroSlug = (s = "") =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[:.'’]/g, "")
    .replace(/[^a-z0-9-]/g, "");
const CANON = (name = "") => HERO_ALIASES[heroSlug(name)] || heroSlug(name);

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

    const summaryUrl = `${OVERFAST}/players/${encodeURIComponent(id)}/summary?platform=${platform}`;
    const statsUrl1  = `${OVERFAST}/players/${encodeURIComponent(id)}/stats?gamemode=${mode}&platform=${platform}`;
    const statsUrl2  = `${OVERFAST}/players/${encodeURIComponent(id)}/stats?game_mode=${mode}&platform=${platform}`;

    const [summaryRes, statsResTry1, heroMetaMap] = await Promise.all([
      fetch(summaryUrl, { cache: "no-store" }),
      fetch(statsUrl1,   { cache: "no-store" }),
      loadHeroMeta(false),
    ]);
    if (!summaryRes.ok) return NextResponse.json({ error: "summary fetch failed" }, { status: 502 });

    const statsRes = statsResTry1.ok ? statsResTry1 : await fetch(statsUrl2, { cache: "no-store" });
    if (!statsRes.ok) return NextResponse.json({ error: "stats fetch failed" }, { status: 502 });

    const summary = unwrap(await summaryRes.json());
    const stats   = unwrap(await statsRes.json());

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

    // ---------- 좌측 패널(+ 역할 아이콘) ----------
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
      assets: {
        roleIcons: {
          tank:    comp?.tank?.role_icon    || "/images/roles/tank.svg",
          damage:  comp?.damage?.role_icon  || "/images/roles/damage.svg",
          support: comp?.support?.role_icon || "/images/roles/support.svg",
        },
      },
    };

    // ---------- 영웅별 표(중복 정규화/집계) ----------
    const metaOf = (k: string) => heroMetaMap[CANON(k)] || null;
    const acc = new Map<string, { wins:number; losses:number; games:number; kills:number; deaths:number; playtime:number; objSum:number; objCnt:number }>();

    if (stats && typeof stats === "object") {
      for (const [rawKey, arr] of Object.entries(stats)) {
        if (rawKey === "all-heroes") continue;
        if (!Array.isArray(arr)) continue;

        const byCat = (cat: string) => (arr as any[]).find(s => s?.category === cat);
        const val = (cat: string, k: string) => {
          const sec = byCat(cat);
          const it = sec?.stats?.find((x: any) => x?.key === k);
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

    const heroRows: any[] = [];
    for (const [k, o] of acc.entries()) {
      if (o.games <= 0) continue;
      const meta = metaOf(k);
      const kd = o.deaths ? `${(o.kills / o.deaths).toFixed(2)} : 1` : "-";
      const winrt = o.games ? Math.round((o.wins * 100) / o.games) : 0;
      const obj10m = o.objCnt ? +(o.objSum / o.objCnt).toFixed(2) : null;

      heroRows.push({
        hero: k,
        role:   meta?.heroRole ?? null,
        icon:   meta?.heroIcon ?? "/images/heroes/_placeholder.png",
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

    return NextResponse.json({
      left,
      right: { heroes: heroRows },
      mode,
      platform,
    });

  } catch (e: any) {
    console.error("[full route] error:", e?.message || e);
    return NextResponse.json({ error: e?.message || "internal error" }, { status: 500 });
  }
}
