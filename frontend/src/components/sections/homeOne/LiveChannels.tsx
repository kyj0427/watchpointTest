"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { channels } from "@public/data/channels";
import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LiveChannels = () => {
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
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Live Channels
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
            {channels?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full">
                  <div className="overflow-hidden">
                    <span className="badge badge-neutral absolute top-3 left-3 z-[2]">
                      <i className="avatar avatar-primary size-3"></i>
                      <span className="text-sm text-w-neutral-1">
                        1980 Online
                      </span>
                    </span>
                    <Image
                      src={item?.image}
                      className="w-full 3xl:h-[310px] xl:h-[280px] lg:h-[260px] h-[240px] object-cover object-top group-hover:scale-110 group-hover:rotate-2 transition-1"
                      alt="img"
                    />
                  </div>
                  <div className="p-28p">
                    <Link
                      href="/live-stream"
                      className="heading-3 text-w-neutral-1 link-1 mb-2 line-clamp-1"
                    >
                      {item?.title}
                    </Link>
                    <p className="text-l-regular text-w-neutral-2 mb-24p">
                      {item?.details}
                    </p>
                    <div className="flex-y flex-wrap gap-3">
                      <Image
                        className="size-60p rounded-full shrink-0"
                        src={item?.user?.avatar}
                        alt="user"
                      />
                      <div>
                        <Link
                          href={`/profile/${item?.user?.id}`}
                          className="flex-y gap-2 text-l-medium link-1 text-w-neutral-1 mb-1"
                        >
                          {item?.user?.name}
                          <IconCircleCheckFilled
                            size={24}
                            className="text-secondary"
                          />
                        </Link>
                        <span className="text-s-medium text-w-neutral-3">
                          {item?.user?.role}
                        </span>
                      </div>
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

export default LiveChannels;
