"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import heroBanner11 from "@public/images/photos/heroBanner11.webp";
import heroBanner12 from "@public/images/photos/heroBanner12.webp";
import heroBanner13 from "@public/images/photos/heroBanner13.webp";
import heroBanner14 from "@public/images/photos/heroBanner14.webp";
import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user5 from "@public/images/users/user5.png";
import user6 from "@public/images/users/user6.png";
import user7 from "@public/images/users/user7.png";
import user8 from "@public/images/users/user8.png";
import user9 from "@public/images/users/user9.png";
import user10 from "@public/images/users/user10.png";
import user11 from "@public/images/users/user11.png";
import user12 from "@public/images/users/user12.png";
import user13 from "@public/images/users/user13.png";
import user14 from "@public/images/users/user14.png";
import user15 from "@public/images/users/user15.png";
import user31 from "@public/images/users/user31.png";
import {
  IconBrandApple,
  IconBrandWindows,
  IconChessQueen,
} from "@tabler/icons-react";
import { Autoplay, Pagination } from "swiper/modules";

const HomeBannerFour = () => {
  const banner = [
    {
      id: "1",
      image: heroBanner11,
      title: "Play & Earn",
      friends: [user1, user2, user3, user4],
    },
    {
      id: "2",
      image: heroBanner12,
      title: "Play & Earn",
      friends: [user5, user6, user7, user8],
    },
    {
      id: "3",
      image: heroBanner13,
      title: "Play & Earn",
      friends: [user9, user10, user11, user12],
    },
    {
      id: "4",
      image: heroBanner14,
      title: "Play & Earn",
      friends: [user13, user14, user15],
    },
  ];

  const leaderboard = [
    {
      id: "1",
      name: "Baseball Legends",
      points: 270,
      image: user31,
      badge: "Apex Legends",
    },
    {
      id: "2",
      name: "Tiny Tools Tea",
      points: 187,
      image: user15,
      badge: "Fortnite",
    },
    {
      id: "3",
      name: "Crafting Legends",
      points: 786,
      image: user2,
      badge: "CoD Warzone",
    },
  ];

  return (
    <section className="section-pt overflow-visible">
      <div className="container relative pt-[30px]">
        <div className="grid grid-cols-12 items-center gap-x-24p gap-y-40p">
          <div className="4xl:col-span-8 xxl:col-span-7 col-span-12">
            <div className="relative">
              <Swiper
                loop={true}
                slidesPerView={1}
                speed={1000}
                centeredSlides={false}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: false,
                  reverseDirection: true,
                }}
                spaceBetween={24}
                navigation={{
                  nextEl: `.btn-next`,
                  prevEl: `.btn-prev`,
                }}
                pagination={{
                  el: `.swiper-pagination`,
                  clickable: true,
                }}
                className="swiper one-card-carousel rounded-12"
                data-carousel-name="home-two-hero"
                modules={[Autoplay, Pagination]}
              >
                {banner?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full rounded-16 overflow-hidden relative">
                      <Image
                        className="w-full lg:h-[506px] md:h-[440px] h-[380px] object-cover"
                        src={item?.image}
                        alt="product"
                      />
                      <div className="absolute inset-0 z-[2] p-30p">
                        <div className="relative h-full">
                          <div className="absolute top-0 flex items-center gap-3.5">
                            <span className="flex-c bg-secondary text-b-neutral-4 icon-24 size-40p rounded-full">
                              <IconBrandWindows size={24} />
                            </span>
                            <span className="flex-c bg-secondary text-b-neutral-4 icon-24 size-40p rounded-full">
                              <IconBrandApple size={24} />
                            </span>
                          </div>
                          <div className="absolute bottom-0 w-full">
                            <div className="text-center flex-c">
                              <h1
                                className="display-100 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-30p"
                                data-text={`${item?.title}`}
                              >
                                {item?.title}
                              </h1>
                            </div>
                            <div className=" flex items-center ml-3">
                              {item?.friends?.slice(0, 4).map((img, idx) => (
                                <Image
                                  key={idx}
                                  className="avatar size-40p shrink-0 border border-white -ml-3"
                                  width={40}
                                  height={40}
                                  src={img}
                                  alt="user"
                                />
                              ))}
                              <span className="badge badge-ssm badge-primary border-none !whitespace-nowrap text-base !w-fit z-[2]">
                                + 75 Friends
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overlay-1"></div>
                    </div>
                  </SwiperSlide>
                ))}
                <div>
                  <div className="swiper-pagination pagination-two home-two-hero-carousel-pagination items-center gap-2.5  pb-30p px-30p sm:flex justify-end hidden"></div>
                </div>
              </Swiper>
            </div>
          </div>

          <div className="4xl:col-span-4 xxl:col-span-5 col-span-12">
            <div className="bg-b-neutral-3 py-32p px-40p rounded-32">
              <h3 className="heading-3 text-w-neutral-1 mb-3">Leaderboards</h3>
              <p className="text-base text-w-neutral-4">
                Earn unique prizes and the end of each week.
              </p>
              <div className="grid grid-cols-1 gap-20p py-32p *:inline-flex  *:items-center *:justify-between *:gap-20p">
                {leaderboard?.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 relative">
                        <Image
                          className="avatar size-60p"
                          src={item?.image}
                          width={60}
                          height={60}
                          alt="user"
                        />
                        <span
                          className={` ${
                            idx == 0
                              ? "bg-b-neutral-3 text-primary"
                              : idx == 1
                              ? "bg-secondary text-b-neutral-3"
                              : idx == 2
                              ? "bg-b-neutral-3 text-w-neutral-4"
                              : ""
                          } absolute -bottom-3 left-1/2 -translate-x-1/2 flex-c size-6  rounded-full icon-16}`}
                        >
                          <IconChessQueen size={16} />
                        </span>
                      </div>
                      <div>
                        <Link
                          href="/profile"
                          className="text-m-medium text-w-neutral-1 mb-1"
                        >
                          {item?.name}
                        </Link>
                        <span className="text-sm text-w-neutral-4">
                          {item?.points} Points
                        </span>
                      </div>
                    </div>
                    <span className="badge badge-lg badge-neutral-2 whitespace-nowrap font-normal">
                      {item?.badge}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/leaderboard"
                className="btn btn-md btn-primary w-full"
              >
                View All Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBannerFour;
