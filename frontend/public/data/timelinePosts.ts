import postImg1 from "@public/images/videothumbnails/thumbnail1.png";
import postImg2 from "@public/images/videothumbnails/thumbnail2.png";
import postImg3 from "@public/images/photos/trendingPlayerThumb.png";
import avatar1 from "@public/images/users/avatar1.png";
import avatar2 from "@public/images/users/avatar2.png";
import avatar3 from "@public/images/users/avatar3.png";
import avatar4 from "@public/images/users/avatar4.png";
import avatar5 from "@public/images/users/avatar5.png";
import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user5 from "@public/images/users/user5.png";

const likes1 = [
    {
        id: 1,
        status: true,
        name: "John Doe",
        role: "",
        avatar: avatar1,
    },
    {
        id: 2,
        status: true,
        name: "Jane Smith",
        role: "",
        avatar: avatar2,
    },
    {
        id: 3,
        status: false,
        name: "Alice Johnson",
        role: "",
        avatar: avatar3,
    },
    {
        id: 4,
        status: true,
        name: "Bob Brown",
        role: "",
        avatar: avatar4,
    },
    {
        id: 5,
        status: false,
        name: "Charlie Davis",
        role: "",
        avatar: avatar5,
    },
]


const comments1 = [
    {
        id: "1",
        author: {
            id: 1,
            name: "Alex Mercer",
            avatar: avatar1,
        },
        comment: "This game has insane graphics! 🔥",
        publish: "5D",
    },
    {
        id: "2",
        author: {
            id: 2,
            name: "John Doe",
            avatar: avatar2,
        },
        comment: "Multiplayer is a bit unbalanced, but still fun!",
        publish: "3D",
    },
    {
        id: "3",
        author: {
            id: 3,
            name: "Lena Frost",
            avatar: avatar3,
        },
        comment: "Need more co-op missions! 🎮",
        publish: "2D",
    },
    {
        id: "4",
        author: {
            id: 4,
            name: "Sam Riker",
            avatar: avatar4,
        },
        comment: "Events are great, but the grind is real. 😅",
        publish: "1D",
    },
    {
        id: "5",
        author: {
            id: 5,
            name: "Eva Knight",
            avatar: avatar5,
        },
        comment: "Loving the new update, but matchmaking is slow. 😕",
        publish: "12H",
    },
];

// imgGallery: [imgGallery1, imgGallery2, imgGallery3, imgGallery4],

export const timelineItems = [
    {
        id: "1",
        groupName: "Design & Art",
        author: {
            id: 1,
            name: "John Doe",
            role: "member",
            avatar: user1,
        },
        content: {
            postText:
                "Check out this concept art I created for our upcoming RPG project! I've spent countless hours perfecting the details, shading, and overall mood to bring this world to life. The inspiration came from a mix of medieval fantasy and futuristic elements. What do you think of the colors and lighting? Any feedback would be highly appreciated!",
            image: null,
            video: {
                videoSrc: "https://www.youtube.com/embed/mUxzKVrSAjs",
                posterSrc: postImg1,
            },
        },
        likes: likes1,
        comments: comments1,
        publish: "2 days ago",
    },
    {
        id: "2",
        groupName: "Game Development",
        author: {
            id: 2,
            name: "Sarah Black",
            role: "developer",
            avatar: user2,
        },
        content: {
            postText:
                "Finally completed the enemy AI for our FPS game! The bots now react dynamically to the player's movement and adapt their strategy over time. Can't wait to get some feedback from testers! 🎮",
            image: null,
            video: {
                videoSrc: "https://www.youtube.com/embed/mUxzKVrSAjs",
                posterSrc: postImg2,
            },
        },
        likes: likes1,
        comments: comments1,
        publish: "5 hours ago",
    },
    {
        id: "3",
        groupName: "Community Events",
        author: {
            id: 3,
            name: "Liam West",
            role: "moderator",
            avatar: user3,
        },
        content: {
            postText:
                "Hey everyone! We’re hosting a **Battle Royale Tournament** this weekend! 🏆🔥 Sign up now to compete for some awesome prizes. The top 3 players will get exclusive in-game rewards!",
            image: postImg3,
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "1 day ago",
    },
    {
        id: "4",
        groupName: "Design & Art",
        author: {
            id: 1,
            name: "John Doe",
            role: "member",
            avatar: user1,
        },
        content: {
            postText:
                "Check out this concept art I created for our upcoming RPG project! I've spent countless hours perfecting the details, shading, and overall mood to bring this world to life. The inspiration came from a mix of medieval fantasy and futuristic elements. What do you think of the colors and lighting? Any feedback would be highly appreciated!",
            image: null,
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "2 days ago",
    },
    {
        id: "5",
        groupName: "Streaming & Content",
        author: {
            id: 4,
            name: "Emily Rivers",
            role: "streamer",
            avatar: user4,
        },
        content: {
            postText:
                "Had a crazy moment during my last stream! 😂 This glitch had me flying across the map. Check out the clip and let me know if you've ever seen something like this!",
            image: null,
            video: {
                videoSrc: "https://www.youtube.com/embed/mUxzKVrSAjs",
                posterSrc: postImg2,
            },
        },
        likes: likes1,
        comments: comments1,
        publish: "6 hours ago",
    },
    {
        id: "6",
        groupName: "Game Updates",
        author: {
            id: 5,
            name: "Dev Team",
            role: "admin",
            avatar: user5,
        },
        content: {
            postText:
                "🚀 Patch 1.5 is live! We've fixed several bugs, balanced weapons, and added a new map: **Neon District**! Jump in and let us know your thoughts.",
            image: postImg1,
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "3 days ago",
    },
];