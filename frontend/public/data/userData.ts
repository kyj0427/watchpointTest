// public/data/userData.ts

// ====== Types ======
export type MostPlayedHero = {
  name: string;
  kda: string;
  kdaDetail: string;
  winRate: string;
  games: string;
  kdaWeight: "font-black" | "font-semibold";
};

export type RecentHero = {
  name: string;
  winRate: string;
  record: string;
};

export type PositionBar = {
  name: "탱커" | "딜러" | "힐러";
  height: string; // e.g. "h-[19px]"
  top: string;    // e.g. "top-[55px]"
};

export type StatCard = {
  title: string;
  value: string;
  trend: "Up" | "Down" | "Neutral";
  icon: string | null; // e.g. "/images/user/arrow-up.svg"
  position: string;    // tailwind class: "top-[268px]"
};

export type Profile = {
  id: string;
  name: string;
  tag?: number | string;
  lastUpdated?: string;

  // 티어/전적
  tier?: string;
  lp?: number;
  wins?: number;
  losses?: number;

  // 요약
  kda?: number;
  killPart?: number;

  // 플레이 스타일
  playStyle?: string;
  playStyleLabel?: string;

  // 하이라이트
  bestHighlight?: string;

  // 섹션 데이터
  mostPlayedHeroes?: MostPlayedHero[];
  recentHeroes?: RecentHero[];
  positionData?: PositionBar[];
  seasons?: string[];
  srValues?: string[];
  statsCards?: StatCard[];

  // 최근 20게임
  recent20Wins?: number;
  recent20Losses?: number;
  recent20WinRate?: number;
};

export type UserData = {
  defaultProfile: Profile;
  profiles: Record<string, Profile>;
};

// ====== Base(Default) Profile ======
const baseProfile: Profile = {
  id: "3507",
  name: "유저명",
  tag: 3507,
  lastUpdated: "1일 전",

  // 티어/전적
  tier: "그랜드마스터",
  lp: 1498,
  wins: 335,
  losses: 300,

  // 요약
  kda: 2.31,
  killPart: 59,

  // 플레이 스타일
  playStyle: "공격적",
  playStyleLabel: "빠른 침투 전문가",

  // 하이라이트
  bestHighlight: "설정된 베스트 하이라이트",

  // 모스트
  mostPlayedHeroes: [
    { name: "겐지",     kda: "3.96 KDA", kdaDetail: "145 / 182 / 335", winRate: "67%", games: "40게임", kdaWeight: "font-black" },
    { name: "솜브라",   kda: "3.02 KDA", kdaDetail: "212 / 104 / 200", winRate: "63%", games: "38게임", kdaWeight: "font-semibold" },
    { name: "트레이서", kda: "2.69 KDA", kdaDetail: "116 / 169 / 168", winRate: "39%", games: "38게임", kdaWeight: "font-semibold" },
    { name: "리퍼",     kda: "2.52 KDA", kdaDetail: "203 / 145 / 214", winRate: "45%", games: "32게임", kdaWeight: "font-semibold" },
    { name: "정크렛",   kda: "2.14 KDA", kdaDetail: "118 / 129 / 158", winRate: "57%", games: "22게임", kdaWeight: "font-semibold" },
  ],

  // 최근 20게임 영웅
  recentHeroes: [
    { name: "겐지",     winRate: "40%", record: "2승 3패" },
    { name: "솜브라",   winRate: "59%", record: "2승 1패" },
    { name: "트레이서", winRate: "50%", record: "1승 1패" },
  ],

  // 포지션 바
  positionData: [
    { name: "탱커", height: "h-[19px]", top: "top-[55px]" },
    { name: "딜러", height: "h-[52px]", top: "top-[22px]" },
    { name: "힐러", height: "h-[9px]",  top: "top-16" },
  ],

  // 시즌 SR 라벨
  seasons:  ["S28", "S29", "S30", "S31", "S32", "S33"],
  srValues: ["3700", "3900", "4100", "4350"],

  // 카드
  statsCards: [
    { title: "K/D Ratio",       value: "2.75",   trend: "Up",      icon: "/images/user/arrow-up.svg",   position: "top-[268px]" },
    { title: "Elims/10 min",    value: "38.2",   trend: "Up",      icon: "/images/user/image.svg",      position: "top-[344px]" },
    { title: "Final Blows",     value: "2500",   trend: "Up",      icon: "/images/user/arrow-up-2.svg", position: "top-[420px]" },
    { title: "Damage/10 min",   value: "12,540", trend: "Neutral", icon: null,                           position: "top-[497px]" },
    { title: "Objective Kills", value: "870",    trend: "Neutral", icon: null,                           position: "top-[577px]" },
    { title: "Healing/10 min",  value: "3,120",  trend: "Down",    icon: "/images/user/arrow-down.svg", position: "top-[653px]" },
  ],

  // 최근 20게임
  recent20Wins: 9,
  recent20Losses: 11,
  recent20WinRate: 45,
};

// ====== Exported Data ======
export const userData: UserData = {
  defaultProfile: baseProfile,

  // 여러 유저는 여기 추가
  profiles: {
    // 1) 기본 유저(동일)
    "3507": { ...baseProfile },

    // 2) 트레이서 장인 예시
    "tracer-777": {
      ...baseProfile,
      id: "tracer-777",
      name: "트레이서장인",
      tag: 7777,
      tier: "마스터",
      lp: 4100,
      kda: 2.85,
      playStyle: "교란",
      playStyleLabel: "후방 잠입 스페셜리스트",
      mostPlayedHeroes: [
        { name: "트레이서", kda: "3.10 KDA", kdaDetail: "220 / 130 / 250", winRate: "58%", games: "45게임", kdaWeight: "font-semibold" },
        { name: "솜브라",   kda: "2.80 KDA", kdaDetail: "160 / 90 / 180",  winRate: "55%", games: "28게임", kdaWeight: "font-semibold" },
        { name: "겐지",     kda: "2.40 KDA", kdaDetail: "140 / 150 / 170", winRate: "48%", games: "24게임", kdaWeight: "font-semibold" },
        { name: "리퍼",     kda: "2.20 KDA", kdaDetail: "120 / 110 / 140", winRate: "51%", games: "20게임", kdaWeight: "font-semibold" },
        { name: "정크렛",   kda: "1.90 KDA", kdaDetail: "90 / 100 / 90",   winRate: "47%", games: "15게임", kdaWeight: "font-semibold" },
      ],
      recentHeroes: [
        { name: "트레이서", winRate: "60%", record: "3승 2패" },
        { name: "솜브라",   winRate: "66%", record: "2승 1패" },
        { name: "겐지",     winRate: "50%", record: "1승 1패" },
      ],
      positionData: [
        { name: "탱커", height: "h-[10px]", top: "top-[64px]" },
        { name: "딜러", height: "h-[58px]", top: "top-[16px]" },
        { name: "힐러", height: "h-[6px]",  top: "top-[70px]" },
      ],
      recent20Wins: 12,
      recent20Losses: 8,
      recent20WinRate: 60,
    },
  },
};
