"use client";

import VideoPlayer from "@/lib/plyr/VideoPlayer";
import { groupPosts } from "@public/data/groupPosts";
import Image from "next/image";
import Link from "next/link";
import GroupPostFilter from "./GroupPostFilter";
import AnimateHeight from "react-animate-height";
import { useState } from "react";
import {
  IconHeart,
  IconLink,
  IconMessage,
  IconMoodSmileBeam,
  IconPhoto,
  IconShare3,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";

interface CommentFormData {
  comment: string;
  media?: FileList;
}

const GroupHome = () => {
  const [showComment, setShowComment] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const onSubmit = (data: CommentFormData) => {
    console.log("Form Submitted");
    console.log(data);
    reset();
  };

  return (
    <div className="pt-8">
      <div className="flex items-center justify-end bg-b-neutral-3 rounded-12 px-30p py-20p mb-30p">
        <GroupPostFilter />
      </div>
      <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:px-40p *:py-32p">
        {groupPosts?.map((item, idx) => (
          <div key={idx} data-aos="fade-up">
            <div className="flex lg:items-center flex-wrap gap-3 mb-20p">
              <Image
                className="avatar size-72p"
                src={item?.author?.avatar}
                alt={item?.author?.name}
              />
              <div>
                <div className="flex flex-wrap max-lg:flex-col lg:items-center gap-1">
                  <Link
                    href="/profile"
                    className="text-xl-medium text-w-neutral-1 link-1"
                  >
                    {item?.author?.name}
                  </Link>
                  <div className="flex max-lg:flex-col lg:items-center gap-1">
                    <span className="text-sm text-w-neutral-4">
                      posted an update in the group
                    </span>
                    <Link href="#" className="text-m-medium text-w-neutral-1">
                      {item?.groupName}
                    </Link>
                  </div>
                </div>
                <span className="text-s-medium text-w-neutral-4">
                  {item?.publish}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-16p">
              {item?.content?.postText && (
                <p className="text-sm text-w-neutral-4">
                  {item?.content?.postText}
                </p>
              )}
              {item?.content?.image && (
                <div className="overflow-hidden">
                  <Image
                    className="w-full xl:h-[472px] lg:h-[420px] md:h-[380px] h-[320px] hover:scale-110 object-cover transition-1"
                    src={item?.content?.image}
                    alt="img"
                  />
                </div>
              )}
              {item?.content?.video && (
                <VideoPlayer
                  videoSrc={item?.content?.video?.videoSrc}
                  posterSrc={item?.content?.video?.posterSrc}
                  videoTitle=""
                />
              )}
            </div>

            {/* <!-- post footer --> */}
            <div className="pt-20p">
              <div className="flex items-center justify-between flex-wrap gap-24p mb-20p">
                <div className="flex items-center gap-32p">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-base
text-w-neutral-1"
                  >
                    <IconHeart size={24} className="text-w-neutral-4" />
                    Like
                  </button>
                  <button
                    onClick={() =>
                      showComment !== idx
                        ? setShowComment(idx)
                        : setShowComment(null)
                    }
                    type="button"
                    className="flex items-center gap-2 text-base
text-w-neutral-1"
                  >
                    <IconMessage size={24} className="text-w-neutral-4" />
                    Comment
                  </button>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-base
text-w-neutral-1"
                >
                  <IconShare3 size={24} className="text-w-neutral-4" />
                  Share
                </button>
              </div>
              <div className="flex items-center flex-wrap gap-3 md:gap-[18px] mb-20p">
                <div className="flex items-center  ml-3">
                  {item?.likes?.slice(0, 4)?.map((user, idx) => (
                    <Image
                      className="avatar size-8 border border-white -ml-3"
                      key={idx}
                      src={user?.avatar}
                      alt={user?.name}
                    />
                  ))}
                </div>
                <p className="text-sm text-w-neutral-4">
                  Liked
                  <span className="span text-w-neutral-1">
                    {item?.likes[0].name}
                  </span>
                  <span className="span text-w-neutral-1">and</span>
                  {item?.likes?.length - 4} Others
                </p>
              </div>

              {/* comments */}
              <AnimateHeight
                duration={300}
                height={showComment == idx ? "auto" : 0}
              >
                <div className="pt-20p border-t border-shap">
                  <div className="grid grid-cols-1 gap-20p mb-20p">
                    {item?.comments?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Image
                          className="avatar size-48p"
                          src={item?.author?.avatar}
                          alt={item?.author?.name}
                        />
                        <div>
                          <div className="bg-glass-5 px-3 py-2 rounded-12">
                            <Link
                              href="/profile"
                              className="text-m-medium text-w-neutral-1 link-1 line-clamp-1 mb-2"
                            >
                              {item?.author?.name}
                            </Link>
                            <div className="flex items-end max-sm:flex-wrap gap-3">
                              <p className="text-sm text-w-neutral-3">
                                {item?.comment}
                              </p>
                              <button
                                type="button"
                                className="shrink-0 flex-y gap-2 icon-20 text-w-neutral-4"
                              >
                                <IconHeart
                                  size={24}
                                  className="text-w-neutral-4"
                                />
                                <IconMoodSmileBeam
                                  size={24}
                                  className="text-w-neutral-4"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-16p">
                            <button type="button" className="flex-y gap-1">
                              <IconHeart size={20} className="text-danger" />
                              <span className="text-sm text-w-neutral-1">
                                Like
                              </span>
                            </button>
                            <div className="flex-y gap-1">
                              <button
                                type="button"
                                className="text-sm text-w-neutral-1"
                              >
                                Reply
                              </button>
                              <span className="text-sm text-w-neutral-1">
                                {item?.publish}d
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-20p">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex items-center justify-between gap-6 bg-b-neutral-2 rounded-full py-4 px-8"
                    >
                      <input
                        className="w-full bg-transparent text-base text-white placeholder:text-w-neutral-1 outline-none"
                        type="text"
                        placeholder="Add Your Comment..."
                        {...register("comment", { required: true })}
                      />

                      <div className="flex items-center gap-3 text-w-neutral-4">
                        <button type="button">
                          <IconMoodSmileBeam
                            size={24}
                            className="text-w-neutral-4"
                          />
                        </button>

                        <label htmlFor="comment-media">
                          <IconPhoto
                            size={24}
                            className="text-w-neutral-4 cursor-pointer"
                          />
                        </label>
                        <input
                          type="file"
                          id="comment-media"
                          className="hidden"
                          {...register("media")}
                        />

                        <button type="button">
                          <IconLink size={24} className="text-w-neutral-4" />
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-blue-500 px-4 py-2 rounded-full"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-c mt-48p">
        <Link href="#" className="btn btn-xl py-3 btn-primary rounded-12">
          Load More...
        </Link>
      </div>
    </div>
  );
};

export default GroupHome;
