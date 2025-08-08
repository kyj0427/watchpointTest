"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ====================== 타입 (이 파일 내부에 정의) ====================== */
type RawHero = {
  hero: string;
  k: number;
  d: number;
  a: number;
  games: number;
  winRate: number; // 0~100
};

type RawRecentHero = { hero: string; games: number; wins: number; losses: number };

type RawUser = {
  id: string | number;
  slug?: string;
  name: string;
  tag?: string | number;

  tier?: string;
  lp?: number;
  wins?: number;
  losses?: number;
  kda?: number;
  killPart?: number;
  lastUpdated?: string;

  recent20?: { wins: number; losses: number; byHero: RawRecentHero[] };
  positions?: Array<{ name: "탱커" | "딜러" | "힐러"; ratio: number }>;
  mostPlayed?: RawHero[];
  seasons?: Array<{ code: string; sr: number }>;

  elimsPer10?: number;
  finalBlows?: number;
  damagePer10?: number;
  objKills?: number;
  healingPer10?: number;

  playStyle?: string;
  playStyleLabel?: string;
  bestHighlight?: string;
};

type MostPlayedHeroVM = {
  name: string;
  kda: string;
  kdaDetail: string;
  winRate: string;
  games: string;
  kdaWeight: "font-black" | "font-semibold";
};
type RecentHeroVM = { name: string; winRate: string; record: string };
type PositionBarVM = { name: string; height: string; top: string };
type StatCardVM = {
  title: string;
  value: string;
  trend: "Up" | "Down" | "Neutral";
  icon: "arrowUp" | "arrowUp2" | "arrowDown" | "image" | null;
  position: string;
};
type ViewModel = {
  header: {
    name: string;
    tag?: string | number;
    tier?: string;
    lp?: number;
    wins?: number;
    losses?: number;
    winRate?: number;
    kda?: number;
    killPart?: number;
    lastUpdated?: string;
    last20Summary?: string;
    last20WinRate?: number;
    playStyle?: string;
    playStyleLabel?: string;
    bestHighlight?: string;
  };
  mostPlayedHeroes: MostPlayedHeroVM[];
  recentHeroes: RecentHeroVM[];
  positionData: PositionBarVM[];
  seasons: string[];
  srValues: string[];
  statsCards: StatCardVM[];
};

/* ====================== 유틸/변환 ====================== */
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const percent = (wins?: number, losses?: number) => {
  const w = wins ?? 0;
  const l = losses ?? 0;
  const t = w + l;
  return t ? Math.round((w / t) * 100) : 0;
};
const barHeight = (ratio: number) => `h-[${Math.max(5, Math.round(74 * clamp01(ratio)))}px]`;

function buildView(user: RawUser): ViewModel {
  const total = (user.wins ?? 0) + (user.losses ?? 0);
  const winRate = total ? Math.round(((user.wins ?? 0) / total) * 100) : undefined;

  const last20 = user.recent20;
  const last20Total = last20 ? last20.wins + last20.losses : 0;
  const last20WinRate = last20 && last20Total ? Math.round((last20.wins / last20Total) * 100) : 0;

  const mostPlayedHeroes: MostPlayedHeroVM[] = (user.mostPlayed ?? [])
    .sort((a: RawHero, b: RawHero) => b.games - a.games)
    .slice(0, 5)
    .map((h: RawHero, i: number): MostPlayedHeroVM => {
      const kdaVal = (h.k + h.a) / Math.max(1, h.d);
      return {
        name: h.hero,
        kda: `${kdaVal.toFixed(2)} KDA`,
        kdaDetail: `${h.k} / ${h.d} / ${h.a}`,
        winRate: `${Math.round(h.winRate)}%`,
        games: `${h.games}게임`,
        kdaWeight: i === 0 ? "font-black" : "font-semibold",
      };
    });

  const recentHeroes: RecentHeroVM[] = (last20?.byHero ?? [])
    .sort((a: RawRecentHero, b: RawRecentHero) => b.games - a.games)
    .slice(0, 3)
    .map((h: RawRecentHero): RecentHeroVM => ({
      name: h.hero,
      winRate: `${percent(h.wins, h.losses)}%`,
      record: `${h.wins}승 ${h.losses}패`,
    }));

  const pos = user.positions ?? [];
  const positionData: PositionBarVM[] = (["탱커", "딜러", "힐러"] as const).map(
    (n): PositionBarVM => {
      const r = pos.find((p) => p.name === n)?.ratio ?? 0;
      return { name: n, height: barHeight(r), top: `top-[${74 - Math.round(74 * clamp01(r))}px]` };
    }
  );

  const seasons: string[] = (user.seasons ?? []).map((s) => s.code);
  const srValues: string[] = Array.from(
    new Set((user.seasons ?? []).map((s) => String(s.sr)))
  ).slice(0, 4);

  const statsCards: StatCardVM[] = [
    { title: "K/D Ratio", value: user.kda?.toFixed?.(2) ?? "—", trend: "Up", icon: "arrowUp", position: "top-[268px]" },
    { title: "Elims/10 min", value: user.elimsPer10?.toFixed?.(1) ?? "—", trend: "Up", icon: "image", position: "top-[344px]" },
    { title: "Final Blows", value: user.finalBlows?.toLocaleString?.() ?? "—", trend: "Up", icon: "arrowUp2", position: "top-[420px]" },
    { title: "Damage/10 min", value: user.damagePer10?.toLocaleString?.() ?? "—", trend: "Neutral", icon: null, position: "top-[497px]" },
    { title: "Objective Kills", value: user.objKills?.toLocaleString?.() ?? "—", trend: "Neutral", icon: null, position: "top-[577px]" },
    { title: "Healing/10 min", value: user.healingPer10?.toLocaleString?.() ?? "—", trend: "Down", icon: "arrowDown", position: "top-[653px]" },
  ];

  return {
    header: {
      name: user.name,
      tag: user.tag,
      tier: user.tier,
      lp: user.lp,
      wins: user.wins,
      losses: user.losses,
      winRate,
      kda: user.kda,
      killPart: user.killPart,
      lastUpdated: user.lastUpdated ?? "1일 전",
      last20Summary: last20 ? `${last20Total}전 ${last20.wins}승 ${last20.losses}패` : undefined,
      last20WinRate,
      playStyle: user.playStyle,
      playStyleLabel: user.playStyleLabel,
      bestHighlight: user.bestHighlight,
    },
    mostPlayedHeroes,
    recentHeroes,
    positionData,
    seasons,
    srValues,
    statsCards,
  };
}

