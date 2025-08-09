// GameInfoMain_ReactScaffold.tsx
// 목적: 붙여주신 OP.GG 스타일의 "게임정보 메인"을 Next.js/React 컴포넌트 구조로 분리·이식한 스캐폴드
// - 광고/스크립트 제거, 정적인 레이아웃만 구성
// - Tailwind 기반 스타일 유지를 가정 (프로젝트에 이미 존재하는 유틸 클래스 사용)
// - 외부 이미지(next/image) 사용 편의를 위해 일단 unoptimized 옵션 사용 (next.config.js로 domains 등록 시 제거 가능)
// - 실제 데이터는 API 연동 전까지 mockData로 대체

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

// ---------- Types ----------
export type Role = "탱커" | "딜러" | "지원" | "돌격" | "공격";

export interface PlayerHeaderData {
  uid: string;
  mode: "competitive" | "quick";
  platform: "pc" | "console";
  backgroundUrl: string;
  portraitUrl: string;
  name: string;
  title?: string;
  lastUpdatedText?: string; // 예: "최근 업데이트 : 32시간 전"
}

export interface RoleTierSummary {
  roleIconUrl: string;
  rankIconUrl: string;
  tierText?: string; // 예: "마스터 2"
  scoreText?: string; // 예: "3,800"
  winRateText?: string; // 예: "69%"
  winLoseText?: string; // 예: "9승 / 3패"
  kdText?: string; // 예: "2.64 : 1 K/D"
  kdDetailText?: string; // 예: "21.7 / 8.2"
  placementPending?: boolean; // 배치 전
}

export interface RoleRowStat {
  roleLabel: string; // 공격/지원/돌격
  roleIconUrl: string;
  playTime: string; // 예: "2시간"
  winRatio: string; // "69%"
  win: string; // "9W"
  lose: string; // "3L"
  kd: string; // "2.64 : 1"
  kdDetail?: string; // "21.7 / 8.2"
}

export interface HeroRowStat {
  heroName: string; // 트레이서 등
  heroImageUrl: string;
  gradeText: string; // B, A 등급
  win: string; // "2"
  lose: string; // "1"
  winRatio: string; // "58%"
  kd: string; // "2.29 : 1"
  kdDetail?: string; // "20.00 / 8.75"
  avgObjective?: string; // "59초" 등 (원문 테이블에서 평균임무기여)
  playTime: string; // "44분"
  moreLink?: string; // 영웅 상세 링크
}

export interface SideSummaryItem { label: string; value: string; }

// ---------- Mock Data (원문 HTML을 바탕으로 축약) ----------
const mockHeader: PlayerHeaderData = {
  uid: "201249062153129198199098",
  mode: "competitive",
  platform: "pc",
  backgroundUrl:
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltb9e273d8483050b8/631a8aab3ab6f40dd2a90699/1600_Tracer.jpg",
  portraitUrl:
    "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71d29660fd426e7b2a78a9b896027c79fcbe03c5c63e19c5937078eb13f8f9a5.png",
  name: "Fickle",
  title: "Overwatch Agent",
  lastUpdatedText: "최근 업데이트 : 32시간 전",
};

const mockRoleTiers: RoleTierSummary[] = [
  {
    roleIconUrl: "https://s-overwatch.op.gg/img/icon/icon_tank_transparent@2x.png",
    rankIconUrl: "https://s-overwatch.op.gg/img/rankIcon/rank-1.png",
    placementPending: true,
    winRateText: "0%",
    winLoseText: "0승 / 0패",
    kdText: "8.00 : 1 K/D",
  },
  {
    roleIconUrl: "https://s-overwatch.op.gg/img/icon/icon_attack_transparent@2x.png",
    rankIconUrl: "https://s-overwatch.op.gg/img/rankIcon/TierMaster.png",
    tierText: "마스터 2",
    scoreText: "3,800",
    winRateText: "69%",
    winLoseText: "9승 / 3패",
    kdText: "2.64 : 1 K/D",
    kdDetailText: "21.7 / 8.2",
  },
  {
    roleIconUrl: "https://s-overwatch.op.gg/img/icon/icon_support_transparent@2x.png",
    rankIconUrl: "https://s-overwatch.op.gg/img/rankIcon/TierDiamond.png",
    tierText: "다이아몬드 4",
    scoreText: "3,100",
    winRateText: "33%",
    winLoseText: "1승 / 1패",
    kdText: "2.29 : 1 K/D",
    kdDetailText: "23.7 / 10.3",
  },
];

