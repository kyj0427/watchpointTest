"use client";

import { useToggle } from "@/hooks";
import { calculateDiscount } from "@/utility/calculateDiscount";
import { Listbox } from "@headlessui/react";
import { popularGames } from "@public/data/popularGames";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PopularGamesOne = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <section className="section-py">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Popular Games
          </h2>
          <form className="shrink-0">
            <Listbox
              ref={filterRef}
              value={selectedFilter}
              onChange={setSelectedFilter}
              as="div"
              className="dropdown group"
            >
              <Listbox.Button
                onClick={filterToggle}
                className="dropdown-toggle toggle-1"
              >
                {selectedFilter}
                <IconChevronDown
                  className={`${filterOpen && "rotate-180"} icon-24`}
                />
              </Listbox.Button>
              <Listbox.Options className="dropdown-content">
                {filterTypes.map((item, idx) => (
                  <Listbox.Option
                    className={`dropdown-item ${
                      selectedFilter === item && "active"
                    }`}
                    key={idx}
                    value={item}
                  >
                    {item}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </form>
        </div>
        <div className="mt-40p">
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
            {popularGames?.map((item, idx) => (
              <SwiperSlide key={idx} className="pb-60p">
                <div className="w-full bg-b-neutral-3 rounded-12 group">
                  <div className="relative px-20p pt-20p">
                    <div className="overflow-hidden rounded-12">
                      <Image
                        className="w-full 4xl:h-[300px] sm:h-[240px] h-[220px] group-hover:scale-110 object-cover transition-1"
                        src={item?.photo}
                        alt="Horror Survival"
                      />
                    </div>
                    <span className="absolute left-9 -bottom-5 uppercase badge badge-xl badge-outline-primary">
                      {item?.plan} Game
                    </span>
                  </div>
                  <div className="md:pt-[40px] pt-9 pb-24p px-32p">
                    <Link
                      href="/game-details-one"
                      className="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-20p"
                    >
                      {item?.title}
                    </Link>
                    <div className="flex-y flex-wrap gap-20p">
                      <span className="badge badge-md badge-primary text-base">
                        {item?.discountPercentage}% OFF
                      </span>
                      <div className="flex-y gap-4">
                        <span className="text-sm  text-w-neutral-4 line-through">
                          ${item?.price.toFixed(2)}
                        </span>
                        <span className="text-l-medium text-w-neutral-1">
                          $
                          {calculateDiscount(
                            item?.price,
                            item?.discountPercentage,
                            true
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination pagination-one popular-games-one-carousel-pagination flex-c gap-2.5"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularGamesOne;
