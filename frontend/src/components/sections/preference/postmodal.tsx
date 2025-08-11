"use client";
import { useRef } from "react";
import PostDetail from "@/components/sections/community/PostDetail"; 

type PostModalProps = {
  post: any;
  onClose: () => void;
};

const PostModal = ({ post, onClose }: PostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-b-neutral-3 text-white rounded-xl p-6 max-w-5xl w-full relative shadow-xl overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-white hover:text-red-400"
        >
          &times;
        </button>

        {/* 게시물 상세 내용 렌더 */}
        <PostDetail post={post} />
      </div>
    </div>
  );
};

export default PostModal;
