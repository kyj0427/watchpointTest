"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import Link from "next/link";

import gameinfoHomeBannerData, { GameinfoBannerItem } from "@public/data/gameinfoHomeBannerData";

const GameinfoHomeBanner = () => {
  type ThumbsSwiperType = any | null;
  const [thumbsSwiper, setThumbsSwiper] = useState<ThumbsSwiperType>(null);

  return (
    <section className="section-pt">
      <div className="container relative pt-[30px] ">
        <div>
          <SwiperCD
            spaceBetween={10}
            slidesPerView={1}
            loop={gameinfoHomeBannerData.length > 1}
            speed={800}
            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
            pagination={{ el: ".thumbs-gallery-pagination", clickable: true }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Navigation, Pagination, Thumbs]}
            className="swiper thumbs-gallery-main"
          >
            {gameinfoHomeBannerData.map((item: GameinfoBannerItem, idx: number) => (
              <SwiperSlide key={item.id ?? idx} className="swiper-slide">
                <div className="w-full rounded-32 overflow-hidden relative">
                  <Image
                    className="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                    src={item.image}
                    width={1920}
                    height={630}
                    alt="product"
                  />
                  <div className="absolute inset-0 z-[2] mx-80p 3xl:pt-[125px] xxl:pt-28 xl:pt-25 md:pt-12 pt-8">
                    <div className="max-w-[790px]">
                      <h1 className="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2" data-text={item.title}>
                        {item.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p">
                        <span className="text-m-medium text-w-neutral-1">{item.game}</span>
                        <span className="badge badge-circle badge-dot badge-light size-1"></span>
                        <span className="text-m-medium text-w-neutral-1">{item.language}</span>
                      </div>
                      <Link href={item.link} className="btn btn-lg btn-primary rounded-12">
                        전체 영웅 보기
                      </Link>
                    </div>
                  </div>
                  <div className="overlay-1"></div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperCD>

          <div className="md:absolute lg:right-15 md:right-12 lg:bottom-15 md:bottom-12 z-[2] overflow-hidden pt-5 flex justify-end">
            <Swiper
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3}
              loop={gameinfoHomeBannerData.length > 1}
              speed={500}
              freeMode
              breakpoints={{ 768: { spaceBetween: 20 }, 992: { spaceBetween: 24 } }}
              modules={[FreeMode, Thumbs]}
              className="thumbs-gallery xxl:w-[572px] lg:w-[400px] md:w-[380px] xsm:w-[300px] w-full h-fit overflow-hidden"
            >
              {gameinfoHomeBannerData.map((item: GameinfoBannerItem, idx: number) => (
                <SwiperSlide key={item.id ?? idx} className="pb-10">
                  <div className="overflow-hidden cursor-pointer rounded-20">
                    {/* 썸네일 표시하려면 주석 해제 */}
                    {/* 
                    <Image
                      className="xxl:w-[180px] xl:w-[140px] lg:w-[120px] md:w-25 w-20 xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                      src={item.image}
                      width={180}
                      height={110}
                      alt="thumb"
                    /> 
                    */}
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination pagination-three thumbs-gallery-pagination flex-c gap-2.5"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameinfoHomeBanner;
