export type MyPostItem = {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  text: string;
  likes: number;
  comments: number;
};

const myPostsData: MyPostItem[] = [
  {
    id: 1,
    author: { name: "Liam West", avatar: "/images/users/user1.png" },
    date: "1 day ago",
    text: "Hey everyone! We're hosting a **Battle Royale Tournament** this weekend!",
    likes: 5,
    comments: 5
  },
  {
    id: 2,
    author: { name: "Liam West", avatar: "/images/users/user2.png" },
    date: "2 days ago",
    text: "Check out this concept art I created for our upcoming RPG project! I've spent countless hours perfecting the details.",
    likes: 8,
    comments: 3
  }
];

export default myPostsData;
