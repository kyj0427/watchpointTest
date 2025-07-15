"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { gameCategories } from "@public/data/gameCategories";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GameCategories = () => {
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
            Popular Categories
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
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            spaceBetween={24}
            centeredSlides={false}
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
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1800: {
                slidesPerView: 2,
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
            modules={[FreeMode, Autoplay, Navigation, Scrollbar]}
          >
            {gameCategories?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="swiper-slide">
                  <div className="w-full h-full bg-b-neutral-3 grid 4xl:grid-cols-2 grid-cols-1 gap-y-30p items-center rounded-24 overflow-hidden group">
                    <div className="overflow-hidden">
                      <Image
                        className="w-full xxl:h-[370px] lg:h-[340px] sm:h-[320px] h-[300px] object-cover object-top group-hover:scale-110 transition-1"
                        src={item?.image}
                        alt="img"
                      />
                    </div>
                    <div className="px-30p">
                      <Link
                        href="/games"
                        className="heading-3 text-w-neutral-1 link-1 line-clamp-1 mb-16p"
                      >
                        {item?.title}
                      </Link>
                      <div className="flex-y gap-3 mb-16p">
                        <span className="badge badge-lg badge-neutral-2 group-hover:badge-primary">
                          {item?.action}
                        </span>
                        <span className="badge badge-lg badge-neutral-2 group-hover:badge-secondary">
                          {item?.type}
                        </span>
                      </div>
                      <div className="pt-16p border-t border-w-neutral-4/20">
                        <p className="text-base text-w-neutral-3">
                          {item?.description}
                        </p>
                      </div>
                      <div className="flex-y gap-2.5 my-24p">
                        <span className="badge badge-secondary badge-circle size-3"></span>
                        <p className="text-base text-neutral-100">
                          {item?.views} Viewers
                        </p>
                      </div>
                      <Link
                        href="#"
                        className="btn btn-sm btn-neutral-2 flex group-hover:btn-primary"
                      >
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="flex items-center gap-28p pt-40p">
              <div className="swiper-navigation swp-navigation-one">
                <button type="button" className="navigation-btn-one btn-prev">
                  <i className="ti ti-chevron-left"></i>
                </button>
                <button type="button" className="navigation-btn-one btn-next">
                  <i className="ti ti-chevron-right"></i>
                </button>
              </div>
              <div className="swiper-scrollbar swiper-scrollbar-1"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GameCategories;
