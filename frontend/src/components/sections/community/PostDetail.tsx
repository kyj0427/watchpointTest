"use client";

import { useState } from "react";
import Image from "next/image";
import VideoPlayer from "@/lib/plyr/VideoPlayer";

type Author = {
  name: string;
  avatar: string;
};

type Comment = {
  author: Author;
  comment: string;
};

type Post = {
  author: Author;
  publish: string;
  content?: {
    postText?: string;
    image?: string;
    video?: {
      videoSrc: string;
      posterSrc?: string;
    };
  };
  comments?: Comment[];
};

type PostDetailProps = {
  post: Post | undefined;
};

export default function PostDetail({ post }: PostDetailProps) {
 
  if (!post) return <div className="text-white">게시물을 불러올 수 없습니다.</div>;

  const [comments, setComments] = useState<Comment[]>(post.comments ?? []);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newItem: Comment = {
      comment: newComment,
      author: {
        name: "현재유저",
        avatar: "/images/default-avatar.png", // fallback 아바타
      },
    };

    setComments((prev) => [...prev, newItem]);
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      {/* 작성자 정보 */}
      <div className="flex items-center gap-3">
        <Image
          className="avatar size-60p"
          width={60}
          height={60}
          src={post.author.avatar || "/images/default-avatar.png"}
          alt="user"
        />
        <div>
          <p className="text-xl-medium text-w-neutral-1">{post.author.name}</p>
          <p className="text-s-medium text-w-neutral-4">{post.publish}</p>
        </div>
      </div>

      {/* 본문 텍스트 */}
      {post.content?.postText && (
        <p className="text-base text-white">{post.content.postText}</p>
      )}

      {/* 이미지 */}
      {post.content?.image && (
        <Image
          src={post.content.image}
          alt="Post Image"
          width={600}
          height={400}
          className="rounded-md"
        />
      )}

      {/* 영상 */}
      {post.content?.video?.videoSrc && (
        <VideoPlayer
          videoSrc={post.content.video.videoSrc}
          posterSrc={post.content.video.posterSrc}
        />
      )}

      {/* 댓글 리스트 */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold text-white">💬 댓글</h3>
        {comments.map((c, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Image
              src={c.author.avatar || "/images/default-avatar.png"}
              width={40}
              height={40}
              className="rounded-full"
              alt="avatar"
            />
            <div>
              <p className="text-sm text-w-neutral-1 font-semibold">{c.author.name}</p>
              <p className="text-sm text-w-neutral-3">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow bg-b-neutral-2 text-white px-4 py-2 rounded-full placeholder:text-w-neutral-4 outline-none"
          placeholder="댓글을 입력하세요..."
        />
        <button
          onClick={handleAddComment}
          className="btn btn-primary py-2 px-4 rounded-full"
        >
          등록
        </button>
      </div>
    </div>
  );
}
