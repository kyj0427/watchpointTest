"use client";

import { mostPlayedGames } from "@public/data/mostPlayedGames";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MostPlayedGames = () => {
  return (
    <section className="section-pt">
      <div className="container">
        <div
          className="flex-y flex-wrap justify-between gap-24p mb-40p"
          data-aos="fade-up"
        >
          <div className="flex-y gap-2">
            <h2 className="heading-2 text-w-neutral-1">Most Played</h2>
            <h4 className="heading-4 text-w-neutral-4">2750</h4>
          </div>
          <form className="px-20p py-16p max-w-[390px] flex items-center sm:gap-3 gap-2 min-w-[300px] rounded-full border border-shap">
            <span className="flex-c icon-24 text-w-neutral-4">
              <i className="ti ti-search"></i>
            </span>
            <input
              autoComplete="off"
              className="bg-transparent w-full pleaceholder:text-w-neutral-4"
              type="text"
              name="search"
              id="mostPlayed"
              placeholder="Search..."
            />
          </form>
        </div>
        <div
          className="swiper four-card-carousel"
          data-carousel-name="most-played-games"
          data-aos="fade-up"
        >
          <Swiper
            loop={true}
            slidesPerView={4}
            speed={500}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
              pauseOnMouseEnter: false,
              reverseDirection: true,
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
            {mostPlayedGames?.map((item, idx) => (
              <SwiperSlide key={idx} className="pb-60p">
                <div className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full">
                  <div className="glitch-effect">
                    <div className="glitch-thumb">
                      <Image
                        className="w-full xxl:h-[310px] xl:h-[280px] md:h-[260px] h-[240px] object-cover"
                        width={310}
                        height={280}
                        src={item?.photo}
                        alt="marketplace"
                      />
                    </div>
                    <div className="glitch-thumb">
                      <Image
                        className="w-full xxl:h-[310px] xl:h-[280px] md:h-[260px] h-[240px] object-cover"
                        width={310}
                        height={280}
                        src={item?.photo}
                        alt="marketplace"
                      />
                    </div>
                  </div>
                  <div className="px-20p pt-24p pb-28p">
                    <Link
                      href="/game-details-one"
                      className="heading-3 link-1 line-clamp-1 mb-2"
                    >
                      {item?.title}
                    </Link>
                    <span className="text-l-regular text-w-neutral-2 pb-20p">
                      {item?.usersRanked}{" "}
                      <span className="span text-w-neutral-4">
                        users ranked
                      </span>
                    </span>
                    <div className="flex-y flex-wrap gap-3 border-t border-shap pt-20p">
                      <div className="flex items-center *:size-40p *:shrink-0 *:size-40p *:border *:border-white *:-ml-3 ml-3">
                        {item?.followers?.slice(0, 4)?.map((item, idx) => (
                          <Image
                            key={idx}
                            className="avatar"
                            width={40}
                            height={40}
                            src={item?.avatar}
                            alt="user"
                          />
                        ))}
                        <span className="flex-c rounded-full bg-[#333333] text-s-medium text-w-neutral-1">
                          +{item?.followers?.length - 4}
                        </span>
                      </div>
                      <p className="text-base text-w-neutral-4">
                        {item?.usersRanked} following ranked
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination pagination-one pagination-one flex-c gap-2.5"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MostPlayedGames;
