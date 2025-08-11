export type MyCommentItem = {
  id: number;
  comment: {
    author: { name: string; avatar: string };
    text: string;
    date: string;
  };
  post: {
    id: number;
    title: string;
  };
};

const myCommentsData: MyCommentItem[] = [
  {
    id: 1,
    comment: {
      author: { name: "John Doe", avatar: "/images/users/user1.png" },
      text: "저도 이번 토너먼트 참가합니다!",
      date: "2025-08-07",
    },
    post: {
      id: 1,
      title: "Battle Royale Tournament 공지",
    },
  },
  {
    id: 2,
    comment: {
      author: { name: "John Doe", avatar: "/images/users/user1.png" },
      text: "아트 너무 멋지네요!",
      date: "2025-08-08",
    },
    post: {
      id: 2,
      title: "RPG 컨셉 아트 공개",
    },
  },
];

export default myCommentsData;
