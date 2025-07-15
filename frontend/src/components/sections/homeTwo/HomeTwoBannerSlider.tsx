"use client";

import { homeTwoBannerData } from "@public/data/homeBannerData";
import {
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeTwoBannerSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      loop={homeTwoBannerData.length > 1}
      speed={1000}
      autoplay={{
        delay: 1000,
        disableOnInteraction: true,
        pauseOnMouseEnter: false,
      }}
      navigation={{
        nextEl: ".btn-next",
        prevEl: ".btn-prev",
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      modules={[Navigation, Pagination, Thumbs]}
      className="rounded-32"
    >
      {homeTwoBannerData?.map((item, idx) => (
        <SwiperSlide key={idx} className="max-sm:pb-5">
          <div className="relative w-full xxl:h-[824px] xl:h-[700px] lg:h-[640px] md:h-[480px] h-[400px] rounded-16 overflow-hidden">
            <div className="relative z-[2] mx-80p h-full flex-y">
              <div className="max-w-[628px]">
                <div className="flex-y gap-3 text-xl-medium text-w-neutral-1 mb-24p">
                  <span>Explore</span>
                  <IconArrowRight size={24} />
                  <span>Play</span>
                  <IconArrowRight size={24} />
                  <span>Win</span>
                </div>
                <h1
                  className="display-140 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                  data-text={`${item?.title}`}
                >
                  {item?.title}
                </h1>
                <p className="text-l-medium text-w-neutral-1 line-clamp-3 mb-32p">
                  {item?.description}
                </p>
                <Link
                  href={item?.link}
                  className="btn btn-md btn-primary rounded-12"
                >
                  {item?.buttonLabel}
                </Link>
              </div>
            </div>
            <div className="overlay-10"></div>
            <Image
              className="absolute inset-0 w-full h-full object-center object-cover"
              src={item?.image}
              alt="img"
            />
          </div>
        </SwiperSlide>
      ))}

      <div>
        <div className="flex items-center gap-3 sm:justify-end justify-center sm:absolute  sm:right-[32px]   sm:bottom-[32px] sm:z-20">
          <div className="swiper-navigation swp-navigation-one relative ">
            <button type="button" className="navigation-btn-two btn-prev">
              <span className="size-40p flex-c rounded-full transition-1 icon-20">
                <IconChevronLeft size={20} />
              </span>
            </button>
            <button type="button" className="navigation-btn-two btn-next">
              <span className="size-40p flex-c rounded-full transition-1 icon-20">
                <IconChevronRight size={20} />
              </span>
            </button>
          </div>
        </div>
        <div className="swiper-pagination pagination-two flex-c gap-2.5 !bottom-10 sm:block hidden"></div>
      </div>
    </Swiper>
  );
};

export default HomeTwoBannerSlider;
