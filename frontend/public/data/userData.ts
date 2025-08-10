// public/data/userData.ts

// GameInfoMain_ReactScaffold.tsx
// 목적: 붙여주신 OP.GG 스타일의 "게임정보 메인"을 Next.js/React 컴포넌트 구조로 분리·이식한 스캐폴드
// - 광고/스크립트 제거, 정적인 레이아웃만 구성
// - Tailwind 기반 스타일 유지를 가정 (프로젝트에 이미 존재하는 유틸 클래스 사용)
// - 외부 이미지(next/image) 사용 편의를 위해 일단 unoptimized 옵션 사용 (next.config.js로 domains 등록 시 제거 가능)
// - 실제 데이터는 API 연동 전까지 mockData로 대체

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import heroPortraits from "@public/images/game_hero/hero_portrait";

// ---------- Types ----------
export type Role = "탱커" | "딜러" | "지원" ;

export interface PlayerHeaderData {
  uid: string;
  mode: "competitive" | "quick";
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
  backgroundUrl:
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltb9e273d8483050b8/631a8aab3ab6f40dd2a90699/1600_Tracer.jpg",
  portraitUrl:
    "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71d29660fd426e7b2a78a9b896027c79fcbe03c5c63e19c5937078eb13f8f9a5.png",
  name: "Revolution",
  title: "Overwatch Agent",
  lastUpdatedText: "최근 업데이트 : 32시간 전",
};

const mockRoleTiers: RoleTierSummary[] = [
  {
    roleIconUrl: "/images/game_hero/hero_role_logo/Tank.svg",
    rankIconUrl: "/images/game_tier/NoTierYet.png",
    placementPending: true,
    winRateText: "0%",
    winLoseText: "0승 / 0패",
    kdText: "8.00 : 1 K/D",
  },
  {
    roleIconUrl: "/images/game_hero/hero_role_logo/Damage.svg",
    rankIconUrl: "/images/game_tier/master.png",
    tierText: "마스터 2",
    scoreText: "3,800",
    winRateText: "69%",
    winLoseText: "9승 / 3패",
    kdText: "2.64 : 1 K/D",
    kdDetailText: "21.7 / 8.2",
  },
  {
    roleIconUrl: "/images/game_hero/hero_role_logo/Support.svg",
    rankIconUrl: "/images/game_tier/diamond.png",
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
    roleIconUrl: "/images/game_hero/hero_role_logo/Damage.svg",
    playTime: "2시간",
    winRatio: "69%",
    win: "9W",
    lose: "3L",
    kd: "2.64 : 1",
    kdDetail: "21.7 / 8.2",
  },
  {
    roleLabel: "지원",
    roleIconUrl: "/images/game_hero/hero_role_logo/Support.svg",
    playTime: "46분",
    winRatio: "33%",
    win: "1W",
    lose: "1L",
    kd: "2.29 : 1",
    kdDetail: "23.7 / 10.3",
  },
  {
    roleLabel: "돌격",
    roleIconUrl: "/images/game_hero/hero_role_logo/Tank.svg",
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
      "/images/game_hero/hero_portrait/tracer.png",
    gradeText: "A",
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
      "/images/game_hero/hero_portrait/genji.png",
    gradeText: "A",
    win: "3",
    lose: "0",
    winRatio: "100%",
    kd: "3.43 : 1",
    kdDetail: "24.00 / 7.00",
    avgObjective: "47초",
    playTime: "26분",
    moreLink: "#Hero-14",
  },
    {
    heroName: "소전",
    heroImageUrl:
      "/images/game_hero/hero_portrait/sojourn.png",
    gradeText: "A",
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
    heroName: "키리코",
    heroImageUrl:
      "/images/game_hero/hero_portrait/kiriko.png",
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
  {
    heroName: "캐서디",
    heroImageUrl:
      "/images/game_hero/hero_portrait/cassidy.png",
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
    heroName: "브리기테",
    heroImageUrl:
      "/images/game_hero/hero_portrait/brigitte.png",
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
    {
    heroName: "둠피스트",
    heroImageUrl:
      "/images/game_hero/hero_portrait/doomfist.png",
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
    heroName: "한조",
    heroImageUrl:
      "/images/game_hero/hero_portrait/hanzo.png",
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
  {
    heroName: "벤처",
    heroImageUrl:
      "/images/game_hero/hero_portrait/venture.png",
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
    heroName: "모이라",
    heroImageUrl:
      "/images/game_hero/hero_portrait/moira.png",
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
    {
    heroName: "젠야타",
    heroImageUrl:
      "/images/game_hero/hero_portrait/zenyatta.png",
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
    heroName: "바티스트",
    heroImageUrl:
      "/images/game_hero/hero_portrait/baptiste.png",
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
  {
    heroName: "애쉬",
    heroImageUrl:
      "/images/game_hero/hero_portrait/ashe.png",
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
    heroName: "아나",
    heroImageUrl:
      "/images/game_hero/hero_portrait/ana.png",
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
    {
    heroName: "정커퀸",
    heroImageUrl:
      "/images/game_hero/hero_portrait/junkerqueen.png",
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
    heroName: "일리아리",
    heroImageUrl:
      "/images/game_hero/hero_portrait/illari.png",
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
  {
    heroName: "메르시",
    heroImageUrl:
      "/images/game_hero/hero_portrait/mercy.png",
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
    heroName: "시메트라",
    heroImageUrl:
      "/images/game_hero/hero_portrait/symmetra.png",
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
    {
    heroName: "루시우",
    heroImageUrl:
      "/images/game_hero/hero_portrait/lucio.png",
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
    heroName: "위도우메이커",
    heroImageUrl:
      "/images/game_hero/hero_portrait/widowmaker.png",
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
  {
    heroName: "라인하르트",
    heroImageUrl:
      "/images/game_hero/hero_portrait/rainhardt.png",
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

export {
  mockRoleTiers,
  mockRoleRows,
  mockHeroRows,
  mockSideSummary,
  mockHeader
}


