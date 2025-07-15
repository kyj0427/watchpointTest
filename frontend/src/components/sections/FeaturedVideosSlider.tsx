"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import heroBanner11 from "@public/images/photos/heroBanner11.webp";
import heroBanner4 from "@public/images/photos/heroBanner4.webp";
import heroBanner5 from "@public/images/photos/heroBanner5.webp";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const FeaturedVideosSlider = () => {
  const featuredVideos = [
    {
      id: 1,
      image: heroBanner11,
      title: "The Legend of Zelda: Breath of the Wild",
      viewers: 430,
      lang: "English",
      category: "Strumming",
    },
    {
      id: 2,
      image: heroBanner4,
      title: "Fortnite - Hints to beat them all!",
      viewers: 270,
      lang: "English",
      category: "Strumming",
    },
    {
      id: 3,
      image: heroBanner5,
      title: "The Legend of Zelda: Breath of the Wild",
      viewers: 340,
      lang: "English",
      category: "Strumming",
    },
  ];

  return (
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
        nextEl: ".btn-next",
        prevEl: ".btn-prev",
      }}
      pagination={{
        clickable: true,
        el: ".swiper-pagination",
      }}
      modules={[Autoplay, Navigation, Pagination]}
      className="rounded-32"
    >
      {featuredVideos?.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="relative rounded-32 overflow-hidden w-full group">
            <Image
              className="w-full xl:h-[630px] md:h-[580px] sm:h-[500px] h-[420px] object-cover rounded-32 group-hover:scale-110 transition-1"
              src={item.image}
              alt="img"
            />
            <div className="overlay-6 p-40p flex flex-col items-start justify-between">
              <span className="badge badge-lg badge-primary">
                {item.viewers} Viewers
              </span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link
                  href="/live-stream"
                  className="btn-c size-100p icon-40 bg-primary text-b-neutral-4"
                >
                  <i className="ti ti-player-play-filled"></i>
                </Link>
              </div>
              <div className="w-full">
                <h2 className="heading-2 text-w-neutral-1 line-clamp-1 p-1 mb-20p">
                  {item.title}
                </h2>
                <div className="flex-y gap-3 text-sm text-w-neutral-1">
                  <span className="px-24p py-3">{item.lang}</span>
                  <span className="px-24p py-3">{item.category}</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-navigation swp-navigation-one absolute top-0 right-0 z-[3] p-40p">
        <button type="button" className="navigation-btn-one btn-prev">
          <IconChevronLeft size={24} />
        </button>
        <button type="button" className="navigation-btn-one btn-next">
          <IconChevronRight size={24} />
        </button>
      </div>
    </Swiper>
  );
};

export default FeaturedVideosSlider;
