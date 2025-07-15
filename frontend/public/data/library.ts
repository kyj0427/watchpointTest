import library1 from "@public/images/library/library1.png";
import library2 from "@public/images/library/library2.png";
import library3 from "@public/images/library/library3.png";
import library4 from "@public/images/library/library4.png";
import library5 from "@public/images/library/library5.png";
import library6 from "@public/images/library/library6.png";
import libraryDetails1 from "@public/images/library/libraryDetails1.png";
import libraryDetails2 from "@public/images/library/libraryDetails2.png";
import libraryDetails3 from "@public/images/library/libraryDetails3.png";
import libraryDetails4 from "@public/images/library/libraryDetails4.png";
import bitcoin from "@public/images/photos/bitcoin.svg";

import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user5 from "@public/images/users/user5.png";
import user6 from "@public/images/users/user6.png";
import { Tlibrary } from "@/config/types";

export const library: Tlibrary[] = [
    {
        id: "1",
        name: "Cyber Gorillas",
        title: "Simulation Tycoon Urban Empire",
        photo: library1,
        type: "Video",
        rating: 5.4,
        publish: "17 Jan 2023",
        platform: ["Windows", "Mac OS"],
        author: {
            name: "David Smith",
            role: "Designer",
            avatar: user1
        },
        images: [libraryDetails1, libraryDetails2, libraryDetails3, libraryDetails4],
        genres: ["Strategy", "Simulation"],
        blockchain: {
            name: "Fantasy",
            icon: bitcoin
        }
    },
    {
        id: "2",
        name: "Neo Chimps",
        title: "Quantum Puzzle Quest",
        photo: library2,
        type: "Video",
        rating: 5.4,
        publish: "12 Mar 2023",
        platform: ["Windows", "Linux"],
        author: {
            name: "Emily Brown",
            role: "Developer",
            avatar: user2
        },
        images: [libraryDetails1, libraryDetails2, libraryDetails3, libraryDetails4],
        genres: ["Puzzle", "Adventure"],
        blockchain: {
            name: "Fantasy",
            icon: bitcoin
        }
    },
    {
        id: "3",
        name: "Aether Primates",
        title: "Virtual Odyssey Chronicles",
        photo: library3,
        type: "Video",
        rating: 5.4,
        publish: "15 Apr 2023",
        platform: ["Windows", "Mac OS"],
        author: {
            name: "John Doe",
            role: "Narrative Director",
            avatar: user3
        },
        images: [libraryDetails1, libraryDetails2, libraryDetails3, libraryDetails4],
        genres: ["RPG", "Fantasy"],
        blockchain: {
            name: "Fantasy",
            icon: bitcoin
        }
    },
    {
        id: "4",
        name: "Quantum Apes",
        title: "Galactic Explorers: New Horizons",
        photo: library4,
        type: "Video",
        rating: 5.4,
        publish: "9 May 2023",
        platform: ["Windows", "Mac OS"],
        author: {
            name: "Lisa Green",
            role: "Lead Programmer",
            avatar: user4
        },
        images: [libraryDetails1, libraryDetails2, libraryDetails3, libraryDetails4],
        genres: ["Sci-Fi", "Exploration"],
        blockchain: {
            name: "Fantasy",
            icon: bitcoin
        }
    },
    {
        id: "5",
        name: "Pixel Panthers",
        title: "Mystic Legends Unraveled",
        photo: library5,
        type: "Video",
        rating: 5.4,
        publish: "28 Jul 2023",
        platform: ["Windows", "Linux"],
        author: {
            name: "Mark Wilson",
            role: "Artist",
            avatar: user5
        },
        images: [libraryDetails1, libraryDetails2, libraryDetails3, libraryDetails4],
        genres: ["Action", "Adventure"],
        blockchain: {
            name: "Fantasy",
            icon: bitcoin
        }
    },
    {
        id: "6",
        name: "Evo Apes",
        title: "Eternal Fortress Saga",
        photo: library6,
        type: "Video",
        rating: 5.4,
        publish: "17 Jan 2023",
        platform: ["Mac OS", "Linux"],
        author: {
            name: "Anna Johnson",
            role: "Composer",
            avatar: user6
        },
        images: [libraryDetails1, libraryDetails2, libraryDetails3, libraryDetails4],
        genres: ["Fantasy", "Strategy"],
        blockchain: {
            name: "Fantasy",
            icon: bitcoin
        }
    },
];
