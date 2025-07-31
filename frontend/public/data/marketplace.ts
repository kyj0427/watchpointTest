import marketplace1 from "@public/images/marketplaces/marketplace1.png";
import marketplace2 from "@public/images/marketplaces/marketplace2.png";
import marketplace3 from "@public/images/marketplaces/marketplace3.png";
import marketplace4 from "@public/images/marketplaces/marketplace4.png";
import marketplace5 from "@public/images/marketplaces/marketplace5.png";
import marketplace6 from "@public/images/marketplaces/marketplace6.png";
import marketplace7 from "@public/images/marketplaces/marketplace7.png";
import marketplace8 from "@public/images/marketplaces/marketplace8.png";
import marketplace9 from "@public/images/marketplaces/marketplace9.png";
import marketplace10 from "@public/images/marketplaces/marketplace10.png";
import marketplace11 from "@public/images/marketplaces/marketplace11.png";
import marketplace12 from "@public/images/marketplaces/marketplace12.png";
import marketplaceBanner1 from "@public/images/games/marketplaceDetails1.png";

import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user5 from "@public/images/users/user5.png";
import user6 from "@public/images/users/user6.png";
import user7 from "@public/images/users/user7.png";
import user8 from "@public/images/users/user8.png";
import user9 from "@public/images/users/user9.png";
import user10 from "@public/images/users/user10.png";

