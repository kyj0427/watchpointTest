//게임정보 메인페이지 gameinfo 컴포넌트

import { GameInformation } from "@public/data/gameinfoData";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const GameInfoComp = () => {
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid 4xl:grid-cols-2 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24p">
          {GameInformation?.map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-b-neutral-3 p-24p rounded-24 grid 4xl:grid-cols-2 grid-cols-1 items-center gap-24p group"
              data-aos="zoom-in"
            >
              <div className="overflow-hidden rounded-24">
                <Image
                  className="w-full xxl:h-[304px] xl:h-[280px] md:h-[260px] h-[240px] object-cover group-hover:scale-110 transition-1"
                  src={item?.image}
                  width={304}
                  height={280}
                  alt={item?.title || "Game image"}
                />
              </div>
              <div>
                <div className="flex-y flex-wrap gap-2">
                  {item?.genre && (
                    <span className="badge badge-neutral-2 badge-smm">
                      {item.genre}
                    </span>
                  )}
                </div>
                <Link
                  href="/gameinfo/gameinfoDetail"
                  className="heading-3 text-w-neutral-1 4xl:line-clamp-2 line-clamp-1 link-1 my-16p text-split-left"
                >
                  {item?.title}
                </Link>
                <div className="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
                  <div className="flex-y gap-2.5">
                    <span className="badge badge-secondary size-3 badge-circle"></span>
                    <p className="text-base text-neutral-100">
                      <span className="span">
                        {item?.views?.toLocaleString() || 0}
                      </span>{" "}
                      Viewers
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
                    alt={`${item?.author?.name || "User"}'s avatar`}
                    width={60}
                    height={60}
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
            href="/gameinfo"
            className="btn btn-xl py-3 btn-neutral-3 bg-b-neutral-3 text-w-neutral-1 rounded-12 outline-none"
          >
            더보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GameInfoComp;
