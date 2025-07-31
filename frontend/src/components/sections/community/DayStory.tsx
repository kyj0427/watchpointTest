"use client";

import Image from "next/image";
import story1 from "@public/images/stories/story1.png";
import story2 from "@public/images/stories/story2.png";
import story3 from "@public/images/games/game10.png";
import story4 from "@public/images/games/game11.png";
import story5 from "@public/images/games/game12.png";
import story6 from "@public/images/games/game13.png";
import { Swiper, SwiperSlide } from "swiper/react";

const DayStory = () => {
  const stories = [
    {
      id: 1,
      image: story1,
      title: "Marvin McKinney Controls for Life Support Services",
    },
    {
      id: 2,
      image: story2,
      title: "Cameron Williamson Controls for Life Support Services",
    },
    {
      id: 3,
      image: story3,
      title: "Game Center for the first time in the game",
    },
    {
      id: 4,
      image: story4,
      title: "Marvin McKinney Controls for Life Support Services",
    },
    {
      id: 5,
      image: story5,
      title: "Cameron Williamson Controls for Life Support Services",
    },
    {
      id: 6,
      image: story6,
      title: "Game Center for the first time in the game",
    },
  ];

  return (
    <div className="swiper-container">
      <Swiper
        loop={true}
        slidesPerView={3}
        spaceBetween={24}
        speed={1000}
        centeredSlides={false}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
        }}
        navigation={{
          nextEl: `.btn-next`,
          prevEl: `.btn-prev`,
        }}
      >
        {stories?.map((item, idx) => (
          <SwiperSlide key={idx} className="swiper-slide">
            <div className="relative w-full rounded-12 group">
              <div className="overflow-hidden rounded-12">
                <Image
                  className="w-full md:h-[300px] sm:h-[240px] xsm:h-[220px] h-[200px] object-cover group-hover:scale-110 transition-1"
                  src={item.image}
                  width={380}
                  height={380}
                  alt={item.title}
                />
                <span className="absolute top-4 left-4 flex-c size-6 rounded-full bg-accent-4 text-w-neutral-1">
                  {idx + 1}
                </span>
              </div>
              <div className="w-full absolute inset-0 flex flex-col justify-end z-[2] p-24p overlay-7">
                <div>
                  <h6 className="heading-6 text-w-neutral-1 line-clamp-2 max-w-[90px]">
                    {item.title}
                  </h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DayStory;
