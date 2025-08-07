// frontend/public/data/gameinfoHomeBannerData.ts

// 메인 배너(상단 스와이퍼)에서 쓰는 아이템 타입
export interface GameinfoBannerItem {
  id: number;
  image: string;   // public 경로 문자열
  title: string;
  game: string;
  language: string;
  link: string;
}

// 하단 카드/섹션 등에서 쓰는 2번째 데이터 타입 (필요 시)
export interface GameinfoTwoBannerItem {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  link: string;
}

// 친구 아바타가 포함된 3번째 데이터 타입 (필요 시)
export interface GameinfoThreeBannerItem {
  id: string;
  image: string;
  title: string;
  friends: string[]; // 사용자 이미지 경로
}

/* ────────────────────────────────────────────────────────────
   ✔ 모든 경로는 public 기준 절대경로 문자열입니다.
   예) /images/...   (=> 실제 파일: frontend/public/images/...)
   ──────────────────────────────────────────────────────────── */

export const gameinfoHomeOneBannerData: GameinfoBannerItem[] = [
  {
    id: 1,
    image: "/images/game_hero/hero_portrait_bg/D_Va_heroImage_2.jpg",
    title: "게임정보",
    game: "게임정보",
    language: "영웅정보",
    link: "/game-details-one",
  },
  {
    id: 2,
    image: "/images/photos/overwatch_04.avif",
    title: "EXPLORE. FIGHT. WIN.",
    game: "Battle Arena",
    language: "Global",
    link: "/game-details-one",
  },
  {
    id: 3,
    image: "/images/photos/overwatch_05.jpg",
    title: "SURVIVE. EVOLVE. DOMINATE.",
    game: "Survival Quest",
    language: "English",
    link: "/game-details-one",
  },
  {
    id: 4,
    image: "/images/photos/overwatch_06.jpg",
    title: "Survival Quest",
    game: "Survival Quest",
    language: "English",
    link: "/game-details-one",
  },
];

export const gameinfoHomeTwoBannerData: GameinfoTwoBannerItem[] = [
  {
    id: 1,
    image: "/images/photos/overwatch_06.jpg",
    title: "Play & Earn",
    description:
      "Elevate Your Gaming Experience with our GameCo and Level Up Nexus.",
    buttonLabel: "Start Now",
    link: "/game-details-one",
  },
  {
    id: 2,
    image: "/images/photos/overwatch_07.jpg",
    title: "Explore Games",
    description:
      "Experience the thrill of adventure with our vast collection of games.",
    buttonLabel: "Explore Now",
    link: "/game-details-one",
  },
  {
    id: 3,
    image: "/images/photos/overwatch_08.jpg",
    title: "Join the Fun",
    description:
      "Join our community of gamers and enjoy our games for free.",
    buttonLabel: "Join Now",
    link: "/game-details-one",
  },
];

export const gameinfoHomeThreeBannerData: GameinfoThreeBannerItem[] = [
  {
    id: "1",
    image: "/images/photos/overwatch_09.jpg",
    title: "Play & Earn",
    friends: [
      "/images/users/user1.png",
      "/images/users/user2.png",
      "/images/users/user3.png",
      "/images/users/user4.png",
    ],
  },
  {
    id: "2",
    image: "/images/photos/overwatch_10.jpg",
    title: "Play & Earn",
    friends: [
      "/images/users/user5.png",
      "/images/users/user6.png",
      "/images/users/user7.png",
      "/images/users/user8.png",
    ],
  },
  {
    id: "3",
    image: "/images/photos/overwatch_11.png",
    title: "Play & Earn",
    friends: [
      "/images/users/user9.png",
      "/images/users/user10.png",
      "/images/users/user11.png",
      "/images/users/user12.png",
    ],
  },
];

// 컴포넌트에서 기본 배열 하나만 필요하다면 이 값을 import 하세요.
const gameinfoHomeBannerData: GameinfoBannerItem[] = gameinfoHomeOneBannerData;
export default gameinfoHomeBannerData;