/* ====================== 컴포넌트 ====================== */
export default function UserProfile() {
  const params = useSearchParams();
  const userKey = (params.get("id") ?? params.get("q") ?? "").trim();

  const [all, setAll] = useState<RawUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // public/data에서 직접 불러옴 (import 아님)
        const res = await fetch("/data/userrank.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: RawUser[] = await res.json();
        if (alive) setAll(json);
      } catch (e: any) {
        if (alive) setErr(e?.message ?? "데이터 로드 실패");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const user: RawUser | null = useMemo(() => {
    if (!userKey) return null;
    const keyLower = userKey.toLowerCase();
    // id → slug → name 순으로 매칭
    return (
      all.find((u: RawUser) => String(u.id) === userKey) ??
      all.find((u: RawUser) => (u.slug ?? "").toLowerCase() === keyLower) ??
      all.find((u: RawUser) => (u.name ?? "").toLowerCase() === keyLower) ??
      null
    );
  }, [all, userKey]);

  const view: ViewModel | null = useMemo(() => (user ? buildView(user) : null), [user]);

  if (!userKey) return <p className="text-gray-400">검색값이 없습니다.</p>;
  if (loading) return <p className="text-gray-400">불러오는 중…</p>;
  if (err) return <p className="text-red-500">오류: {err}</p>;
  if (!view) return <p className="text-red-500">해당 유저를 찾지 못했습니다.</p>;

  const overallWinRate = percent(view.header.wins, view.header.losses);
  const last20Rate = view.header.last20WinRate ?? 0;

  return (
    <section className="bg-[#2b2f38] rounded-lg p-4 mb-6">
      {/* 헤더 */}
      <header className="mb-4">
        <h2 className="text-xl font-bold text-white">
          {view.header.name}
          {view.header.tag ? <span className="ml-1 text-gray-400">#{view.header.tag}</span> : null}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          최근 업데이트 : {view.header.lastUpdated ?? "-"}
        </p>
      </header>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#3a3f49] p-3 rounded">
          <p className="text-gray-300 text-xs">티어</p>
          <p className="text-lg font-semibold text-white">{view.header.tier ?? "-"}</p>
        </div>
        <div className="bg-[#3a3f49] p-3 rounded">
          <p className="text-gray-300 text-xs">LP</p>
          <p className="text-lg font-semibold text-white">
            {view.header.lp?.toLocaleString?.() ?? "-"}
          </p>
        </div>
        <div className="bg-[#3a3f49] p-3 rounded">
          <p className="text-gray-300 text-xs">승/패</p>
          <p className="text-lg font-semibold text-white">
            {(view.header.wins ?? 0).toLocaleString()} /{" "}
            {(view.header.losses ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-[#3a3f49] p-3 rounded">
          <p className="text-gray-300 text-xs">승률</p>
          <p className="text-lg font-semibold text-white">{overallWinRate}%</p>
        </div>
      </div>

      {/* 플레이 스타일 */}
      {(view.header.playStyle || view.header.playStyleLabel) && (
        <div className="mb-6">
          <div className="inline-block rounded-full bg-[#565e6d] px-3 py-1 text-[11px] text-white">
            플레이 스타일 : {view.header.playStyle ?? "—"} &gt;
          </div>
          <h3 className="mt-2 text-white text-lg font-black">
            {view.header.playStyleLabel ?? "—"}
          </h3>
        </div>
      )}

      {/* 최근 20게임 요약 */}
      <div className="bg-[#3a3f49] p-3 rounded mb-6">
        <h4 className="text-white font-semibold mb-2">최근 20게임</h4>
        {view.header.last20Summary ? (
          <p className="text-gray-300 text-sm">
            {view.header.last20Summary} · 승률 {last20Rate}%
          </p>
        ) : (
          <p className="text-gray-400 text-sm">최근 20게임 데이터가 없습니다.</p>
        )}
      </div>

      {/* 모스트 플레이 영웅 */}
      {!!view.mostPlayedHeroes.length && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-2">모스트 플레이 영웅</h4>
          <ul className="grid md:grid-cols-2 gap-2">
            {view.mostPlayedHeroes.slice(0, 5).map((h: MostPlayedHeroVM, i: number) => (
              <li key={`${h.name}-${i}`} className="bg-[#3a3f49] p-3 rounded">
                <p className="text-white">{h.name}</p>
                <p className="text-gray-300 text-xs">
                  {h.kda} · {h.kdaDetail} · {h.games} · {h.winRate}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 시즌 SR */}
      {!!view.seasons.length && (
        <div>
          <h4 className="text-white font-semibold mb-2">시즌 SR</h4>
          <div className="flex flex-wrap gap-2">
            {view.seasons.map((s: string, idx: number) => (
              <span
                key={`${s}-${idx}`}
                className="inline-flex items-center rounded bg-[#3a3f49] px-2 py-1 text-xs text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
