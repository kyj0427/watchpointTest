"use client";
import Link from "next/link";
import Image from "next/image";

export type MyPost = {
  id: number;
  author: { name: string; avatar: string };
  date: string;
  text: string;
  likes: number;
  comments: number;
};

export default function MyPost({ post }: { post: MyPost }) {
  return (
    <div className="bg-b-neutral-3 rounded-12 p-20p">
      {/* 작성자 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h4 className="text-w-neutral-1 font-medium">{post.author.name}</h4>
            <span className="text-sm text-w-neutral-4">{post.date}</span>
          </div>
        </div>
      </div>

      {/* 본문 텍스트 */}
      <p className="mt-12p text-w-neutral-1">{post.text}</p>

      {/* 좋아요 / 댓글 수 */}
      <div className="flex items-center gap-4 text-sm text-w-neutral-4 mt-12p">
        <span>❤️ {post.likes}</span>
        <span>💬 {post.comments}</span>
      </div>

    </div>
  );
}
