"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, FreeMode, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { groups } from "@public/data/groups";
import { IconChevronDown, IconWorld } from "@tabler/icons-react";
import { Listbox } from "@headlessui/react";
import { useToggle } from "@/hooks";
import { useState } from "react";

const FavoritesGroups = () => {
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
            Our Favorites
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
            {groups?.slice(0, 8)?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full bg-b-neutral-3 grid 4xl:grid-cols-2 grid-cols-1 items-center rounded-24 overflow-hidden group">
                  <div className="overflow-hidden">
                    <Image
                      className="w-full 4xl:h-[370px] 3xl:h-[340px] xl:h-[320px] sm:h-[280px] h-[240px] object-cover object-top group-hover:scale-110 transition-1"
                      src={item?.image}
                      alt="Literature Lovers"
                    />
                  </div>
                  <div className="px-30p py-16p">
                    <Link
                      href="/group-home"
                      className="heading-3 text-w-neutral-1 link-1 line-clamp-1 mb-16p"
                    >
                      {item?.name}
                    </Link>
                    <span className="badge badge-neutral-2 group-hover:badge-secondary mb-24p">
                      <IconWorld size={24} />
                      {item?.category.toWellFormed()} Group
                    </span>
                    <div className="flex-y flex-wrap gap-x-60p gap-y-24p mb-20p">
                      <div>
                        <span className="text-lead-medium text-w-neutral-1 mb-1">
                          {item?.posts}
                        </span>
                        <span className="text-base text-w-neutral-3">
                          Posts
                        </span>
                      </div>
                      <div>
                        <span className="text-lead-medium text-w-neutral-1 mb-1">
                          {item?.members}
                        </span>
                        <span className="text-base text-w-neutral-3">
                          Members
                        </span>
                      </div>
                    </div>
                    <div className="flex-y gap-2 pt-20p mb-24p border-t border-w-neutral-4/20">
                      <i className="ti ti-alert-circle icon-20 text-w-neutral-3"></i>
                      <p className="text-base text-w-neutral-3">
                        Latest active {item?.lastActive}
                      </p>
                    </div>
                    <Link
                      href={`/groups/${item?.id}`}
                      className="btn btn-sm flex btn-neutral-2 group-hover:btn-primary"
                    >
                      Read More
                    </Link>
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

export default FavoritesGroups;
