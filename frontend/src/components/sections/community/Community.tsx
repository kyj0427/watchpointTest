import RightAsideOne from "@/components/shared/RightAsideOne";
import { blogPosts } from "@public/data/blogPosts";
import { groups } from "@public/data/groups";
import { IconArrowRight, IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import PostCreateCard from "../profile/PostCreateCard";
import ProfilePosts from "../profile/ProfilePosts";
import DayStory from "./DayStory";

const Community = () => {
  return (
    <section className="section-py overflow-visible">
      <div className="container pt-[30px]">
        <div className="grid grid-cols-12 gap-30p">
          <div className="min-[1480px]:col-span-3 xl:col-span-4 xl:block hidden relative">
            <div className="xl:sticky xl:top-30 h-screen pb-40 overflow-y-auto scrollbar-0">
              <div className="py-24p px-32p bg-b-neutral-3 rounded-12 mb-30p">
                <div className="flex flex-wrap justify-between items-center gap-20p mb-24p">
                  <div className="flex-y gap-3">
                    <span className="badge badge-circle size-3 badge-primary"></span>
                    <h4 className="heading-4 text-w-neutral-1">
                      Recent Topics
                    </h4>
                  </div>
                  <Link
                    href="/blogs"
                    className="flex-y gap-1 text-s-medium text-w-neutral-1 link-1"
                  >
                    View All
                    <IconArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-24p">
                  {blogPosts?.slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex 3xl:flex-nowrap xl:flex-wrap flex-nowrap items-center gap-x-28p gap-y-3"
                    >
                      <Image
                        className="shrink-0 avatar size-60p"
                        src={item?.author?.avatar}
                        alt="user"
                      />
                      <div>
                        <Link
                          href="/blog-details"
                          className="heading-5 text-w-neutral-1 line-clamp-2 link-1 mb-1"
                        >
                          {item?.title}
                        </Link>
                        <div className="flex-y gap-2">
                          <p className="text-sm text-w-neutral-4">
                            By{" "}
                            <Link
                              href="/profile"
                              className="text-w-neutral-1 underline link-1 span"
                            >
                              {item?.author?.name}
                            </Link>
                          </p>
                          <IconCircleCheckFilled
                            size={20}
                            className="text-secondary"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-24p px-32p bg-b-neutral-3 rounded-12">
                <div className="flex flex-wrap justify-between items-center gap-20p mb-24p">
                  <div className="flex-y gap-3">
                    <span className="badge badge-circle size-3 badge-primary"></span>
                    <h4 className="heading-4 text-w-neutral-1">Groups</h4>
                  </div>
                  <Link
                    href="/groups"
                    className="flex-y gap-1 text-s-medium text-w-neutral-1 link-1"
                  >
                    View All
                    <IconArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-24p">
                  {groups?.slice(0, 4)?.map((group, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Image
                        className="shrink-0 bg-w-neutral-4 size-60p rounded-12"
                        src={group?.image}
                        alt={group?.name}
                        width={60}
                        height={60}
                      />
                      <div>
                        <Link
                          href={`/groups/${group?.id}`}
                          className="heading-5 text-w-neutral-1 line-clamp-2 link-1 mb-1"
                        >
                          {group?.name}
                        </Link>
                        <p className="text-sm text-w-neutral-4">
                          Joined {group?.lastActive}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="min-[1480px]:col-span-6 xl:col-span-8 col-span-12">
            <div className="grid grid-cols-1 gap-30p">
              <DayStory />
              <PostCreateCard />
              <ProfilePosts />
              <div className="flex-c mt-48p">
                <button
                  type="button"
                  className="btn btn-lg btn-neutral-3 rounded-12"
                >
                  Load more...
                </button>
              </div>
            </div>
          </div>
          <div className="min-[1480px]:col-span-3 relative min-[1480px]:block hidden">
            <div className="min-[1480px]:sticky min-[1480px]:top-30 h-screen pb-40 overflow-y-auto scrollbar-0">
              <RightAsideOne />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
