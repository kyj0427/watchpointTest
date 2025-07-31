import game40 from "@public/images/games/game40.png";
import game41 from "@public/images/games/game41.png";
import game1 from "@public/images/games/game1.png";
import game2 from "@public/images/games/game2.png";
import game3 from "@public/images/photos/heroBanner1.webp";
import game4 from "@public/images/photos/heroBanner2.webp";
import thumbnail1 from "@public/images/photos/saved1.1.png";
import thumbnail2 from "@public/images/photos/heroBanner7.webp";
import { MediaItem } from "@/components/sections/groupDetails/GroupMedia";

export const mediasCategories = [
    { name: "all", quantity: 10 },
    { name: "albums", quantity: 2 },
    { name: "photos", quantity: 4 },
    { name: "videos", quantity: 2 },
];

export const groupMediaData: MediaItem[] = [
    // Albums
    {
        id: "1",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: game3,
        category: "albums",
    },
    {
        id: "2",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: game4,
        category: "albums",
    },

    // Photos
    {
        id: "3",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: game40,
        category: "photos",
    },
    {
        id: "4",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: game41,
        category: "photos",
    },
    {
        id: "5",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: game1,
        category: "photos",
    },
    {
        id: "6",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: game2,
        category: "photos",
    },

    // Videos
    {
        id: "7",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: thumbnail1,
        videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
        category: "videos",
    },
    {
        id: "8",
        title: "Neo Frontiers: Build Rule Prosper",
        thumbnail: thumbnail2,
        videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
        category: "videos",
    },
];
