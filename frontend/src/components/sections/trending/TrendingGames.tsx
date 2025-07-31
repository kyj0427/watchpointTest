import { topTrendingGames } from "@public/data/topTrending";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const TrendingGames = () => {
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid 4xl:grid-cols-2 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24p">
          {topTrendingGames?.map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-b-neutral-3 p-24p rounded-24 grid 4xl:grid-cols-2 grid-cols-1 items-center gap-24p group"
              data-aos="zoom-in"
            >
              <div className="overflow-hidden rounded-24">
                <Image
                  className="w-full xxl:h-[304px] xl:h-[280px] md:h-[260px] h-[240px] object-cover group-hover:scale-110 transition-1"
                  src={item?.photo}
                  width={304}
                  height={280}
                  alt="img"
                />
              </div>
              <div>
                <div className="flex-y flex-wrap gap-2">
                  <span className="badge badge-neutral-2 badge-smm">
                    {item?.genres[0]}
                  </span>
                  <span className="badge badge-danger badge-smm">Live</span>
                  <span className="badge badge-neutral-2 badge-smm">
                    {item?.category}
                  </span>
                </div>
                <Link
                  href="/live-stream"
                  className="heading-3 text-w-neutral-1 4xl:line-clamp-2 line-clamp-1 link-1 my-16p text-split-left"
                >
                  {item?.title}
                </Link>
                <div className="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
                  <div className="flex-y gap-2.5">
                    <span className="badge badge-secondary size-3 badge-circle"></span>
                    <p className="text-base text-neutral-100">
                      <span className="span">{item?.views}</span> Viewers
                    </p>
                  </div>
                  <div className="flex-y gap-2.5">
                    <span className="badge badge-primary size-3 badge-circle"></span>
                    <p className="text-base text-neutral-100">
                      <span className="span">{item?.publish}</span>
                    </p>
                  </div>
                </div>
                <div className="flex-y flex-wrap gap-3">
                  <Image
                    className="size-60p rounded-full shrink-0"
                    src={item?.author.avatar}
                    alt="user"
                  />
                  <div>
                    <Link
                      href="/profile"
                      className="text-l-medium flex-y gap-2 link-1 text-w-neutral-1"
                    >
                      {item?.author?.name}
                      <IconCircleCheckFilled
                        size={24}
                        className="text-secondary"
                      />
                    </Link>
                    <span className="text-s-medium text-w-neutral-4">
                      {item?.author?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-c mt-48p">
          <Link
            href="#"
            className="btn btn-xl py-3 btn-neutral-3 bg-b-neutral-3 text-w-neutral-1 rounded-12 outline-none"
          >
            Load More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;
