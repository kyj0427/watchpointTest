"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import user1 from "@public/images/users/user1.png";
import avatar1 from "@public/images/users/avatar1.png";
import avatar2 from "@public/images/users/avatar2.png";
import replyFill from "@public/images/icons/reply-fill.svg";
import { IconSend } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import AnimateHeight from "react-animate-height";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Student",
    comment:
      "Gaming has cultivated vibrant communities and the rise of esports has brought competitive gaming to the forefront. We'll examine the phenomenon of , its rapid growth, and the professional gaming scene.",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Writer",
    comment:
      "The gaming industry has expanded massively, offering new career opportunities and interactive experiences. We'll delve into the evolution of gaming, its influence on society, and the future of the gaming industry.",
    avatar: avatar2,
  },
];

const ProductFooter = () => {
  const [activeTab, setActiveTab] = useState<number | string>(1);
  const tabs = [
    { id: 1, title: "Description" },
    { id: 2, title: "Reviews (01)" },
    { id: 3, title: "Shipping" },
  ];

  const [activeReply, setActiveReply] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    // Handle the form submission logic
    reset();
  };

  return (
    <div className="max-w-[1230px] w-full">
      <div className="flex items-center flex-wrap text-l-medium mb-6">
        {tabs?.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(tab.id)}
            className={`px-60p py-16p ${
              activeTab === tab.id
                ? "bg-secondary text-b-neutral-4"
                : "bg-b-neutral-3 text-w-neutral-4"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {activeTab === 1 && (
        <div>
          <p className="text-base text-w-neutral-4 mb-3">
            Music has an extraordinary power to touch our souls and transcend
            barriers, bringing people together from all walks of life. It is an
            art form that has been an integral part of human civilization since
            time immemorial. Whether it&apos;s the rhythmic beats of a drum, the
            soothing melody of a violin, or the soulful lyric of a song, music
            has a unique way of evoking emotions and creating unforgettable
            memories.
          </p>
          <p className="text-base text-w-neutral-4">
            Music has an extraordinary power to touch our souls and transcend
            barriers, bringing people together from all walks of life. an
            integral part of human civilization since time immemorial.
          </p>
        </div>
      )}

      {activeTab === 2 && (
        <div>
          <h5 className="heading-5 text-w-neutral-1 mb-20p">02 Comments</h5>
          <div className="grid grid-cols-1 gap-x-30p gap-y-10 mb-60p">
            {reviews.map((item, idx) => (
              <div key={idx}>
                <div className="flex-y justify-between mb-32p">
                  <div className="flex-y flex-wrap gap-3">
                    <Image
                      className="avatar size-60p"
                      src={item?.avatar}
                      alt="user"
                      width={60}
                      height={60}
                    />
                    <div>
                      <Link
                        href="/profile"
                        className="text-l-medium text-w-neutral-1 link-1 mb-1"
                      >
                        {item?.name}
                      </Link>
                      <span className="text-s-medium text-w-neutral-3">
                        {item?.role}
                      </span>
                    </div>
                  </div>
                  <button
                    className="flex-y gap-3"
                    onClick={() =>
                      setActiveReply(activeReply === item.id ? null : item.id)
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
                <p className="text-base text-w-neutral-4">{item.comment}</p>

                <AnimateHeight
                  duration={300}
                  height={activeReply === item.id ? "auto" : 0}
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
                      <IconSend size={24} />
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
              <button
                type="submit"
                className="btn btn-xl btn-primary rounded-12"
              >
                Submit Comments
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 3 && (
        <div>
          <p className="text-base text-w-neutral-4">
            Melodies of Emotion&quot; is a mesmerizing instrumental album
            brought to life by the talented Harmony Ensemble. collection takes
            listeners on an enchanting journey through a variety of emotions,
            skillfully conveyed through a blend of classical and contemporary
            musical elements. The absence of lyrics allows to speak directly to
            the invoking vivid imagery and stirring sentiments.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductFooter;
