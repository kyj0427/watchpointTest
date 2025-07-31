"use client";

import RatingStars from "@/components/ui/RatingStars";
import { topRatedGamesData } from "@public/data/topRatedGamesData";
import {
  IconArrowBarToDown,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TopRatedGames = () => {
  return (
    <section className="section-pt">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Top Rated
          </h2>
          <Link
            href="/games"
            className="btn btn-lg py-3 btn-neutral-2 shrink-0"
          >
            View All
          </Link>
        </div>
        <div className="mt-40p" data-aos="fade-up">
          <Swiper
            loop={true}
            slidesPerView={4}
            speed={500}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
              pauseOnMouseEnter: false,
              reverseDirection: false,
            }}
            spaceBetween={24}
            centeredSlides={false}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 14,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1600: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            navigation={{
              nextEl: ".btn-next",
              prevEl: ".btn-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            modules={[Autoplay, Navigation]}
          >
            {topRatedGamesData?.map((game, idx) => (
              <SwiperSlide className="pb-15" key={idx}>
                <div className="w-full bg-b-neutral-3 rounded-12 group">
                  <div className="overflow-hidden rounded-t-12">
                    <Image
                      className="w-full 4xl:h-[316px] xl:h-[280px] lg:h-[260px] sm:h-[220px] h-[200px] group-hover:scale-110 object-cover transition-1"
                      src={game.image}
                      width={500}
                      height={316}
                      alt={game?.title}
                    />
                    <span className="absolute top-5 left-5 badge badge-base badge-neutral-3">
                      <span className="badge badge-dot badge-ring-accent-1"></span>
                      {game?.type}
                    </span>
                  </div>
                  <div className="p-20p">
                    <Link
                      href="/game-details-one"
                      className="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-2"
                    >
                      {game.title}
                    </Link>
                    <div className="flex-y justify-between flex-wrap gap-20p">
                      <div>
                        <span className="text-l-regular text-w-neutral-2 mb-2">
                          {game.download} <span className="span">User</span>
                        </span>
                        <div className="flex-y flex-wrap gap-1 text-primary icon-20">
                          <IconStarFilled size={20} />
                          <IconStarFilled size={20} />
                          <IconStarFilled size={20} />
                          <IconStarFilled size={20} />
                          <IconStarHalfFilled size={20} />
                        </div>
                      </div>
                      <Link href="#" className="btn-c btn-c-lg btn-c-primary">
                        <IconArrowBarToDown />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination pagination-one top-rated-games-one-carousel-pagination flex-c gap-2.5"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TopRatedGames;
