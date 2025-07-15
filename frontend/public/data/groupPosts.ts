import postImg1 from "@public/images/photos/trendingPlayerThumb.png";
import postImg2 from "@public/images/photos/heroBanner7.webp";
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
import user6 from "@public/images/users/user6.png";
import user7 from "@public/images/users/user7.png";
import user8 from "@public/images/users/user8.png";

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
            name: "Rolex Yaaeh",
            avatar: avatar1,
        },
        comment: "In ut odio libero vulputate",
        publish: 4
    },
    {
        id: "2",
        author: {
            id: 2,
            name: "John Doe",
            avatar: avatar1,
        },
        comment: "We invite you to treat yourself to the gift of relaxation. Whether you're seeking from aches and pains, stress reduction, or a moment of pure indulgence, our massage therapy has something for everyone.",
        publish: 5
    },
]

export const groupPosts = [
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
            image: postImg1,
            video: null,
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
            name: "Sarah Carter",
            role: "admin",
            avatar: user2,
        },
        content: {
            postText:
                "Just finished implementing a new physics engine for our indie game! It took weeks of coding and debugging, but we finally got realistic ragdoll effects and smooth character animations. Here’s a quick demo showcasing how different objects react to gravity, collisions, and player interactions. Let me know if you have suggestions for further improvements!",
            image: "",
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "5 hours ago",
    },
    {
        id: "3",
        groupName: "Esports & Competitive",
        author: {
            id: 3,
            name: "Michael Lee",
            role: "moderator",
            avatar: user3,
        },
        content: {
            postText:
                "We’re organizing a community tournament for Apex Legends this weekend! It's going to be an intense battle between some of the best players in our community. There will be prizes for the top 3 teams, and we’ll be streaming the event live. If you think you have what it takes, sign up now and claim your spot. Let’s see who will be crowned the champion!",
            image: postImg1,
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "1 day ago",
    },
    {
        id: "4",
        groupName: "Retro Gaming",
        author: {
            id: 4,
            name: "Emily Rogers",
            role: "member",
            avatar: user4,
        },
        content: {
            postText:
                "Nothing beats the nostalgia of classic SNES games. I recently went back and played Super Metroid, and wow, it still holds up! The level design, atmosphere, and soundtrack are simply timeless. It reminded me of the golden age of gaming when gameplay was king. What’s your favorite retro game, and why does it still hold a special place in your heart?",
            image: null,
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "3 days ago",
    },
    {
        id: "5",
        groupName: "Indie Games Showcase",
        author: {
            id: 5,
            name: "David Martinez",
            role: "developer",
            avatar: user5,
        },
        content: {
            postText:
                "Here’s a sneak peek at our upcoming 2D platformer! We’ve put a lot of effort into the animations, level design, and mechanics to make it feel smooth and engaging. The game features a unique pixel-art style with fluid movement, combo-based combat, and a deep narrative-driven experience. We’d love to hear your thoughts and suggestions as we finalize development!",
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
        groupName: "VR & AR Gaming",
        author: {
            id: 6,
            name: "Sophia Kim",
            role: "moderator",
            avatar: user6,
        },
        content: {
            postText:
                "Tried out the new VR horror game last night, and it was absolutely terrifying! The level of immersion and real-time scares make it one of the most intense gaming experiences I’ve had in a while. Every shadow, every sound, and every movement felt so real that I was completely drawn into the world. Check out my full review and some gameplay clips!",
            image: "",
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "8 hours ago",
    },
    {
        id: "7",
        groupName: "Cosplay & Fan Creations",
        author: {
            id: 7,
            name: "Anna White",
            role: "member",
            avatar: user7,
        },
        content: {
            postText:
                "Finally finished my Cyberpunk 2077 cosplay! Every detail took weeks to get right, from the LED implants to the custom leather jacket. The process was challenging, but seeing the final result makes all the hard work worth it. Can’t wait to showcase it at the next convention. Hope you all like it! Let me know what you think!",
            image: null,
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "12 hours ago",
    },
    {
        id: "8",
        groupName: "Streaming & Content Creation",
        author: {
            id: 8,
            name: "Ryan Brooks",
            role: "streamer",
            avatar: user8,
        },
        content: {
            postText:
                "Going live in 10 minutes! Join my stream as I attempt a speedrun of Dark Souls III. I’ve been practicing for weeks, and I think I finally have a chance to break my personal best. I’ll be explaining my strategies and techniques along the way, so if you’re interested in learning more about speedrunning, come hang out! Let’s do this!",
            image: null,
            video: null,
        },
        likes: likes1,
        comments: comments1,
        publish: "30 minutes ago",
    },
];


