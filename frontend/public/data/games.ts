import game1 from "@public/images/games/game1.png";
import game2 from "@public/images/games/game2.png";
import game3 from "@public/images/games/game3.png";
import game4 from "@public/images/games/game4.png";
import game5 from "@public/images/games/game5.png";
import game6 from "@public/images/games/game6.png";
import game7 from "@public/images/games/game7.png";
import game8 from "@public/images/games/game8.png";
import game9 from "@public/images/games/game9.png";
import game10 from "@public/images/games/game10.png";
import game11 from "@public/images/games/game11.png";
import game12 from "@public/images/games/game12.png";
import game13 from "@public/images/games/game13.png";
import game14 from "@public/images/games/game14.png";
import game15 from "@public/images/games/game15.png";
import game16 from "@public/images/games/game16.png";
import game17 from "@public/images/games/game17.png";
import game18 from "@public/images/games/game18.png";
import game19 from "@public/images/games/game19.png";
import game20 from "@public/images/games/game20.png";
import gameDetails1 from "@public/images/games/gameDetails1.1.png";
import gameDetails2 from "@public/images/library/libraryDetails1.png";
import gameDetails3 from "@public/images/library/libraryDetails2.png";
import gameDetails4 from "@public/images/library/libraryDetails3.png";
import gameDetails5 from "@public/images/library/libraryDetails4.png";

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
import user11 from "@public/images/users/user11.png";
import user12 from "@public/images/users/user12.png";
import user13 from "@public/images/users/user13.png";
import user14 from "@public/images/users/user14.png";

export const peoples = [
  { name: "Jamie Lee", avatar: user1 },
  { name: "Sam Smith", avatar: user2 },
  { name: "Chris Martin", avatar: user3 },
  { name: "Taylor Swift", avatar: user4 },
  { name: "Dua Lipa", avatar: user5 },
]

