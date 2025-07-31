"use client";

import { calculateDiscount } from "@/utility/calculateDiscount";
import { popularGamesTwoData } from "@public/data/popularGamesTwoData";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PopularGamesTwo = () => {
  return (
    <section className="section-pt">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Popular Games
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
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            modules={[Autoplay, Pagination]}
          >
            {popularGamesTwoData?.map((game, idx) => (
              <SwiperSlide className="pb-15" key={idx}>
                <div className="w-full bg-b-neutral-3 rounded-12 group">
                  <div className="overflow-hidden rounded-t-12">
                    <Image
                      className="w-full 4xl:h-[320px] xl:h-[280px] lg:h-[260px] sm:h-[220px] h-[200px] group-hover:scale-110 object-cover transition-1"
                      src={game.image}
                      alt="game"
                    />
                  </div>
                  <div className="p-20p">
                    <Link
                      href="/game-details-one"
                      className="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-20p"
                    >
                      {game.title}
                    </Link>
                    <div className="flex-y flex-wrap gap-20p">
                      <span className="badge badge-md badge-primary text-base">
                        {game.discount}% OFF
                      </span>
                      <div className="badge badge-md badge-neutral-2">
                        <span className="text-sm text-w-neutral-4 line-through">
                          ${game.price}
                        </span>
                        <span className="text-l-medium text-w-neutral-1">
                          ${calculateDiscount(game.price, game.discount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination pagination-one flex-c gap-2.5"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularGamesTwo;
