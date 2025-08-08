"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import user1 from "@public/images/users/user1.png";
import { IconUsers } from "@tabler/icons-react";

interface FormData {
  post: string;
  media?: FileList;
}

const PostCreate = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // form submit event

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-b-neutral-3 rounded-12 px-32p py-20p"
    >
      <div className="flex-y gap-3.5 mb-24p">
        <Image
          width={60}
          height={60}
          className="shrink-0 avatar size-60p"
          src={user1}
          alt="user"
        />
        <div className="w-full flex items-center gap-2 bg-b-neutral-2 text-sm text-w-neutral-1 rounded-32">
          <input
            className="w-full bg-transparent text-sm text-w-neutral-1 placeholder:text-w-neutral-4 py-16p px-24p"
            type="text"
            placeholder="What’s Your Mind?"
            {...register("post", { required: true })}
          />
          <button
            type="submit"
            className="btn btn-xsm btn-primary rounded-full mr-2"
          >
            Post
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-around gap-3">
        <label htmlFor="media" className="flex-y gap-3 cursor-pointer">
          <span className="shrink-0 flex-c size-48p rounded-full bg-secondary/20 text-secondary icon-24">
            <i className="ti ti-photo"></i>
          </span>
          <span className="text-s-medium text-w-neutral-1">Photo/Video</span>
          <input
            type="file"
            id="media"
            className="hidden"
            {...register("media")}
          />
        </label>
        <button type="button" className="flex-y gap-3 cursor-pointer">
          <span className="shrink-0 flex-c size-48p rounded-full bg-primary/20 text-primary icon-24">
            <IconUsers />
          </span>
          <span className="text-s-medium text-w-neutral-1">Tag Friend</span>
        </button>
        <button type="button" className="flex-y gap-3 cursor-pointer">
          <span className="shrink-0 flex-c size-48p rounded-full bg-accent-4/20 text-accent-4 icon-24">
            <i className="ti ti-mood-smile-beam"></i>
          </span>
          <span className="text-s-medium text-w-neutral-1">
            Feeling /Activity
          </span>
        </button>
      </div>
    </form>
  );
};

export default PostCreate;
