// src/components/sections/userrankList/user/UserComp.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ----------------------------- types ----------------------------- */
type Left = {
  profile: {
    username?: string;
    avatar?: string;
    namecard?: string;
    endorsement?: number | null;
    last_updated_at?: number; // epoch sec
  };
  rank: string;
  totals: { wins: number; losses: number; games: number; winrate: number };
  roles: {
    tank: { division: string; tier?: number | null } | null;
    damage: { division: string; tier?: number | null } | null;
    support: { division: string; tier?: number | null } | null;
  };
  // ▼ 서버에서 내려주는 정적/아이콘 자산(옵션)
  assets?: {
    roleIcons: { tank: string; damage: string; support: string };
  };
};

type HeroRow = {
  hero: string;
  wins: number;
  losses: number;
  games: number;
  winrate: number; // %
  kd: string; // "x.xx : 1" or "-"
  objective_avg_10m: number | null;
  playtime: number; // 초 기준
  // ▼ 추가 필드 (서버에서 내려옴)
  icon?: string | null;
  role?: "tank" | "damage" | "support" | null;
  roleIcon?: string | null;
};

type FullResponse = {
  left: Left;
  right?: { heroes: HeroRow[] };
  error?: string;
  mode?: Mode;
  platform?: string;
};

type RoleTierSummary = {
  roleKey: "tank" | "damage" | "support";
  roleIconUrl: string;
  rankIconUrl: string;
  placementPending: boolean;
  tierText?: string;
  scoreText?: string;
  winRateText: string;
  winLoseText: string;
  kdText: string;
  kdDetailText?: string;
};

type RoleRowStat = {
  roleLabel: string;
  roleIconUrl: string;
  playTime: string;
  winRatio: string; // "54%"
  win: number;
  lose: number;
  kd: string;
  kdDetail?: string;
};

type HeroRowStat = {
  heroName: string;
  heroImageUrl: string;
  gradeText: string;
  win: number;
  lose: number;
  winRatio: string;
  kd: string;
  kdDetail?: string;
  avgObjective?: string;
  playTime: string;
};

type SideSummaryItem = { label: string; value: string };
type Mode = "competitive" | "quickplay";

/* ----------------------------- const ----------------------------- */
const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
const DEFAULT_PLATFORM = "pc";

/* -------------------------- helpers -------------------------- */
const fmtDate = (sec?: number) => (sec ? new Date(sec * 1000).toLocaleString() : "-");
const fmtKD = (kd: string) => (kd?.trim() ? kd.trim() : "-");
const fmtPercent = (n?: number | string) =>
  typeof n === "number" ? `${Math.round(n)}%` : (n ?? "-");
const secToHMM = (sec?: number) => {
  if (!sec || sec <= 0) return "-";
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
};

// 역할 아이콘: 서버가 내려준 URL 우선 사용 (없으면 플레이스홀더)
const roleIconFromLeft = (left: Left | null | undefined, role: "tank" | "damage" | "support") =>
  left?.assets?.roleIcons?.[role] || "/images/heroes/_placeholder.png";

// 랭크 아이콘: 로컬을 쓰되, 없다면 언랭크로 폴백 (원하면 CDN로 바꿔도 됨)
const getRankIconUrl = (division?: string) => {
  const key = (division || "unranked").toLowerCase();
  return `/images/game_tier/${key}.png`;
};

