"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import replyFill from "@public/images/icons/reply-fill.svg";
import avatar3 from "@public/images/users/avatar3.png";
import avatar4 from "@public/images/users/avatar4.png";
import user1 from "@public/images/users/user1.png";
import AnimateHeight from "react-animate-height";

const comments = [
  {
    id: 1,
    userImage: avatar3,
    name: "David Smith",
    role: "Leader",
    comment:
      "Gaming has cultivated vibrant communities and the rise of esports has brought competitive gaming to the forefront. We’ll examine the phenomenon, its rapid growth, and the professional gaming scene.",
  },
  {
    id: 2,
    userImage: avatar4,
    name: "Sarah Johnson",
    role: "Gamer",
    comment:
      "The gaming industry has expanded massively, offering new career opportunities and interactive experiences. We’ll delve into the evolution of gaming, its influence on society, and the future of the gaming industry.",
  },
];

const BlogComments = () => {
  const [activeReply, setActiveReply] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    // Handle the form submission logic
    reset();
  };

  return (
    <>
      <h5 className="heading-5 text-w-neutral-1 mb-20p">02 Comments</h5>
      <div className="grid grid-cols-1 gap-x-30p gap-y-10 mb-60p">
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex-y justify-between mb-32p">
              <div className="flex-y flex-wrap gap-3">
                <Image
                  className="avatar size-60p"
                  src={comment.userImage}
                  alt="user"
                  width={60}
                  height={60}
                />
                <div>
                  <Link
                    href="/profile"
                    className="text-l-medium text-w-neutral-1 link-1 mb-1"
                  >
                    {comment.name}
                  </Link>
                  <span className="text-s-medium text-w-neutral-3">
                    {comment.role}
                  </span>
                </div>
              </div>
              <button
                className="flex-y gap-3"
                onClick={() =>
                  setActiveReply(activeReply === comment.id ? null : comment.id)
                }
              >
                <Image
                  className="w-6"
                  src={replyFill}
                  alt="icon"
                  width={24}
                  height={24}
                />
                <span className="text-m-medium text-white">Reply</span>
              </button>
            </div>
            <p className="text-base text-w-neutral-4">{comment.comment}</p>

            <AnimateHeight
              duration={300}
              height={activeReply === comment.id ? "auto" : 0}
            >
              <div className="flex items-center gap-24p rounded-12 pt-24p">
                <Image
                  className="avatar size-60p"
                  src={user1}
                  alt="user"
                  width={60}
                  height={60}
                />
                <input
                  className="box-input-1 sm:col-span-4 col-span-8"
                  type="text"
                  placeholder="Write a reply..."
                />
                <button
                  type="submit"
                  className="shrink-0 btn-c btn-c-lg btn-primary icon-24"
                >
                  <i className="ti ti-send"></i>
                </button>
              </div>
            </AnimateHeight>
          </div>
        ))}
      </div>
      <div data-aos="fade-up">
        <h5 className="heading-5 text-w-neutral-1 mb-32p">Leave a Reply</h5>
        <form className="mt-60p" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-8 gap-30p mb-30p">
            <input
              className="box-input-1 sm:col-span-4 col-span-8"
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter Your Name"
            />
            <input
              className="box-input-1 sm:col-span-4 col-span-8"
              type="email"
              {...register("commenterEmail", { required: true })}
              placeholder="Enter Your Email"
            />
            <textarea
              className="box-input-1 col-span-8 h-[200px]"
              {...register("comment", { required: true })}
              placeholder="Enter Your Comments"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-xl btn-primary rounded-12">
            Submit Comments
          </button>
        </form>
      </div>
    </>
  );
};

export default BlogComments;