const mockRoleRows: RoleRowStat[] = [
  {
    roleLabel: "공격",
    roleIconUrl: "https://s-overwatch.op.gg/img/icon/icon_attack.png",
    playTime: "2시간",
    winRatio: "69%",
    win: "9W",
    lose: "3L",
    kd: "2.64 : 1",
    kdDetail: "21.7 / 8.2",
  },
  {
    roleLabel: "지원",
    roleIconUrl: "https://s-overwatch.op.gg/img/icon/icon_support.png",
    playTime: "46분",
    winRatio: "33%",
    win: "1W",
    lose: "1L",
    kd: "2.29 : 1",
    kdDetail: "23.7 / 10.3",
  },
  {
    roleLabel: "돌격",
    roleIconUrl: "https://s-overwatch.op.gg/img/icon/icon_tank.png",
    playTime: "2분",
    winRatio: "-",
    win: "0W",
    lose: "0L",
    kd: "8.00 : 1",
    kdDetail: "0 / 0",
  },
];

const mockHeroRows: HeroRowStat[] = [
  {
    heroName: "트레이서",
    heroImageUrl:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/a66413200e934da19540afac965cfe8a2de4ada593d9a52d53108bb28e8bbc9c.png",
    gradeText: "B",
    win: "2",
    lose: "1",
    winRatio: "58%",
    kd: "2.29 : 1",
    kdDetail: "20.00 / 8.75",
    avgObjective: "59초",
    playTime: "44분",
    moreLink: "#Hero-3",
  },
  {
    heroName: "겐지",
    heroImageUrl:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png",
    gradeText: "B",
    win: "3",
    lose: "0",
    winRatio: "100%",
    kd: "3.43 : 1",
    kdDetail: "24.00 / 7.00",
    avgObjective: "47초",
    playTime: "26분",
    moreLink: "#Hero-14",
  },
  // ... 필요시 더 추가
];

const mockSideSummary: SideSummaryItem[] = [
  { label: "승패", value: "12승 6패 (67%)" },
  { label: "K/D", value: "2.59 : 1" },
  { label: "킬", value: "20.1" },
  { label: "데스", value: "7.8" },
  { label: "게임당 평균 딜량", value: "8,870" },
  { label: "게임당 평균 힐량", value: "2,577" },
  { label: "플레이 시간", value: "3시간" },
  { label: "일 평균 플레이 시간", value: "3초" },
  { label: "최고 폭주 시간", value: "4분 54초" },
  { label: "평균 임무 기여 시간", value: "48초" },
  { label: "평균 임무 기여 처치", value: "5.44" },
];

