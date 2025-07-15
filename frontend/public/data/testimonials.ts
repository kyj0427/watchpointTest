import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";

export const testimonials = [
    {
        id: "1",
        ratings: 4.8,
        riview: "A thrilling adventure that captivates from start to finish.",
        author: {
            name: "Alice Smith",
            role: "Film Critic",
            avatar: user1,
        },
    },
    {
        id: "2",
        ratings: 3.7,
        riview: "A decent narrative with stunning visuals, though the pacing is off in some parts.",
        author: {
            name: "Bob Johnson",
            role: "Game Reviewer",
            avatar: user2,
        },
    },
    {
        id: "3",
        ratings: 5,
        riview: "Absolutely phenomenal! The world-building and character arcs are masterful.",
        author: {
            name: "Carol Williams",
            role: "Book Reviewer",
            avatar: user3,
        },
    },
];