/* ------------------------------ sub UIs ------------------------------ */
function PlayerHeader({
  data,
}: {
  data: {
    name: string;
    portraitUrl: string;
    backgroundUrl?: string;
    title?: string;
    lastUpdatedText?: string;
  };
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-shap">
      <div
        className="relative bg-cover bg-no-repeat rounded-24 overflow-hidden"
        style={{ backgroundImage: `url(${data.backgroundUrl || "/images/users/player_banner.jpg"})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-end md:items-center h-[300px] p-4 md:p-6 gap-4">
          <div className="shrink-0">
            <Image
              src={data.portraitUrl || "/images/users/player_icon1.png"}
              alt="portrait"
              width={72}
              height={72}
              className="rounded-xl bg-white/10 p-1"
              style={{ height: "auto" }}
              referrerPolicy="no-referrer"
              unoptimized
            />
          </div>

          <div className="text-white">
            <div className="text-2xl font-semibold flex items-center gap-2">
              <span>{data.name}</span>
            </div>
            {data.title && <div className="text-sm opacity-90">{data.title}</div>}
            {data.lastUpdatedText && (
              <div className="mt-1 text-xs text-white/70">{data.lastUpdatedText}</div>
            )}
          </div>

          <div className="ml-auto flex gap-2">
            <button className="px-3 py-2 rounded-lg bg-primary text-white text-sm shadow">
              전적갱신
            </button>
            <button className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm">
              즐겨찾기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleTierGrid({ items }: { items: RoleTierSummary[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.roleKey} className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <div className="flex items-center gap-3">
            <Image
              src={it.roleIconUrl}
              alt={it.roleKey}
              width={32}
              height={32}
              style={{ height: "auto" }}
              referrerPolicy="no-referrer"
              unoptimized
            />
            <Image
              src={it.rankIconUrl}
              alt="rank"
              width={40}
              height={40}
              style={{ height: "auto" }}
              referrerPolicy="no-referrer"
              unoptimized
            />
            <div className="ml-auto text-right">
              {it.placementPending ? (
                <div className="text-sm text-w-neutral-2">
                  <b>경쟁전 실력 평점</b> (배치 전)
                </div>
              ) : (
                <>
                  {it.tierText && <div className="text-sm text-navy">{it.tierText}</div>}
                  {it.scoreText && (
                    <div className="text-lg font-semibold text-navy">{it.scoreText}</div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <b className="text-w-neutral-1">{it.winRateText}</b>
            <span className="text-w-neutral-2">{it.winLoseText}</span>
          </div>

          <div className="mt-2 text-sm">
            <b>{it.kdText}</b>
            {it.kdDetailText && <span className="ml-2 text-w-neutral-2">{it.kdDetailText}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoleStatsTable({ rows }: { rows: RoleRowStat[] }) {
  return (
    <div className="rounded-xl border border-shap bg-b-neutral-3 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-shap text-left">
          <tr>
            <th className="px-4 py-3">역할</th>
            <th className="px-4 py-3">플레이 시간</th>
            <th className="px-4 py-3">승률</th>
            <th className="px-4 py-3">K/D</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-shap">
          {rows.map((r) => (
            <tr key={r.roleLabel}>
              <td className="px-4 py-3 flex items-center gap-2">
                <Image
                  src={r.roleIconUrl}
                  alt={r.roleLabel}
                  width={20}
                  height={20}
                  style={{ height: "auto" }}
                  referrerPolicy="no-referrer"
                  unoptimized
                />
                {r.roleLabel}
              </td>
              <td className="px-4 py-3">{r.playTime}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-28 h-2 bg-black/20 rounded">
                    <div
                      className="h-2 bg-primary rounded"
                      style={{ width: r.winRatio.endsWith("%") ? r.winRatio : `${r.winRatio}%` }}
                    />
                  </div>
                  <span>{r.winRatio}</span>
                  <span className="text-w-neutral-2">
                    {r.win} / {r.lose}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <b>{r.kd}</b>
                {r.kdDetail && <span className="ml-2 text-w-neutral-2">{r.kdDetail}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HeroStatsTable({ rows }: { rows: HeroRowStat[] }) {
  return (
    <div className="rounded-xl border border-shap bg-b-neutral-3 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-shap text-left">
          <tr>
            <th className="px-4 py-3">영웅</th>
            <th className="px-4 py-3">등급</th>
            <th className="px-4 py-3">승</th>
            <th className="px-4 py-3">패</th>
            <th className="px-4 py-3">승률</th>
            <th className="px-4 py-3">K/D</th>
            <th className="px-4 py-3">평균임무기여</th>
            <th className="px-4 py-3">플레이시간</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-shap">
          {rows.map((h) => (
            <tr key={h.heroName}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={h.heroImageUrl}
                    alt={h.heroName}
                    width={36}
                    height={36}
                    className="rounded"
                    style={{ height: "auto" }}
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                  <span>{h.heroName}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <b className="text-cyan-400">{h.gradeText}</b>
              </td>
              <td className="px-4 py-3">
                <b className="text-navy">{h.win}</b>
              </td>
              <td className="px-4 py-3">
                <b>{h.lose}</b>
              </td>
              <td className="px-4 py-3">{h.winRatio}</td>
              <td className="px-4 py-3">
                <b>{h.kd}</b>
                {h.kdDetail && <span className="ml-2 text-w-neutral-2">{h.kdDetail}</span>}
              </td>
              <td className="px-4 py-3">{h.avgObjective ?? "-"}</td>
              <td className="px-4 py-3">{h.playTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SideSummary({ items }: { items: SideSummaryItem[] }) {
  return (
    <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
      <div className="text-lg font-semibold mb-3">종합통계</div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.label} className="flex justify-between gap-4">
            <b className="text-w-neutral-1">{it.label}</b>
            <span className="text-right text-w-neutral-2">{it.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ main ------------------------------ */
export default function UserComp({ q, uid: uidProp }: { q?: string; uid?: string }) {
  const sp = useSearchParams();
  const uid = uidProp || (sp.get("uid") ?? undefined);

  // 쿼리로 초기 모드/플랫폼 받기 (없으면 competitive/pc)
  const modeParam = (sp.get("mode") as Mode) || "competitive";
  const platformParam = sp.get("platform") || DEFAULT_PLATFORM;

  const [mode, setMode] = useState<Mode>(modeParam);
  const [platform, setPlatform] = useState<string>(platformParam);

  const [left, setLeft] = useState<Left | null>(null);
  const [heroes, setHeroes] = useState<HeroRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    const ac = new AbortController();
    setLoading(true);
    setErr(null);

    const url = `${API}/api/profile/${encodeURIComponent(uid)}/full?mode=${mode}&platform=${platform}`;

    fetch(url, { cache: "no-store", signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: FullResponse) => {
        if (d?.error) throw new Error(d.error);
        setLeft(d.left);
        setHeroes(d.right?.heroes ?? []);
      })
      .catch((e) => {
        if (!ac.signal.aborted) setErr(e?.message || "불러오기에 실패했습니다.");
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    return () => ac.abort();
  }, [uid, mode, platform]);

  /* ----------- Hook들은 항상 최상단에서 호출(early return 위) ----------- */
  const headerData = useMemo(() => {
    const name = q || left?.profile.username || "Player";
    const title = mode === "quickplay" ? "Quickplay" : (left?.rank || "");
    return {
      name,
      portraitUrl: left?.profile.avatar || "/images/users/player_icon1.png",
      backgroundUrl: left?.profile.namecard || "/images/users/player_banner.jpg",
      title,
      lastUpdatedText: left?.profile.last_updated_at
        ? `최근 업데이트: ${fmtDate(left.profile.last_updated_at)}`
        : undefined,
    };
  }, [left, q, mode]);

  const roleTierItems = useMemo<RoleTierSummary[]>(() => {
    const winRateText = fmtPercent(left?.totals.winrate ?? 0);
    const winLoseText = `${left?.totals.wins ?? 0}승 ${left?.totals.losses ?? 0}패`;
    const roles: Array<["tank" | "damage" | "support", Left["roles"]["tank"] | null]> = [
      ["tank", left?.roles.tank ?? null],
      ["damage", left?.roles.damage ?? null],
      ["support", left?.roles.support ?? null],
    ];
    return roles.map(([key, v]) => ({
      roleKey: key,
      roleIconUrl: roleIconFromLeft(left, key),         // ← 서버 제공 아이콘 사용
      rankIconUrl: getRankIconUrl(v?.division),
      placementPending: mode === "competitive" ? !v?.division : true,
      tierText:
        mode === "competitive" && v?.division
          ? `${v.division}${typeof v.tier === "number" ? ` ${v.tier}` : ""}`
          : undefined,
      scoreText: undefined,
      winRateText,
      winLoseText,
      kdText: "K/D",
      kdDetailText: undefined,
    }));
  }, [left, mode]);

  const roleRows = useMemo<RoleRowStat[]>(() => {
    const base = {
      playTime: "-",
      winRatio: fmtPercent(left?.totals.winrate ?? 0),
      win: left?.totals.wins ?? 0,
      lose: left?.totals.losses ?? 0,
      kd: "-",
      kdDetail: undefined as string | undefined,
    };
    return [
      { roleLabel: "돌격", roleIconUrl: roleIconFromLeft(left, "tank"), ...base },
      { roleLabel: "공격", roleIconUrl: roleIconFromLeft(left, "damage"), ...base },
      { roleLabel: "지원", roleIconUrl: roleIconFromLeft(left, "support"), ...base },
    ];
  }, [left]);

  const heroRows = useMemo<HeroRowStat[]>(() => {
    return (heroes ?? []).map((h) => ({
      heroName: h.hero,
      // ← 서버에서 내려준 h.icon 사용 (없으면 플레이스홀더)
      heroImageUrl: h.icon || "/images/heroes/_placeholder.png",
      gradeText: "-", // 필요 시 등급 매핑
      win: h.wins,
      lose: h.losses,
      winRatio: fmtPercent(h.winrate),
      kd: fmtKD(h.kd),
      kdDetail: undefined,
      avgObjective: h.objective_avg_10m != null ? `${h.objective_avg_10m}` : "-",
      playTime: secToHMM(h.playtime),
    }));
  }, [heroes]);

  const sideSummary = useMemo<SideSummaryItem[]>(() => {
    return [
      { label: "승패", value: `${left?.totals.wins ?? 0}승 ${left?.totals.losses ?? 0}패` },
      { label: "총 게임수", value: `${left?.totals.games ?? 0} 게임` },
      { label: "승률", value: fmtPercent(left?.totals.winrate ?? 0) },
      { label: "인증(칭찬)", value: `${left?.profile.endorsement ?? 0}` },
    ];
  }, [left]);

  const winLose = sideSummary.find((s) => s.label === "승패")?.value ?? "-";
  const noHeroes = !loading && (heroes?.length ?? 0) === 0;

  /* ----------------------- early return (렌더 차단) ----------------------- */
  if (!uid) return <div className="text-w-neutral-4">uid가 없습니다.</div>;
  if (loading) return <div className="text-w-neutral-4">불러오는 중…</div>;
  if (err) return <div className="text-red-400">{err}</div>;
  if (!left) return null;

  /* ---------------------------- render ---------------------------- */
  return (
    <main className="container mx-auto px-4 md:px-6 py-6 space-y-6 mt-20">
      <div className="flex items-center gap-2">
        {/* 모드 토글 */}
        <div className="rounded-xl border border-shap p-1 bg-b-neutral-3">
          <button
            onClick={() => setMode("competitive")}
            className={`px-3 py-1.5 rounded-lg text-sm ${mode === "competitive" ? "bg-primary text-white" : "text-w-neutral-1"}`}
          >
            경쟁전
          </button>
          <button
            onClick={() => setMode("quickplay")}
            className={`px-3 py-1.5 rounded-lg text-sm ${mode === "quickplay" ? "bg-primary text-white" : "text-w-neutral-1"}`}
          >
            일반전
          </button>
        </div>

        {/* 플랫폼 셀렉터(간단 버전) */}
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="ml-2 px-3 py-1.5 rounded-lg bg-b-neutral-3 border border-shap text-sm"
        >
          <option value="pc">PC</option>
          <option value="xbl">Xbox</option>
          <option value="psn">PlayStation</option>
        </select>
      </div>

      <PlayerHeader data={headerData} />

      {/* 상단 요약 카드 */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <h3 className="text-lg font-semibold">경쟁전 실력 평점</h3>
          <div className="mt-2 text-w-neutral-2">승률, K/D, 플레이 시간 요약</div>
          <div className="mt-1 text-w-neutral-1">{winLose}</div>
        </div>
        <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <h3 className="text-lg font-semibold">역할별 티어</h3>
          <div className="mt-2 text-w-neutral-2">현재 시즌 배치/점수</div>
        </div>
        <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <h3 className="text-lg font-semibold">플레이 시간 평점</h3>
          <div className="mt-2 text-w-neutral-2">플레이 시간/일 평균 플레이 시간</div>
          <div className="mt-1 text-w-neutral-1">-</div>
        </div>
      </section>

      {/* 역할 티어 그리드 */}
      <RoleTierGrid items={roleTierItems} />

      {/* 영웅/요약 */}
      <section className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {noHeroes ? (
            <div className="rounded-xl border border-dashed border-shap bg-b-neutral-3 p-6 text-center text-w-neutral-3">
              {mode === "competitive"
                ? "경쟁전 통계가 비어 있어요. 상단에서 '일반전'으로 전환해 보세요."
                : "해당 모드의 영웅 통계가 없습니다."}
            </div>
          ) : (
            <HeroStatsTable rows={heroRows} />
          )}
        </div>
        <aside className="lg:col-span-4 space-y-6">
          <RoleStatsTable rows={roleRows} />
          <SideSummary items={sideSummary} />
        </aside>
      </section>
    </main>
  );
}
