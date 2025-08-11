"use client";
import Link from "next/link";
import Image from "next/image";
import { MyCommentItem } from "@public/data/myCommentData";

export default function MyComments({ comments }: { comments: MyCommentItem[] }) {
  if (comments.length === 0) {
    return <p className="text-center py-60p text-w-neutral-4">작성한 댓글이 없습니다.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-20p">
      {comments.map((item) => (
        <li key={item.id} className="bg-b-neutral-3 rounded-12 p-20p">
          {/* 상단: 프로필 + 닉네임 + 날짜 */}
          <div className="flex items-center gap-3 mb-12p">
            <Image
              src={item.comment.author.avatar}
              alt={item.comment.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-w-neutral-1">{item.comment.author.name}</p>
              <span className="text-xs text-w-neutral-4">{item.comment.date}</span>
            </div>
          </div>

          {/* 댓글 본문 */}
          <p className="text-w-neutral-1 mb-12p">{item.comment.text}</p>

          {/* 게시글 제목 */}
          <p className="text-xs text-w-neutral-4">
            게시글:{" "}
            <Link
              href={`/post/${item.post.id}`}
              className="text-primary font-medium hover:underline"
            >
              {item.post.title}
            </Link>
          </p>
        </li>
      ))}
    </ul>
  );
}