export const games = [
  {
    id: "g1",
    title: "Power Play",
    subtitle: "Animal Park Adventures",
    description:
      "An exciting journey through lush animal parks with engaging quests and thrilling gameplay. Perfect for adventure lovers.",
    developer: "NetQ Apps",
    publish: "4 May 2022",
    author: {
      name: "David Smith",
      role: "Leader",
      avatar: user1
    },
    platforms: ["PlayStation", "Xbox", "Windows", "Mac OS"],
    genres: ["Adventure", "Action"],
    price: 70,
    rating: "4.7",
    followers: peoples,
    usersRanked: 98756,
    photo: game1,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Strategy", "Simulation"],
    playNowLink: "#",
  },
  {
    id: "g2",
    title: "Gourmet Empire",
    subtitle: "Food Tycoon",
    description:
      "Build your own food empire, manage restaurants, and conquer the culinary world. A must-play for strategy fans.",
    developer: "Epic Studios",
    publish: "20 August 2021",
    author: {
      name: "Andan Son",
      role: "Developer",
      avatar: user2
    },
    platforms: ["PlayStation", "Windows", "Mac OS"],
    genres: ["Strategy", "Simulation"],
    price: 60,
    rating: "4.5",
    followers: peoples,
    usersRanked: 98756,
    photo: game2,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Simulation", "Management"],
    playNowLink: "#",
  },
  {
    id: "g3",
    title: "Flight Captain",
    subtitle: "Sky Adventures",
    description:
      "Take control of the skies in this thrilling flight simulator, with realistic flight dynamics and endless exploration.",
    developer: "Skyward Studios",
    publish: "10 March 2023",
    author: {
      name: "David Smith",
      role: "Designer",
      avatar: user3
    },
    platforms: ["Xbox", "Windows"],
    genres: ["Simulation", "Adventure"],
    price: 50,
    rating: "4.8",
    followers: peoples,
    usersRanked: 98756,
    photo: game3,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Simulation", "Adventure"],
    playNowLink: "#",
  },
  {
    id: "g4",
    title: "Animal Park Adventures",
    subtitle: "Wildlife Journey",
    description:
      "Explore beautiful animal parks filled with exotic creatures, solving puzzles and completing quests.",
    developer: "Wild World Games",
    publish: "5 October 2021",
    author: {
      name: "Andan Son",
      role: "Owner",
      avatar: user4
    },
    platforms: ["PlayStation", "Xbox", "Windows", "Mac OS"],
    genres: ["Adventure", "Puzzle"],
    price: 55,
    rating: "4.6",
    followers: peoples,
    usersRanked: 98756,
    photo: game4,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Adventure", "Puzzle"],
    playNowLink: "#",
  },
  {
    id: "g5",
    title: "Battles Beyond the Stars",
    subtitle: "Galactic War",
    description:
      "Engage in epic space battles across the universe, commanding your fleet in this strategic space combat game.",
    developer: "Star Wars Games",
    publish: "15 June 2021",
    author: {
      name: "David Smith",
      role: "Leader",
      avatar: user1
    },
    platforms: ["PlayStation", "Xbox", "Windows"],
    genres: ["Action", "Shooter"],
    price: 80,
    rating: "4.9",
    followers: peoples,
    usersRanked: 98756,
    photo: game5,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Action", "Shooter"],
    playNowLink: "#",
  },
  {
    id: "g6",
    title: "Gridiron Glory",
    subtitle: "Ultimate Football",
    description:
      "Experience the thrill of American football like never before with high-stakes gameplay and realistic mechanics.",
    developer: "PlayGrid Games",
    publish: "1 December 2020",
    author: {
      name: "Andan Son",
      role: "Developer",
      avatar: user2
    },
    platforms: ["Xbox", "Windows", "Mac OS"],
    genres: ["Sports", "Simulation"],
    price: 40,
    rating: "4.3",
    followers: peoples,
    usersRanked: 98756,
    photo: game6,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Sports", "Simulation"],
    playNowLink: "#",
  },
  {
    id: "g7",
    title: "Power Play",
    subtitle: "Animal Park Adventures",
    description:
      "An exciting journey through lush animal parks with engaging quests and thrilling gameplay. Perfect for adventure lovers.",
    developer: "NetQ Apps",
    publish: "4 May 2022",
    author: {
      name: "David Smith",
      role: "Designer",
      avatar: user3
    },
    platforms: ["PlayStation", "Xbox", "Windows", "Mac OS"],
    genres: ["Adventure", "Action"],
    price: 70,
    rating: "4.7",
    followers: peoples,
    usersRanked: 98756,
    photo: game7,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Strategy", "Simulation"],
    playNowLink: "#",
  },
  {
    id: "g8",
    title: "Gourmet Empire",
    subtitle: "Food Tycoon",
    description:
      "Build your own food empire, manage restaurants, and conquer the culinary world. A must-play for strategy fans.",
    developer: "Epic Studios",
    publish: "20 August 2021",
    author: {
      name: "Andan Son",
      role: "Owner",
      avatar: user4
    },
    platforms: ["PlayStation", "Windows", "Mac OS"],
    genres: ["Strategy", "Simulation"],
    price: 60,
    rating: "4.5",
    followers: peoples,
    usersRanked: 98756,
    photo: game8,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Simulation", "Management"],
    playNowLink: "#",
  },
  {
    id: "g9",
    title: "Flight Captain",
    subtitle: "Sky Adventures",
    description:
      "Take control of the skies in this thrilling flight simulator, with realistic flight dynamics and endless exploration.",
    developer: "Skyward Studios",
    publish: "10 March 2023",
    author: {
      name: "Andan Son",
      role: "Developer",
      avatar: user2
    },
    platforms: ["Xbox", "Windows"],
    genres: ["Simulation", "Adventure"],
    price: 50,
    rating: "4.8",
    followers: peoples,
    usersRanked: 98756,
    photo: game9,
    images: [
      gameDetails1,
      gameDetails2,
      gameDetails3,
    ],
    tags: ["Simulation", "Adventure"],
    playNowLink: "#",
  },


  {
    id: "g10",
    title: "Power Play",
    subtitle: "Gridiron Glory",
    description:
      "Experience the thrill of football with this fast-paced game. Build your ultimate team and dominate the field.",
    developer: "Gridiron Games",
    publish: "25 April 2023",
    author: {
      name: "Jenna Sparks",
      role: "Lead Developer",
      avatar: user3,
    },
    platforms: ["PlayStation", "PC"],
    genres: ["Sports", "Strategy"],
    price: 60,
    rating: "4.6",
    followers: peoples,
    usersRanked: 80543,
    photo: game10,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Sports", "Strategy"],
    playNowLink: "#",
  },
  {
    id: "g11",
    title: "Animal Park Adventures",
    subtitle: "Wildlife Journey",
    description:
      "Explore vast wildlife parks, care for animals, and build your dream zoo in this heartwarming adventure game.",
    developer: "Nature Studio",
    publish: "12 May 2023",
    author: {
      name: "Lila Turner",
      role: "Game Designer",
      avatar: user4,
    },
    platforms: ["Switch", "Windows"],
    genres: ["Simulation", "Adventure"],
    price: 45,
    rating: "4.7",
    followers: peoples,
    usersRanked: 60578,
    photo: game11,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Simulation", "Adventure"],
    playNowLink: "#",
  },
  {
    id: "g12",
    title: "Gourmet Empire",
    subtitle: "Food Tycoon",
    description:
      "Build your restaurant empire, manage kitchens, and cook your way to fame in this culinary business simulation.",
    developer: "Epicurean Games",
    publish: "8 June 2023",
    author: {
      name: "Oliver Brooks",
      role: "Producer",
      avatar: user5,
    },
    platforms: ["PC", "Mobile"],
    genres: ["Simulation", "Strategy"],
    price: 40,
    rating: "4.5",
    followers: peoples,
    usersRanked: 70789,
    photo: game12,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Simulation", "Strategy"],
    playNowLink: "#",
  },
  {
    id: "g13",
    title: "Flight Captain",
    subtitle: "Sky Adventures",
    description:
      "Take to the skies and conquer thrilling missions in this ultimate pilot simulation experience.",
    developer: "Altitude Games",
    publish: "20 July 2023",
    author: {
      name: "Eve Nolan",
      role: "Lead Programmer",
      avatar: user6,
    },
    platforms: ["Xbox", "PlayStation"],
    genres: ["Simulation", "Adventure"],
    price: 55,
    rating: "4.9",
    followers: peoples,
    usersRanked: 90834,
    photo: game13,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Simulation", "Adventure"],
    playNowLink: "#",
  },
  {
    id: "g14",
    title: "Battles Beyond the Stars",
    subtitle: "Galactic War",
    description:
      "Lead your fleet through intergalactic battles in this epic space strategy game filled with action and exploration.",
    developer: "Galaxy Forge",
    publish: "18 August 2023",
    author: {
      name: "Eli Rogers",
      role: "Creative Director",
      avatar: user7,
    },
    platforms: ["PC", "Switch"],
    genres: ["Strategy", "Sci-Fi"],
    price: 65,
    rating: "4.6",
    followers: peoples,
    usersRanked: 75489,
    photo: game14,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Strategy", "Sci-Fi"],
    playNowLink: "#",
  },
  {
    id: "g15",
    title: "Gridiron Glory",
    subtitle: "Ultimate Football",
    description:
      "Challenge the best teams, customize your playbook, and rise to glory in this ultimate football experience.",
    developer: "Sports Titans",
    publish: "5 September 2023",
    author: {
      name: "Max Carter",
      role: "Designer",
      avatar: user8,
    },
    platforms: ["Xbox", "PC"],
    genres: ["Sports", "Simulation"],
    price: 60,
    rating: "4.8",
    followers: peoples,
    usersRanked: 89234,
    photo: game15,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Sports", "Simulation"],
    playNowLink: "#",
  },
  {
    id: "g16",
    title: "Animal Park Adventures",
    subtitle: "Wildlife Journey",
    description:
      "Step into a world of wonder as you care for animals and explore diverse ecosystems in this adventure game.",
    developer: "Eco Games",
    publish: "25 October 2023",
    author: {
      name: "Nina Silva",
      role: "Developer",
      avatar: user9,
    },
    platforms: ["Mobile", "Switch"],
    genres: ["Adventure", "Simulation"],
    price: 50,
    rating: "4.5",
    followers: peoples,
    usersRanked: 78435,
    photo: game16,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Adventure", "Simulation"],
    playNowLink: "#",
  },
  {
    id: "g17",
    title: "Battles Beyond the Stars",
    subtitle: "Galactic War",
    description:
      "Fight for dominance among the stars in this strategy game that combines tactical combat and space exploration.",
    developer: "Stellar Works",
    publish: "12 November 2023",
    author: {
      name: "Sam Archer",
      role: "Art Director",
      avatar: user10,
    },
    platforms: ["PlayStation", "PC"],
    genres: ["Strategy", "Adventure"],
    price: 70,
    rating: "4.7",
    followers: peoples,
    usersRanked: 80452,
    photo: game17,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Strategy", "Adventure"],
    playNowLink: "#",
  },
  {
    id: "g18",
    title: "Gourmet Empire",
    subtitle: "Food Tycoon",
    description:
      "Manage your kitchen empire, cook delicious meals, and build a legacy in this immersive simulation game.",
    developer: "Culinary Creations",
    publish: "30 December 2023",
    author: {
      name: "Anna Hart",
      role: "Producer",
      avatar: user1,
    },
    platforms: ["PC", "Mobile"],
    genres: ["Simulation", "Management"],
    price: 45,
    rating: "4.6",
    followers: peoples,
    usersRanked: 65478,
    photo: game18,
    images: [gameDetails1, gameDetails2, gameDetails3],
    tags: ["Simulation", "Management"],
    playNowLink: "#",
  },

];
