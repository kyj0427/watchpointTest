import game1 from "@public/images/games/game1.png";
import game2 from "@public/images/games/game2.png";
import game3 from "@public/images/games/game3.png";
import game4 from "@public/images/games/game4.png";
import game5 from "@public/images/games/game5.png";
import game6 from "@public/images/games/game6.png";
import gameDetails1 from "@public/images/games/gameDetails1.1.png";
import gameDetails2 from "@public/images/library/libraryDetails1.png";
import gameDetails3 from "@public/images/library/libraryDetails2.png";

import trendingPlayerThumb1 from "@public/images/photos/trendingPlayerThumb.png";
import trendingPlayerThumb2 from "@public/images/library/libraryDetails1.png";
import trendingPlayerThumb3 from "@public/images/library/libraryDetails2.png";
import trendingPlayerThumb4 from "@public/images/library/libraryDetails3.png";
import trendingPlayerThumb5 from "@public/images/library/libraryDetails4.png";
import trendingPlayerThumb6 from "@public/images/library/libraryDetails2.png";

import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user5 from "@public/images/users/user5.png";
import user6 from "@public/images/users/user6.png";

export const topTrendingGames = [
    {
        id: "ttg1",
        category: "Strategy",
        genres: ["Player",],
        title: "Neo Frontiers: Build Rule Prosper",
        photo: game1,
        images: [
            gameDetails1,
            gameDetails2,
            gameDetails3,
        ],
        video: {
            id: "1",
            videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
            thumbnail: trendingPlayerThumb1,
            isLive: true
        },
        description:
            "Step into the role of a visionary leader and build a prosperous civilization through innovation and strategic planning.",
        views: "4.7k",
        publish: "4 days ago",
        author: {
            name: "David Smith",
            role: "Leader",
            avatar: user1
        },
    },
    {
        id: "ttg2",
        category: "Simulation",
        genres: ["Game",],
        title: "Metropolis Tycoon: Urban Empire",
        photo: game2,
        images: [
            gameDetails1,
            gameDetails2,
            gameDetails3,
        ],
        video: {
            id: "1",
            videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
            thumbnail: trendingPlayerThumb2,
            isLive: true
        },
        description:
            "Lead your urban empire to greatness by making critical decisions and tackling live challenges.",
        views: "2.5k",
        publish: "2 days ago",
        author: {
            name: "Andan Son",
            role: "Developer",
            avatar: user2
        },
    },
    {
        id: "ttg3",
        category: "Shooter",
        genres: ["Action",],
        title: "Neo Frontiers: Build Rule Prosper",
        photo: game3,
        images: [
            gameDetails1,
            gameDetails2,
            gameDetails3,
        ],
        video: {
            id: "1",
            videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
            thumbnail: trendingPlayerThumb3,
            isLive: true
        },
        description:
            "An action-packed experience combining strategic gameplay with fast-paced shooter elements.",
        views: "4.7k",
        publish: "4 days ago",
        author: {
            name: "David Smith",
            role: "Designer",
            avatar: user3
        },
    },
    {
        id: "ttg4",
        category: "Strategy",
        genres: ["Game",],
        title: "Metropolis Tycoon: Urban Empire",
        photo: game4,
        images: [
            gameDetails1,
            gameDetails2,
            gameDetails3,
        ],
        video: {
            id: "1",
            videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
            thumbnail: trendingPlayerThumb4,
            isLive: true
        },
        description:
            "Dive into a strategy game where urban development meets real-time decision-making for ambitious leaders.",
        views: "2.5k",
        publish: "2 days ago",
        author: {
            name: "Andan Son",
            role: "Owner",
            avatar: user4
        },
    },
    {
        id: "ttg5",
        category: "Strategy",
        genres: ["Game",],
        title: "Mythos Forge: Craft Your Legacy",
        photo: game5,
        images: [
            gameDetails1,
            gameDetails2,
            gameDetails3,
        ],
        video: {
            id: "1",
            videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
            thumbnail: trendingPlayerThumb5,
            isLive: true
        },
        description:
            "Embark on a thrilling adventure through a world of myth and magic, where your choices shape your destiny.",
        views: "4.7k",
        publish: "4 days ago",
        author: {
            name: "Sammi Esmit",
            role: "Developer",
            avatar: user5
        },
    },
    {
        id: "ttg6",
        category: "Strategy",
        genres: ["Game",],
        title: "Enchanted Echoes: Uncover Fate",
        photo: game6,
        images: [
            gameDetails1,
            gameDetails2,
            gameDetails3,
        ],
        video: {
            id: "1",
            videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
            thumbnail: trendingPlayerThumb6,
            isLive: true
        },
        description:
            "Join the battle for the ancient world, where strategy and heroism will decide the fate of the world.",
        views: "2.5k",
        publish: "2 days ago",
        author: {
            name: "Rolex Yaaeh",
            role: "Owner",
            avatar: user6
        },
    },
];
