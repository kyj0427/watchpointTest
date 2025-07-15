"use client";

import { useToggle } from "@/hooks";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { marketplace } from "@public/data/marketplace";
import { IconChevronDown, IconCurling, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RatingStars from "../ui/RatingStars";

const OurStore = () => {
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
            Our Store
          </h2>
          <form className="shrink-0">
            <Listbox
              ref={filterRef}
              value={selectedFilter}
              onChange={setSelectedFilter}
              as="div"
              className="dropdown group"
            >
              <ListboxButton
                onClick={filterToggle}
                className="dropdown-toggle toggle-1"
              >
                {selectedFilter}
                <IconChevronDown
                  className={`${filterOpen && "rotate-180"} icon-24`}
                />
              </ListboxButton>
              <ListboxOptions className="dropdown-content">
                {filterTypes.map((item, idx) => (
                  <ListboxOption
                    className={`dropdown-item ${
                      selectedFilter === item && "active"
                    }`}
                    key={idx}
                    value={item}
                  >
                    {item}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </form>
        </div>
        <div className="mt-40p">
          <div
            className="swiper four-card-carousel"
            data-carousel-name="our-store-1"
          >
            <Swiper
              loop={true}
              slidesPerView={4}
              speed={500}
              autoplay={{
                delay: 1000,
                disableOnInteraction: true,
                pauseOnMouseEnter: false,
                reverseDirection: false,
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
              {marketplace?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full">
                    <div className="glitch-effect">
                      <div className="glitch-thumb">
                        <Image
                          className="w-full xxl:h-[310px] xl:h-[280px] md:h-[260px] h-[240px] object-cover"
                          src={item?.image}
                          alt="Fire Strikers"
                        />
                      </div>
                      <div className="glitch-thumb">
                        <Image
                          className="w-full xxl:h-[310px] xl:h-[280px] md:h-[260px] h-[240px] object-cover"
                          src={item?.image}
                          alt="Fire Strikers"
                        />
                      </div>
                    </div>
                    <div className="p-24p">
                      <Link
                        href={`/marketplace/${item?.id}`}
                        className="heading-3 link-1 line-clamp-1"
                      >
                        {item?.title}
                      </Link>
                      <div className="my-20p">
                        <div className="flex flex-wrap items-center justify-between gap-20p text-w-neutral-1">
                          <span className="text-base text-w-neutral-1">
                            Reviews ({item?.reviews})
                          </span>
                          <div className="flex-y gap-2">
                            <span className="span text-s-medium text-w-neutral-1">
                              {item?.activeUsers}
                            </span>
                            <IconUser size={20} className="text-w-neutral-4" />
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-20p text-w-neutral-1 mb-20p">
                          <RatingStars rating={item?.rating} />
                          <div className="flex-y gap-2">
                            <span className="span text-s-medium">
                              {item?.status}
                            </span>
                            <IconCurling className="text-w-neutral-4" />
                          </div>
                        </div>
                        <span className="text-base text-w-neutral-1 mb-3">
                          Friends
                        </span>
                        <div className="flex items-center *:size-40p *:shrink-0 *:size-40p *:border *:border-white *:-ml-3 ml-3">
                          {item?.friends?.map((item, idx) => (
                            <Image
                              key={idx}
                              width={40}
                              height={40}
                              className="avatar"
                              src={item?.avatar}
                              alt={item?.name}
                            />
                          ))}
                          <span className="flex-c rounded-full bg-[#333333] text-s-medium text-w-neutral-1">
                            + 3
                          </span>
                        </div>
                      </div>
                      <span className="text-m-medium text-w-neutral-1 mb-2">
                        Network
                      </span>
                      <div className="flex items-center gap-1 icon-24 text-w-neutral-4">
                        <i className="ti ti-brand-windows"></i>
                        <i className="ti ti-apple"></i>
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
      </div>
    </section>
  );
};

export default OurStore;
