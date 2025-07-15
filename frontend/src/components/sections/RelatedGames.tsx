"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { games } from "@public/data/games";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RelatedGames = () => {
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
        <div className="flex items-center justify-between flex-wrap gap-24p mb-40p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Related Games
          </h2>
          <Listbox
            ref={filterRef}
            value={selectedFilter}
            onChange={setSelectedFilter}
            as="div"
            className="dropdown group shrink-0"
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
        </div>
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
          data-aos="fade-up"
        >
          {games?.slice(0, 8)?.map((item, idx) => (
            <SwiperSlide key={idx} className="pb-15">
              <div className="w-full bg-b-neutral-3 px-20p pt-20p pb-32p rounded-12">
                <div className="glitch-effect rounded-12 overflow-hidden mb-24p">
                  <div className="glitch-thumb">
                    <Image
                      className="w-full md:h-[228px] h-[200px] object-cover"
                      src={item?.photo}
                      width={400}
                      height={228}
                      alt="Power Play"
                    />
                  </div>
                  <div className="glitch-thumb">
                    <Image
                      className="w-full md:h-[228px] h-[200px] object-cover"
                      src={item?.photo}
                      width={400}
                      height={228}
                      alt="Power Play"
                    />
                  </div>
                </div>
                <div>
                  <Link
                    href="/game-details-one"
                    className="heading-4 text-w-neutral-1 link-1 line-clamp-1"
                  >
                    {item?.title}
                  </Link>
                  <p className="text-l-regular text-w-neutral-2">
                    {item?.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination pagination-one related-games-carousel-pagination flex-c gap-2.5"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default RelatedGames;
