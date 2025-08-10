"use client"
// GameInfoMain_ReactScaffold.tsx
// 목적: 붙여주신 OP.GG 스타일의 "게임정보 메인"을 Next.js/React 컴포넌트 구조로 분리·이식한 스캐폴드
// - 광고/스크립트 제거, 정적인 레이아웃만 구성
// - Tailwind 기반 스타일 유지를 가정 (프로젝트에 이미 존재하는 유틸 클래스 사용)
// - 외부 이미지(next/image) 사용 편의를 위해 일단 unoptimized 옵션 사용 (next.config.js로 domains 등록 시 제거 가능)
// - 실제 데이터는 API 연동 전까지 mockData로 대체

import Image from "next/image";
import type {
  PlayerHeaderData,
  RoleTierSummary,
  RoleRowStat,
  HeroRowStat,
  SideSummaryItem,
} from "@public/data/userData";
import {
  mockRoleTiers,
  mockRoleRows,
  mockHeroRows,
  mockSideSummary,
  mockHeader,
} from "@public/data/userData";
import heroPortraits from "@public/images/game_hero/hero_portrait";

// ---------- Player Header ----------
function PlayerHeader({ data }: { data: PlayerHeaderData }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-shap">
      <div
        className="relative bg-cover bg-no-repeat rounded-24 overflow-hidden"
        style={{ backgroundImage: `url(${data.backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-end md:items-center h-[300px] p-4 md:p-6 gap-4">
          <div className="shrink-0">
            <Image
              src={data.portraitUrl}
              alt="portrait"
              width={72}
              height={72}
              className="rounded-xl bg-white/10 p-1"
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

// ---------- Role Tier Grid ----------
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

// ---------- Role Stats Table ----------
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

// ---------- Hero Stats Table ----------
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Side Summary ----------
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

// ---------- Main Component ----------
export default function UserComp() {
  const header = mockHeader;
  const roleTiers = mockRoleTiers;
  const roleRows = mockRoleRows;
  const heroRows = mockHeroRows;
  const summary = mockSideSummary;
  const winLose = summary.find((s) => s.label === "승패")?.value ?? "-";

  return (
    <main className="container mx-auto px-4 md:px-6 py-6 space-y-6">
      <PlayerHeader data={header} />

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
          <div className="mt-1 text-w-neutral-1">3시간 / 3초</div>
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
    </main>
  );
}