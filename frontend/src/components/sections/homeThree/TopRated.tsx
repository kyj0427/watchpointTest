"use client";

import Image from "next/image";
import Link from "next/link";
import library1 from "@public/images/library/library1.png";
import library2 from "@public/images/library/library2.png";
import library4 from "@public/images/library/library4.png";
import library5 from "@public/images/library/library5.png";
import library6 from "@public/images/library/library6.png";
import library7 from "@public/images/library/library7.png";
import library8 from "@public/images/library/library8.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const lives = [
  {
    id: "1",
    image: library1,
    title: "Simulation Tycoon Urban Empire",
    date: "17 Jan 2023",
    rating: 5.4,
  },
  {
    id: "2",
    image: library7,
    title: "Enchanted Puzzle Adventures",
    date: "17 Jan 2023",
    rating: 5.4,
  },
  {
    id: "3",
    image: library8,
    title: "Whispering Shadows Haunting Nightmares",
    date: "17 Jan 2023",
    rating: 5.4,
  },
  {
    id: "4",
    image: library4,
    title: "The Legend of Zelda: Breath of the Wild",
    date: "24 Jan 2023",
    rating: 5.4,
  },
  {
    id: "5",
    image: library5,
    title: "Fortnite - Hints to beat them all!",
    date: "25 Jan 2023",
    rating: 5.4,
  },
  {
    id: "6",
    image: library6,
    title: "Overcooked 2",
    date: "27 Jan 2023",
    rating: 5.4,
  },
  {
    id: "7",
    image: library2,
    title: "The Last of Us Part II",
    date: "28 Jan 2023",
    rating: 5.4,
  },
];

const TopRated = () => {
  return (
    <section className="section-py">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Top Rated
          </h2>
          <Link href="/trending" className="btn btn-lg px-32p btn-neutral-2">
            View All
          </Link>
        </div>
        <div className="mt-40p">
          <Swiper
            loop={true}
            slidesPerView={3}
            speed={1000}
            centeredSlides={false}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
              pauseOnMouseEnter: false,
              reverseDirection: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 14,
              },
              576: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
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
          >
            {lives?.map((item, index) => (
              <SwiperSlide className="pb-15" key={index}>
                <div className="relative rounded-12 overflow-hidden w-full group">
                  <Image
                    className="w-full h-[300px] group-hover:scale-110 object-cover transition-1"
                    src={item.image}
                    alt="img"
                  />
                  <div className="overlay-6 p-20p flex flex-col items-start justify-between">
                    <span className="badge badge-compact badge-glass flex-y gap-1 text-w-neutral-1">
                      <i className="ti ti-star icon-24 text-primary"></i>
                      {item.rating}
                    </span>
                    <div className="w-full">
                      <Link
                        href="/live-stream"
                        className="library-title heading-4 link-1 mb-2"
                      >
                        {item.title}
                      </Link>
                      <span className="text-l-regular text-w-neutral-2 mb-20p">
                        {item.date}
                      </span>
                      <div className="flex-y justify-between gap-16p">
                        <Link
                          href="/live-stream"
                          className="btn btn-md btn-danger rounded-12"
                        >
                          Watch Now
                        </Link>
                        <button className="btn-c btn-c-lg btn-primary">
                          <i className="ti ti-plus"></i>
                        </button>
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

export default TopRated;
