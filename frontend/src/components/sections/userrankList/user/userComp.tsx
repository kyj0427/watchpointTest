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
  assets?: {
    roleIcons: { tank: string; damage: string; support: string }; // 무시(로컬만 사용)
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
  playtime: number; // seconds
  icon?: string | null; // 무시(로컬만 사용)
  role?: "tank" | "damage" | "support" | string | null; // 원본에 다양한 값이 들어올 수 있어 string 허용
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
  winRatio: string;
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
const API = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.31:4000";
const DEFAULT_PLATFORM = "pc";

/* 로컬 자산 경로(스샷 기준) */
const ROLE_BASE = "/images/game_hero/hero_role_logo";
const PORTRAIT_BASE = "/images/game_hero/hero_portrait";

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

/** 역할 아이콘: 무조건 로컬 고정 */
const roleIconFromLeft = (_left: Left | null | undefined, role: "tank" | "damage" | "support") => {
  const map: Record<"tank" | "damage" | "support", string> = {
    tank: `${ROLE_BASE}/Tank.svg`,
    damage: `${ROLE_BASE}/Damage.svg`,
    support: `${ROLE_BASE}/Support.svg`,
  };
  return map[role];
};

/** 티어 아이콘: 안전 매핑 ("master 2" -> "master.png", 없으면 NoTierYet) */
const TIER_FILE_MAP: Record<string, string> = {
  bronze: "bronze.png",
  silver: "silver.png",
  gold: "gold.png",
  platinum: "platinum.png",
  diamond: "diamond.png",
  master: "master.png",
  grandmaster: "grandmaster.png",
  unranked: "NoTierYet.png",
};
const getRankIconUrl = (division?: string) => {
  const key = (division || "unranked").toLowerCase().split(/\s+/)[0];
  const file = TIER_FILE_MAP[key] || TIER_FILE_MAP.unranked;
  return `/images/game_tier/${file}`;
};

/** 영웅명 → 파일명 규칙/예외 */
const HERO_FILE_OVERRIDES: Record<string, string> = {
  mccree: "cassidy",
  "soldier: 76": "soldier-76",
  "d.va": "dva",
  "torbjörn": "torbjorn",
  "lúcio": "lucio",
  "wrecking ball": "wrecking_ball",
};
const toHeroFilename = (raw: string) => {
  const lower = (raw || "").toLowerCase().trim();
  if (HERO_FILE_OVERRIDES[lower]) return HERO_FILE_OVERRIDES[lower];
  return lower
    .replace(/[’'"]/g, "")
    .replace(/[.:]/g, "")
    .replace(/\s+/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
/** 영웅 초상: 무조건 로컬 고정 */
const heroPortraitUrl = (heroName?: string) => {
  if (!heroName) return "/images/heroes/_placeholder.png";
  const file = toHeroFilename(heroName);
  return `${PORTRAIT_BASE}/${file}.png`;
};

/** 영웅 영어파일키 → 한글명 매핑 (파일 키 기준: toHeroFilename 결과와 동일) */
const HERO_NAME_KR: Record<string, string> = {
  // 🛡 탱커
  rein: "라인하르트",
  reinhardt: "라인하르트",
  zarya: "자리야",
  winston: "윈스턴",
  orisa: "오리사",
  sigma: "시그마",
  dva: "D.Va",
  ramattra: "라마트라",
  junker_queen: "정커퀸",
  roadhog: "로드호그",
  wrecking_ball: "레킹볼",
  mauga: "마우가",
  doomfist: "둠피스트",

  // 🎯 공격
  genji: "겐지",
  hanzo: "한조",
  ashe: "애쉬",
  bastion: "바스티온",
  cassidy: "캐서디",
  echo: "에코",
  junkrat: "정크랫",
  mei: "메이",
  pharah: "파라",
  reaper: "리퍼",
  sojourn: "소전",
  "soldier-76": "솔저: 76",
  sombra: "솜브라",
  symmetra: "시메트라",
  torbjorn: "토르비욘",
  tracer: "트레이서",
  widowmaker: "위도우메이커",
  venture: "벤처",
  hazard: "해저드",      // 신규
  freja: "프레야",       // 신규

  // 💉 지원
  ana: "아나",
  baptiste: "바티스트",
  brigitte: "브리기테",
  kiriko: "키리코",
  lifeweaver: "라이프위버",
  lucio: "루시우",
  mercy: "메르시",
  moira: "모이라",
  zenyatta: "젠야타",
  illari: "일라리",
};

/* ----------------------- role aggregation helpers ----------------------- */
type RoleKey = "tank" | "damage" | "support";
type RoleAgg = { wins: number; losses: number; games: number; playtime: number; winrate: number; kd: string };

// 역할 문자열 정규화
const normalizeRole = (raw?: string | null): RoleKey | undefined => {
  if (!raw) return undefined;
  const s = String(raw).toLowerCase().trim();
  if (s === "tank" || s === "tanker") return "tank";
  if (s === "damage" || s === "dps" || s === "offense" || s === "attack") return "damage";
  if (s === "support" || s === "healer") return "support";
  return undefined; // 모르면 스킵
};

const emptyAgg = (): RoleAgg => ({ wins: 0, losses: 0, games: 0, playtime: 0, winrate: 0, kd: "-" });

const computeRoleAgg = (list: HeroRow[] | undefined | null): Record<RoleKey, RoleAgg> => {
  const acc: Record<RoleKey, RoleAgg & { _maxPt?: number }> = {
    tank: { ...emptyAgg() },
    damage: { ...emptyAgg() },
    support: { ...emptyAgg() },
  };
  if (!list?.length) {
    return { tank: emptyAgg(), damage: emptyAgg(), support: emptyAgg() };
  }

  for (const h of list) {
    if (!h) continue;
    const r = normalizeRole(h.role as any);
    if (!r) continue; // 알 수 없는 역할은 제외
    const m = acc[r];
    m.wins += h.wins ?? 0;
    m.losses += h.losses ?? 0;
    m.games += h.games ?? 0;
    m.playtime += h.playtime ?? 0;

    // KD 대표값: 해당 역할에서 가장 많이 플레이한 영웅의 KD
    const pt = h.playtime ?? 0;
    if (pt > (m._maxPt ?? -1)) {
      m.kd = h.kd ?? "-";
      m._maxPt = pt;
    }
  }

  (["tank", "damage", "support"] as RoleKey[]).forEach((k) => {
    const m = acc[k];
    const total = m.wins + m.losses;
    m.winrate = total > 0 ? (m.wins / total) * 100 : 0;
    delete (m as any)._maxPt;
  });

  return {
    tank: acc.tank,
    damage: acc.damage,
    support: acc.support,
  };
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

  const headerData = useMemo(() => {
    const name = q || left?.profile.username || "Player";
    const title = mode === "quickplay" ? "Quickplay" : left?.rank || "";
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

  /* ---------- 역할별 집계 ---------- */
  // 1) 원본 heroes를 병합할 때도 역할 정규화 적용
  const mergedHeroes = useMemo<HeroRow[]>(() => {
    const alias = (k: string) => {
      const s = k.toLowerCase();
      if (s === "mccree") return "cassidy";
      if (s === "soldier: 76") return "soldier-76";
      return s;
    };

    const acc = new Map<string, HeroRow>();
    for (const h of heroes ?? []) {
      if (!h?.hero) continue;
      const key = alias(h.hero);
      const normRole = normalizeRole(h.role as any);
      const prev = acc.get(key);
      if (!prev) {
        acc.set(key, { ...h, hero: key, role: normRole || undefined });
      } else {
        acc.set(key, {
          ...prev,
          wins: (prev.wins ?? 0) + (h.wins ?? 0),
          losses: (prev.losses ?? 0) + (h.losses ?? 0),
          games: (prev.games ?? 0) + (h.games ?? 0),
          playtime: (prev.playtime ?? 0) + (h.playtime ?? 0),
          kd: (h.playtime ?? 0) > (prev.playtime ?? 0) ? h.kd : prev.kd,
          icon: prev.icon || h.icon,
          role: prev.role || normRole || undefined,
        });
      }
    }
    return Array.from(acc.values());
  }, [heroes]);

  const roleAgg = useMemo(() => computeRoleAgg(mergedHeroes), [mergedHeroes]);

  const roleTierItems = useMemo<RoleTierSummary[]>(() => {
    const roles: RoleKey[] = ["tank", "damage", "support"];
    return roles.map((key) => {
      const v = (left?.roles as any)?.[key] ?? null;
      const a = roleAgg[key];
      return {
        roleKey: key,
        roleIconUrl: roleIconFromLeft(left, key),
        rankIconUrl: getRankIconUrl(v?.division),
        placementPending: mode === "competitive" ? !v?.division : true,
        tierText:
          mode === "competitive" && v?.division
            ? `${v.division}${typeof v.tier === "number" ? ` ${v.tier}` : ""}`
            : undefined,
        scoreText: undefined,
        winRateText: fmtPercent(Math.round(a.winrate)),
        winLoseText: `${a.wins}승 ${a.losses}패`,
        kdText: "K/D",
        kdDetailText: fmtKD(a.kd),
      };
    });
  }, [left, mode, roleAgg]);

  const roleRows = useMemo<RoleRowStat[]>(() => {
    const defs = [
      { label: "탱커", key: "tank" as RoleKey },
      { label: "딜러", key: "damage" as RoleKey },
      { label: "서포터", key: "support" as RoleKey },
    ];
    return defs.map(({ label, key }) => {
      const a = roleAgg[key];
      return {
        roleLabel: label,
        roleIconUrl: roleIconFromLeft(left, key),
        playTime: secToHMM(a.playtime),
        winRatio: fmtPercent(Math.round(a.winrate)),
        win: a.wins,
        lose: a.losses,
        kd: fmtKD(a.kd),
      };
    });
  }, [left, roleAgg]);

  // --- 영웅 테이블용 가공 (정렬/표시 전용)
  const heroRows = useMemo<HeroRowStat[]>(() => {
    const merged = mergedHeroes
      .filter((h) => (h.games ?? 0) > 0)
      .sort((a, b) => (b.playtime ?? 0) - (a.playtime ?? 0));

    return merged.map((h) => {
      const fileKey = toHeroFilename(h.hero);
      return {
        heroName: HERO_NAME_KR[fileKey] || h.hero,
        heroImageUrl: heroPortraitUrl(h.hero),
        gradeText: "-",
        win: h.wins,
        lose: h.losses,
        winRatio: fmtPercent(h.winrate),
        kd: fmtKD(h.kd),
        kdDetail: undefined,
        avgObjective: h.objective_avg_10m != null ? `${h.objective_avg_10m}` : "-",
        playTime: secToHMM(h.playtime),
      };
    });
  }, [mergedHeroes]);

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

  if (!uid) return <div className="text-w-neutral-4">uid가 없습니다.</div>;
  if (loading) return <div className="text-w-neutral-4">불러오는 중…</div>;
  if (err) return <div className="text-red-400">{err}</div>;
  if (!left) return null;

  return (
    <main className="container mx-auto px-4 md:px-6 py-6 space-y-6 mt-20">
      <div className="flex items-center gap-2">
        <div className="rounded-xl border border-shap p-1 bg-b-neutral-3">
          <button
            onClick={() => setMode("competitive")}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              mode === "competitive" ? "bg-primary text-white" : "text-w-neutral-1"
            }`}
          >
            경쟁전
          </button>
          <button
            onClick={() => setMode("quickplay")}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              mode === "quickplay" ? "bg-primary text-white" : "text-w-neutral-1"
            }`}
          >
            일반전
          </button>
        </div>

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

      <section className="grid md:grid-cols-3 gap-4">
  <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
    <h3 className="text-lg font-semibold">
      {mode === "competitive" ? "경쟁전 실력 평점" : "일반전 플레이 평점"}
    </h3>
    <div className="mt-2 text-w-neutral-2">
      {mode === "competitive"
        ? "승률, K/D, 플레이 시간 요약"
        : "승률, K/D, 플레이 시간 요약 (일반전)"}
    </div>
    <div className="mt-1 text-w-neutral-1">{winLose}</div>
  </div>
  <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
    <h3 className="text-lg font-semibold">역할별 티어</h3>
    <div className="mt-2 text-w-neutral-2">
      {mode === "competitive" ? "현재 시즌 배치/점수" : "일반전 역할별 통계"}
    </div>
  </div>
  <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
    <h3 className="text-lg font-semibold">
      {mode === "competitive" ? "플레이 시간 평점" : "일반전 플레이 시간"}
    </h3>
    <div className="mt-2 text-w-neutral-2">
      {mode === "competitive" ? "플레이 시간/일 평균 플레이 시간" : "일반전 플레이 시간 요약"}
    </div>
    <div className="mt-1 text-w-neutral-1">-</div>
  </div>
</section>


      <RoleTierGrid items={roleTierItems} />

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