export const marketplace = [
    {
        id: "1",
        category: "heroes",
        title: "Fire Strikers",
        image: marketplace1,
        bannerImage: marketplaceBanner1,
        reviews: 99,
        activeUsers: 7500,
        rating: 4.5,
        status: "Online",
        author: {
            id: "1",
            name: "Alex Morgan",
            role: "Designer",
            image: user1,
        },
        friends: [
            { name: "Jamie Lee", avatar: user2 },
            { name: "Sam Smith", avatar: user3 },
            { name: "Chris Martin", avatar: user4 },
            { name: "Taylor Swift", avatar: user5 },
            { name: "Dua Lipa", avatar: user6 },
        ],
        networks: ["windows", "apple"],
        price: 20
    },
    {
        id: "2",
        category: "heroes",
        title: "Outlaws Unleashed",
        image: marketplace2,
        bannerImage: marketplaceBanner1,
        reviews: 110,
        activeUsers: 8200,
        rating: 5.0,
        status: "Online",
        author: {
            id: "2",
            name: "Taylor Adams",
            role: "Developer",
            image: user2,
        },
        friends: [
            { name: "Mark Zuckerberg", avatar: user3 },
            { name: "Peter Parker", avatar: user4 },
            { name: "Tony Stark", avatar: user5 },
        ],
        networks: ["android", "apple"],
        price: 14
    },
    {
        id: "3",
        category: "heroes",
        title: "Crypto Explorers",
        image: marketplace3,
        bannerImage: marketplaceBanner1,
        reviews: 85,
        activeUsers: 6700,
        rating: 4.0,
        status: "Online",
        author: {
            id: "3",
            name: "Eve Johnson",
            role: "Analyst",
            image: user3,
        },
        friends: [
            { name: "Alice Wonderland", avatar: user4 },
            { name: "John Wick", avatar: user5 },
            { name: "Lara Croft", avatar: user6 },
        ],
        networks: ["android", "windows"],
        price: 40
    },
    {
        id: "4",
        category: "heroes",
        title: "Virtual Assets",
        image: marketplace4,
        bannerImage: marketplaceBanner1,
        reviews: 125,
        activeUsers: 9500,
        rating: 3.5,
        status: "Online",
        author: {
            id: "4",
            name: "Chris Roberts",
            role: "Manager",
            image: user4,
        },
        friends: [
            { name: "Bruce Banner", avatar: user5 },
            { name: "Natasha Romanoff", avatar: user6 },
            { name: "Steve Rogers", avatar: user7 },
        ],
        networks: ["apple", "windows"],
        price: 23
    },
    {
        id: "5",
        category: "swords",
        title: "Digital Dunes",
        image: marketplace5,
        bannerImage: marketplaceBanner1,
        reviews: 140,
        activeUsers: 12000,
        rating: 4.8,
        status: "Offline",
        author: {
            id: "5",
            name: "Liam Ford",
            role: "Marketer",
            image: user5,
        },
        friends: [
            { name: "Bruce Wayne", avatar: user6 },
            { name: "Clark Kent", avatar: user7 },
            { name: "Lois Lane", avatar: user8 },
        ],
        networks: ["android", "ios"],
        price: 26
    },
    {
        id: "6",
        category: "swords",
        title: "Token Trove",
        image: marketplace6,
        bannerImage: marketplaceBanner1,
        reviews: 75,
        activeUsers: 5800,
        rating: 3.9,
        status: "Online",
        author: {
            id: "6",
            name: "Emily Watson",
            role: "Engineer",
            image: user6,
        },
        friends: [
            { name: "Selena Gomez", avatar: user7 },
            { name: "Shawn Mendes", avatar: user8 },
            { name: "Ed Sheeran", avatar: user9 },
        ],
        networks: ["ios", "windows"],
        price: 50
    },
    {
        id: "7",
        category: "swords",
        title: "Skybound Tokens",
        image: marketplace7,
        bannerImage: marketplaceBanner1,
        reviews: 88,
        activeUsers: 7100,
        rating: 4.2,
        status: "Online",
        author: {
            id: "7",
            name: "Jessica Pearson",
            role: "Strategist",
            image: user7,
        },
        friends: [
            { name: "Anna Baker", avatar: user8 },
            { name: "Sarah Mills", avatar: user9 },
            { name: "Jake Gyllenhaal", avatar: user10 },
        ],
        networks: ["android", "windows"],
        price: 67
    },
    {
        id: "8",
        category: "swords",
        title: "Ethereal Gems",
        image: marketplace8,
        bannerImage: marketplaceBanner1,
        reviews: 145,
        activeUsers: 12500,
        rating: 4.9,
        status: "Offline",
        author: {
            id: "8",
            name: "Sophia Grey",
            role: "Researcher",
            image: user8,
        },
        friends: [
            { name: "Tom Hardy", avatar: user9 },
            { name: "Margot Robbie", avatar: user10 },
            { name: "Zendaya Coleman", avatar: user1 },
        ],
        networks: ["apple", "ios"],
        price: 26
    },
    {
        id: "9",
        category: "battle",
        title: "Aurora Vault",
        image: marketplace9,
        bannerImage: marketplaceBanner1,
        reviews: 95,
        activeUsers: 6800,
        rating: 4.4,
        status: "Online",
        author: {
            id: "9",
            name: "Ethan Taylor",
            role: "Architect",
            image: user9,
        },
        friends: [
            { name: "Keanu Reeves", avatar: user2 },
            { name: "Will Smith", avatar: user3 },
            { name: "Angelina Jolie", avatar: user4 },
        ],
        networks: ["windows", "ios"],
        price: 15
    },
    {
        id: "10",
        category: "battle",
        title: "Stellar Minds",
        image: marketplace10,
        bannerImage: marketplaceBanner1,
        reviews: 115,
        activeUsers: 8700,
        rating: 4.7,
        status: "Offline",
        author: {
            id: "10",
            name: "Hannah Woods",
            role: "Coordinator",
            image: user10,
        },
        friends: [
            { name: "Chris Pratt", avatar: user5 },
            { name: "Emma Stone", avatar: user6 },
            { name: "Scarlett Johansson", avatar: user7 },
        ],
        networks: ["android", "apple"],
        price: 13
    },
    {
        id: "11",
        category: "battle",
        title: "Quantum Bazaar",
        image: marketplace11,
        bannerImage: marketplaceBanner1,
        reviews: 135,
        activeUsers: 9100,
        rating: 4.6,
        status: "Online",
        author: {
            id: "11",
            name: "George Blake",
            role: "Lead",
            image: user2,
        },
        friends: [
            { name: "Jennifer Lawrence", avatar: user3 },
            { name: "Ryan Gosling", avatar: user8 },
            { name: "Chris Hemsworth", avatar: user9 },
        ],
        networks: ["windows", "ios"],
        price: 64
    },
    {
        id: "12",
        category: "battle",
        title: "Infinity Nexus",
        image: marketplace12,
        bannerImage: marketplaceBanner1,
        reviews: 165,
        activeUsers: 13200,
        rating: 5.0,
        status: "Online",
        author: {
            id: "12",
            name: "Olivia Harris",
            role: "Designer",
            image: user3,
        },
        friends: [
            { name: "Brie Larson", avatar: user1 },
            { name: "Tom Holland", avatar: user6 },
            { name: "Chris Evans", avatar: user8 },
        ],
        networks: ["android", "apple"],
        price: 42
    },
];
