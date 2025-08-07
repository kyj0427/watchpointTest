import game1 from "@public/images/game_news/game0.png";
import game2 from "@public/images/game_news/game2.png";
import game3 from "@public/images/game_news/game3.png";
import game4 from "@public/images/game_news/game4.png";
import game5 from "@public/images/game_news/game5.png";
import game6 from "@public/images/game_news/game6.png";
import gameDetails1 from "@public/images/game_news/game0.png";
import gameDetails2 from "@public/images/game_news/game2.png";
import gameDetails3 from "@public/images/game_news/game3.png";

import trendingPlayerThumb1 from "@public/images/game_news/game0.png";
import trendingPlayerThumb2 from "@public/images/game_news/game2.png";
import trendingPlayerThumb3 from "@public/images/game_news/game3.png";
import trendingPlayerThumb4 from "@public/images/game_news/game4.png";
import trendingPlayerThumb5 from "@public/images/game_news/game5.png";
import trendingPlayerThumb6 from "@public/images/game_news/game6.png";

import user1 from "@public/images/users/avatar1.png";
import user2 from "@public/images/users/avatar2.png";
import user3 from "@public/images/users/avatar3.png";
import user4 from "@public/images/users/avatar4.png";
import user5 from "@public/images/users/avatar5.png";
import user6 from "@public/images/users/avatar6.png";

export const GameInfoDetailData = [
{
    id: "ttg1",
    title: "오버워치2 시즌 17 시작!",
    genres: ["시즌", "업데이트"],
    category: "Patch",
    author: {
        name: "Blizzard Entertainment",
        role: "Developer",
        avatar: "/images/users/avatar1.png",
    },
    photo: game1,
    images: [gameDetails1, gameDetails2, gameDetails3],
    video: {
        id: "1",
        videoUrl: "https://www.youtube.com/watch?v=7p5K_d1qgfQ",
        thumbnail: trendingPlayerThumb1,
        isLive: true
    },
    description:
        "시즌 17이 시작되었습니다! 신규 전장, 밸런스 패치, 그리고 다양한 보상이 추가됩니다.",
    views: "4.7k",
    publish: "4 days ago",
    },

    {
    id: "ttg2",
    title: "신규 영웅: 스펙터 공개",
    genres: ["영웅", "뉴스"],
    category: "Hero",
    author: {
        name: "Overwatch Team",
        role: "Developer",
        avatar: "/images/users/avatar2.png",
    },
    photo: game2,
    images: [gameDetails1, gameDetails2, gameDetails3],
    video: {
        id: "1",
        videoUrl: "https://youtu.be/F9uyTD-Mf4U?si=5rEpecj6UmE6tjGj",
        thumbnail: trendingPlayerThumb2,
        isLive: true
    },
    description:
        "은신과 함정 능력을 사용하는 신규 영웅 ‘스펙터’가 공개되었습니다. 팀 전략에 새로운 변화를 줄 예정입니다.",
    views: "2.5k",
    publish: "2 days ago",
    },

    {
    id: "ttg3",
    title: "아케이드 모드 업데이트",
    genres: ["모드", "이벤트"],
    category: "Event",
    author: {
        name: "Community Manager",
        role: "Community",
        avatar: "/images/users/avatar3.png",
    },
    photo: game3,
    images: [gameDetails1, gameDetails2, gameDetails3],
    video: {
        id: "1",
        videoUrl: "https://youtu.be/bX21wvAkXr0?si=VYFLbYsG3RWw6BIG",
        thumbnail: trendingPlayerThumb3,
        isLive: true
    },
    description:
        "아케이드 모드에 새로운 한정 이벤트 ‘로봇 러시’가 추가되어 색다른 전투를 경험할 수 있습니다.",
    views: "4.7k",
    publish: "4 days ago",
    },

    {
    id: "ttg4",
    title: "맵 리워크: 하나무라",
    genres: ["전장", "업데이트"],
    category: "Map",
    author: {
        name: "Map Design Team",
        role: "Developer",
        avatar: "/images/users/avatar4.png",
    },
    photo: game4,
    images: [gameDetails1, gameDetails2, gameDetails3],
    video: {
        id: "1",
        videoUrl: "https://youtu.be/EtcSz9VNWR0?si=BXd1RqZZTQql3wqy",
        thumbnail: trendingPlayerThumb4,
        isLive: true
    },
    description:
        "인기 전장 하나무라가 새로운 구조와 그래픽으로 리워크되어 전략적 플레이가 강화됩니다.",
    views: "2.5k",
    publish: "2 days ago",
    },

    {
    id: "ttg5",
    title: "시즌 이벤트: 여름 스포츠 축제",
    genres: ["이벤트", "스킨"],
    category: "Event",
    author: {
        name: "Blizzard Events",
        role: "Event Manager",
        avatar: "/images/users/avatar5.png",
    },
    photo: game5,
    images: [gameDetails1, gameDetails2, gameDetails3],
    video: {
        id: "1",
        videoUrl: "https://youtu.be/e-ZSUyfd15M?si=jl26NZGBvq8LZj9x",
        thumbnail: trendingPlayerThumb5,
        isLive: true
    },
    description:
        "여름 한정 이벤트로 다양한 스포츠 테마 스킨과 보상을 얻을 수 있습니다.",
    views: "4.7k",
    publish: "4 days ago",
    },
    
    {
    id: "ttg6",
    title: "밸런스 패치 노트 공개",
    genres: ["패치", "밸런스"],
    category: "Patch",
    author: {
        name: "Game Balance Team",
        role: "Developer",
        avatar: "/images/users/avatar6.png",
    },
    photo: game6,
    images: [gameDetails1, gameDetails2, gameDetails3],
    video: {
        id: "1",
        videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
        thumbnail: trendingPlayerThumb6,
        isLive: true
    },
    description:
        "영웅들의 밸런스가 조정되었습니다. 탱커의 체력이 상향되고 일부 딜러 영웅의 스킬이 조정됩니다.",
    views: "2.5k",
    publish: "2 days ago",
        },

];
