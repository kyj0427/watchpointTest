"use client";

import VideoPlayer from "@/lib/plyr/VideoPlayer";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { timelineItems } from "@public/data/timelinePosts";
import {
  IconDots,
  IconHeart,
  IconMessage,
  IconMoodSmileBeam,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

const Posts = () => {
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [showMoreCommentsId, setShowMoreCommentsId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:px-40p *:py-32p">
      {timelineItems?.map((item, idx) => {
        const isExpanded = expandedPostId === item.id;
        const showMore = showMoreCommentsId === item.id;

        return (
          <div key={idx} className="relative">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Image className="avatar size-60p" width={60} height={60} src={item?.author?.avatar} alt="user" />
                <div>
                  <Link href="/profile" className="text-xl-medium text-w-neutral-1 link-1 line-clamp-1 mb-1">
                    {item?.author?.name}
                  </Link>
                  <span className="text-s-medium text-w-neutral-4">{item?.publish}</span>
                </div>
              </div>

              <Menu as="div" className="dropdown shrink-0 z-20">
                <MenuButton className="dropdown-toggle w-fit text-white icon-32">
                  <IconDots size={32} />
                </MenuButton>
                <MenuItems className="dropdown-content">
                  <MenuItem as="button" className="dropdown-item">Save Link</MenuItem>
                  <MenuItem as="button" className="dropdown-item">Report</MenuItem>
                  <MenuItem as="button" className="dropdown-item">Hide Post</MenuItem>
                  <MenuItem as="button" className="dropdown-item">Block User</MenuItem>
                </MenuItems>
              </Menu>
            </div>

            <div className="grid grid-cols-1 gap-20p py-20p">
              {item?.content?.postText && (
                <p className="text-sm text-w-neutral-4">{item?.content?.postText}</p>
              )}

              {isExpanded && (
                <>
                  {item?.content?.image && (
                    <div className="overflow-hidden">
                      <Image
                        className="w-full xl:h-[472px] lg:h-[420px] md:h-[380px] h-[320px] hover:scale-110 object-cover transition-1"
                        src={item?.content?.image}
                        width={1200}
                        height={472}
                        alt="img"
                      />
                    </div>
                  )}

                  {item?.content?.video?.videoSrc && (
                    <VideoPlayer
                      posterSrc={item?.content?.video?.posterSrc}
                      videoSrc={item?.content?.video?.videoSrc}
                    />
                  )}
                </>
              )}
            </div>

            {!isExpanded && (
              <div className="flex items-center gap-4 text-sm text-w-neutral-4 mb-3">
                <span>❤️ {item?.likes?.length ?? 0}</span>
                <span>💬 {item?.comments?.length ?? 0}</span>
              </div>
            )}

            {isExpanded && (
              <div>
                <div className="flex items-center justify-between flex-wrap gap-24p mb-20p">
                  <div className="flex items-center gap-32p">
                    <button type="button" className="flex items-center gap-2 text-base text-w-neutral-1">
                      <IconHeart size={24} className="text-w-neutral-4" /> Like
                    </button>
                    <button type="button" className="flex items-center gap-2 text-base text-w-neutral-1">
                      <IconMessage size={24} className="text-w-neutral-4" /> Comment
                    </button>
                  </div>
                  <button type="button" className="flex items-center gap-2 text-base text-w-neutral-1">
                    <i className="ti ti-share-3 icon-24 text-w-neutral-4"></i> Share
                  </button>
                </div>

                <div className="flex items-center flex-wrap gap-3 md:gap-[18px] mb-20p">
                  <div className="flex items-center ml-3">
                    {item?.likes?.slice(0, 4)?.map((user, idx) => (
                      <Image
                        key={idx}
                        src={user?.avatar}
                        width={32}
                        height={32}
                        className="avatar size-8 border border-white -ml-3"
                        alt="user"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-w-neutral-4">
                    Liked <Link href="/profile" className="span text-w-neutral-1">{item?.likes[0].name}</Link> <span className="span text-w-neutral-1">and</span> {item?.likes?.length - 4} Others
                  </p>
                </div>

                <div className="pt-20p border-t border-shap">
                  <div className="grid grid-cols-1 gap-20p mb-20p">
                    {item?.comments?.slice(0, 2).map((coment, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Image className="avatar size-48p" src={coment?.author?.avatar} alt="user" />
                        <div>
                          <div className="bg-glass-5 px-3 py-2 rounded-12">
                            <Link href="/profile" className="text-m-medium text-w-neutral-1 link-1 line-clamp-1 mb-2">
                              {coment?.author?.name}
                            </Link>
                            <div className="flex items-end max-sm:flex-wrap gap-3">
                              <p className="text-sm text-w-neutral-3">{coment?.comment}</p>
                              <button type="button" className="shrink-0 flex-y gap-2 icon-20 text-w-neutral-4">
                                <IconHeart size={20} />
                                <IconMoodSmileBeam size={20} />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-16p">
                            <button type="button" className="flex-y gap-1">
                              <IconHeart size={20} className="text-danger" />
                              <span className="text-sm text-w-neutral-1">Like</span>
                            </button>
                            <div className="flex-y gap-1">
                              <button type="button" className="text-sm text-w-neutral-1">Reply</button>
                              <span className="text-sm text-w-neutral-1">{item?.publish}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <AnimateHeight duration={500} height={showMore ? "auto" : 0}>
                    <div className="grid grid-cols-1 gap-20p">
                      {item?.comments?.slice(2).map((coment, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Image className="avatar size-48p" src={coment?.author?.avatar} alt="user" />
                          <div>
                            <div className="bg-glass-5 px-3 py-2 rounded-12">
                              <Link href="/profile" className="text-m-medium text-w-neutral-1 link-1 line-clamp-1 mb-2">
                                {coment?.author?.name}
                              </Link>
                              <div className="flex items-end max-sm:flex-wrap gap-3">
                                <p className="text-sm text-w-neutral-3">{coment?.comment}</p>
                                <button type="button" className="shrink-0 flex-y gap-2 icon-20 text-w-neutral-4">
                                  <IconHeart size={20} />
                                  <IconMoodSmileBeam size={20} />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-16p">
                              <button type="button" className="flex-y gap-1">
                                <IconHeart size={20} className="text-danger" />
                                <span className="text-sm text-w-neutral-1">Like</span>
                              </button>
                              <div className="flex-y gap-1">
                                <button type="button" className="text-sm text-w-neutral-1">Reply</button>
                                <span className="text-sm text-w-neutral-1">{item?.publish}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimateHeight>

                  {item?.comments?.length > 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCommentsId((prevId) => (prevId === item.id ? null : item.id));
                      }}
                      type="button"
                      className="text-m-medium text-w-neutral-1 mb-16p block mt-20p"
                    >
                      {showMore ? "Hide comments" : `View ${item?.comments.length - 2} more comment`}
                    </button>
                  )}

                  <form className="flex items-center justify-between gap-24p bg-b-neutral-2  rounded-full py-16p px-32p">
                    <input className="w-full bg-transparent text-base text-white placeholder:text-w-neutral-1" type="text" name="name" placeholder="Add Your Comment..." />
                    <div className="flex-y gap-3 icon-24 text-w-neutral-4">
                      <button type="button">
                        <i className="ti ti-mood-smile-beam"></i>
                      </button>
                      <label htmlFor="comment-media-1">
                        <i className="ti ti-photo"></i>
                      </label>
                      <button>
                        <i className="ti ti-link"></i>
                      </button>
                      <input type="file" name="comment-media" id="comment-media-1" className="hidden" />
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Toggle Button */}
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setExpandedPostId(isExpanded ? null : item.id)}
                className="text-sm text-w-neutral-4 hover:text-w-neutral-1 transition flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Close <IconChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Open <IconChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
