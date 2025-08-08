"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import user1 from "@public/images/users/user1.png";

interface FormData {
  post: string;
  media?: FileList;
}

const PostCreate = () => {
  const [expanded, setExpanded] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
    setExpanded(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-b-neutral-3 rounded-12 px-32p py-24p shadow-xl border border-b-neutral-2 transition"
    >
      <div className="flex items-start gap-4">
        {/* 아바타 */}
        <Image
          width={60}
          height={60}
          className="rounded-full border border-b-neutral-2 shadow-sm"
          src={user1}
          alt="user"
        />

        {/* 입력 + 확장 */}
        <div className="flex-1">
          <textarea
            {...register("post", { required: true })}
            rows={expanded ? 6 : 1}
            placeholder="What's on your mind?"
            className="w-full resize-none bg-b-neutral-2 text-w-neutral-1 placeholder:text-w-neutral-4 rounded-xl px-6 py-4 text-sm outline-none transition-all duration-300 ease-in-out"
          />

          {/* 확장 영역 */}
          {expanded && (
            <div className="mt-6 mb-4">
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer text-w-neutral-1 hover:opacity-90">
                <i className="ti ti-photo text-green-400 text-lg" />
                <span>Attach Photo</span>
                <input type="file" {...register("media")} className="hidden" />
              </label>
            </div>
          )}

          {/* 버튼 영역 */}
          <div className="flex justify-end items-center gap-3 mt-2">
            {expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-xs text-w-neutral-4 hover:text-white transition"
              >
                Close ▲
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-xs text-w-neutral-4 hover:text-white transition"
              >
                More ▼
              </button>
            )}

            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-semibold transition shadow"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostCreate;