// ---------- Components ----------
function PlayerHeader({ data }: { data: PlayerHeaderData }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-shap">
      <div
        className="relative h-56 md:h-72 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${data.backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-end h-full p-4 md:p-6 gap-4">
          <div className="shrink-0">
            <Image
              src={data.portraitUrl}
              alt="portrait"
              width={72}
              height={72}
              className="rounded-xl bg-white/10 p-1"
              unoptimized
            />
            <div className="mt-2 text-center text-xs text-white/80">{data.platform.toUpperCase()}</div>
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
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <div className="flex items-center gap-3">
            <Image src={it.roleIconUrl} alt="role" width={32} height={32} unoptimized />
            <Image src={it.rankIconUrl} alt="rank" width={40} height={40} unoptimized />
            <div className="ml-auto text-right">
              {it.placementPending ? (
                <div className="text-sm text-w-neutral-2">
                  <b>경쟁전 실력 평점</b> (배치 전)
                </div>
              ) : (
                <>
                  {it.tierText && <div className="text-sm text-navy">{it.tierText}</div>}
                  {it.scoreText && <div className="text-lg font-semibold text-navy">{it.scoreText}</div>}
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
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="px-4 py-3 flex items-center gap-2">
                <Image src={r.roleIconUrl} alt={r.roleLabel} width={20} height={20} unoptimized />
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
                  <span className="text-w-neutral-2">{r.win} / {r.lose}</span>
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
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-shap">
          {rows.map((h, i) => (
            <tr key={i}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image src={h.heroImageUrl} alt={h.heroName} width={36} height={36} className="rounded" unoptimized />
                  <span>{h.heroName}</span>
                </div>
              </td>
              <td className="px-4 py-3"><b className="text-cyan-400">{h.gradeText}</b></td>
              <td className="px-4 py-3"><b className="text-navy">{h.win}</b></td>
              <td className="px-4 py-3"><b>{h.lose}</b></td>
              <td className="px-4 py-3">{h.winRatio}</td>
              <td className="px-4 py-3">
                <b>{h.kd}</b>
                {h.kdDetail && <span className="ml-2 text-w-neutral-2">{h.kdDetail}</span>}
              </td>
              <td className="px-4 py-3">{h.avgObjective ?? "-"}</td>
              <td className="px-4 py-3">{h.playTime}</td>
              <td className="px-4 py-3 text-right">
                {h.moreLink && (
                  <Link href={h.moreLink} className="text-primary underline">더보기</Link>
                )}
              </td>
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
        {items.map((it, i) => (
          <li key={i} className="flex justify-between gap-4">
            <b className="text-w-neutral-1">{it.label}</b>
            <span className="text-right text-w-neutral-2">{it.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLite() {
  return (
    <footer className="mt-10 py-8 border-t border-shap text-sm text-w-neutral-2">
      <div className="container mx-auto">
        <div>© 2012-2025 OP.GG. Data based on Overwatch.</div>
        <div className="opacity-80 mt-2">본 데모는 학습/개발 참고용 레이아웃 이식본입니다.</div>
      </div>
    </footer>
  );
}

// ---------- Page (Preview) ----------
export default function GameInfoMainPage() {
  // 실제에선 useEffect+fetch로 교체
  const header = mockHeader;
  const roleTiers = mockRoleTiers;
  const roleRows = mockRoleRows;
  const heroRows = mockHeroRows;
  const summary = mockSideSummary;

  const winLoseSummary = useMemo(() => {
    const item = summary.find((s) => s.label === "승패");
    return item?.value ?? "-";
  }, [summary]);

  return (
    <main className="container mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* 헤더 */}
      <PlayerHeader data={header} />

      {/* 상단 요약 카드 (승률/KD/플레이시간 등) -> 간단 예시 */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <h3 className="text-lg font-semibold">경쟁전 실력 평점</h3>
          <div className="mt-2 text-w-neutral-2">승률, K/D, 플레이 시간 요약</div>
          <div className="mt-1 text-w-neutral-1">{winLoseSummary}</div>
        </div>
        <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <h3 className="text-lg font-semibold">역할별 티어</h3>
          <div className="mt-2 text-w-neutral-2">현재 시즌 배치/점수</div>
        </div>
        <div className="rounded-xl border border-shap bg-b-neutral-3 p-4">
          <h3 className="text-lg font-semibold">즐겨찾기/갱신</h3>
          <div className="mt-2 text-w-neutral-2">유저 액션 섹션</div>
        </div>
      </section>

      {/* 역할 티어 그리드 */}
      <RoleTierGrid items={roleTiers} />

      <section className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* 영웅별 통계 테이블 */}
          <HeroStatsTable rows={heroRows} />
        </div>
        <aside className="lg:col-span-4 space-y-6">
          {/* 역할별 요약 테이블 */}
          <RoleStatsTable rows={roleRows} />

          {/* 사이드 종합 통계 */}
          <SideSummary items={summary} />
        </aside>
      </section>

      <FooterLite />
    </main>
  );
}
