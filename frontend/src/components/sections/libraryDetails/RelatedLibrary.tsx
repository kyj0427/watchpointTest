"use client";

import { Tid } from "@/config/types";
import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { library } from "@public/data/library";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RelatedLibrary = () => {
  const [toggle, setToggle] = useState<Tid | null>(null);

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
            Related Library
          </h2>
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
        </div>
        <div
          className="swiper three-card-carousel"
          data-carousel-name="related-lib-trending"
        >
          <div className="swiper-wrapper pb-15"></div>
          <div className="swiper-pagination pagination-one related-lib-trending-carousel-pagination flex-c gap-2.5"></div>
          <Swiper
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            spaceBetween={24}
            centeredSlides={true}
            breakpoints={{
              1400: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              991: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 16,
                centeredSlides: false,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
                centeredSlides: false,
              },
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {library?.map((item, idx) => (
              <SwiperSlide key={idx} className="pb-15">
                <div className="library-card group" data-aos="fade-up">
                  <div className="flex flex-col justify-between h-full relative z-[2]">
                    <div className="flex-y justify-between flex-wrap gap-16p">
                      <span className="badge badge-compact badge-glass flex-y gap-1 text-w-neutral-1">
                        <i className="ti ti-star icon-24 text-primary"></i>
                        {item?.rating}
                      </span>
                      <div className="dropdown">
                        <button
                          onClick={() => setToggle(item?.id)}
                          className="dropdown-toggle w-fit btn-c btn-c-md btn-primary"
                        >
                          <i className="ti ti-dots-vertical icon-24"></i>
                        </button>
                        {toggle === item?.id && (
                          <div className="dropdown-content">
                            <button className="dropdown-item">Report</button>
                            <button className="dropdown-item">Hide</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Link
                        href="/library-details"
                        className="heading-4 text-w-neutral-1 line-clamp-1 mb-1 link-1"
                      >
                        {item?.title}
                      </Link>
                      <div className="flex-y gap-3 text-l-regular text-w-neutral-2">
                        <span>Video</span>
                        <span className="badge badge-circle badge-dot badge-light size-1"></span>
                        <span>{item?.publish}</span>
                      </div>
                    </div>
                  </div>
                  <Image
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-1"
                    src={item?.photo}
                    alt="library"
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination pagination-one related-lib-trending-carousel-pagination flex-c gap-2.5"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RelatedLibrary;
