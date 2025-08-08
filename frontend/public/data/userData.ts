// 유저랭크 페이지/상세 공용 데이터 (템플릿 스타일 TS 모듈)
// 다른 파일은 수정하지 말고, 필요한 곳에서 다음처럼 사용:
//   import { userrankData } from "@/public/data/userrankProfileData";
// 또는 프로젝트 alias 기준에 맞춰 경로만 조정하세요.

// ==== 타입 ==== //
export type UserRankRow = {
  id: string;         // 고유 ID (문자열 권장)
  slug?: string;      // URL 식별자(옵션)
  name: string;       // 유저명
  tag?: number;       // 배틀태그 숫자 (옵션)
  tier?: string;
  lp?: number;
  wins?: number;
  losses?: number;
  kda?: number;
};

export type RecentHero = { hero: string; games: number; wins: number; losses: number };

export type UserRankProfile = UserRankRow & {
  killPart?: number;
  lastUpdated?: string;
  playStyle?: string;
  playStyleLabel?: string;
  bestHighlight?: string;

  recent20?: {
    wins: number;
    losses: number;
    byHero: RecentHero[];
  };

  positions?: Array<{ name: "탱커" | "딜러" | "힐러"; ratio: number }>;

  mostPlayed?: Array<{
    hero: string;
    k: number;
    d: number;
    a: number;
    games: number;
    winRate: number; // 0~100
  }>;

  seasons?: Array<{ code: string; sr: number }>;

  // 카드용 지표(있으면 노출, 없으면 "—")
  elimsPer10?: number;
  finalBlows?: number;
  damagePer10?: number;
  objKills?: number;
  healingPer10?: number;
};

// ==== 더미 데이터 (크롤러가 주기적으로 이 파일을 덮어쓰면 자동 반영) ==== //
const list: UserRankRow[] = [
  {
    id: "3507",
    slug: "genji-main",
    name: "유저명",
    tag: 3507,
    tier: "그랜드마스터",
    lp: 1498,
    wins: 335,
    losses: 300,
    kda: 2.31,
  },
  // 필요 시 더 추가
];

const profilesById: Record<string, UserRankProfile> = {
  "3507": {
    id: "3507",
    slug: "genji-main",
    name: "유저명",
    tag: 3507,
    tier: "그랜드마스터",
    lp: 1498,
    wins: 335,
    losses: 300,
    kda: 2.31,
    killPart: 59,
    lastUpdated: "1일 전",

    playStyle: "공격적",
    playStyleLabel: "빠른 침투 전문가",
    bestHighlight: "설정된 베스트 하이라이트",

    recent20: {
      wins: 9,
      losses: 11,
      byHero: [
        { hero: "겐지", games: 5, wins: 2, losses: 3 },
        { hero: "솜브라", games: 3, wins: 2, losses: 1 },
        { hero: "트레이서", games: 2, wins: 1, losses: 1 },
      ],
    },

    positions: [
      { name: "탱커", ratio: 0.25 },
      { name: "딜러", ratio: 0.7 },
      { name: "힐러", ratio: 0.05 },
    ],

    mostPlayed: [
      { hero: "겐지", k: 145, d: 182, a: 335, games: 40, winRate: 67 },
      { hero: "솜브라", k: 212, d: 104, a: 200, games: 38, winRate: 63 },
      { hero: "트레이서", k: 116, d: 169, a: 168, games: 38, winRate: 39 },
      { hero: "리퍼", k: 203, d: 145, a: 214, games: 32, winRate: 45 },
      { hero: "정크렛", k: 118, d: 129, a: 158, games: 22, winRate: 57 },
    ],

    seasons: [
      { code: "S28", sr: 3700 },
      { code: "S29", sr: 3900 },
      { code: "S30", sr: 4100 },
      { code: "S31", sr: 4350 },
    ],

    elimsPer10: 38.2,
    finalBlows: 2500,
    damagePer10: 12540,
    objKills: 870,
    healingPer10: 3120,
  },
};

// ==== 최종 export ==== //
export const userrankData = {
  list,            // 유저랭킹 테이블용
  profilesById,    // 상세 페이지용: id/slug로 찾아서 사용
};

// 사용 예시:
// const rows = userrankData.list;
// const profile = userrankData.profilesById["3507"];
