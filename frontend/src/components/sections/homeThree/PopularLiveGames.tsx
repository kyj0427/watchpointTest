"use client";

import Image from "next/image";
import Link from "next/link";
import { popularLiveGames } from "@public/data/popularLiveGames";
import {
  IconChevronDown,
  IconCircleCheckFilled,
  IconWifi,
} from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { useToggle } from "@/hooks";

const PopularLiveGames = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <section className="section-pt">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2">All Games</h2>
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
        <div className="mt-40p" data-aos="fade-up">
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
            navigation={{
              nextEl: ".btn-next",
              prevEl: ".btn-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            scrollbar={{
              el: ".swiper-scrollbar",
              draggable: true,
            }}
            modules={[Autoplay, Pagination]}
          >
            {popularLiveGames?.map((game, idx) => (
              <SwiperSlide className="pb-15" key={idx}>
                <div className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full p-20p pb-24p pt-20p">
                  <div className="relative overflow-hidden rounded-12">
                    <span className="absolute top-3 right-3 badge badge-xs badge-danger gap-1 z-10">
                      <IconWifi size={24} />
                      Live
                    </span>
                    <Image
                      src={game?.image}
                      className="w-full lg:h-[228px] md:h-[200px] h-[180px] object-cover object-top group-hover:scale-110 transition-1"
                      alt="img"
                    />
                  </div>
                  <div className="mt-20p">
                    <Link
                      href="/live-stream"
                      className="heading-4 link-1 mb-2 line-clamp-2"
                    >
                      {game?.title}
                    </Link>
                    <p className="text-l-regular text-w-neutral-2 mb-20p">
                      {game?.subtitle}
                    </p>
                    <div className="flex-y gap-3">
                      <Image
                        className="avatar size-60p shrink-0"
                        src={game?.userImage}
                        alt="user"
                      />
                      <div>
                        <Link href="/profile" className="flex-y gap-2 mb-1">
                          <span className="span text-l-medium text-w-neutral-1 link-1 line-clamp-1 whitespace-nowrap">
                            {game?.userName}
                          </span>
                          <IconCircleCheckFilled
                            size={24}
                            className="text-secondary icon-24"
                          />
                        </Link>
                        <span className="text-s-medium text-w-neutral-3">
                          {game?.subtitle}
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

export default PopularLiveGames;
