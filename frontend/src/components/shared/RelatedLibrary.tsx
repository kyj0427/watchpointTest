"use client";

import { library } from "@public/data/library";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useToggle } from "@/hooks";

const RelatedLibrary = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  const {
    open: dropdownOpen,
    handleToggle: dropdownToggle,
    ref: dropdownRef,
  } = useToggle();

  return (
    <section className="section-py">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p mb-40p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Related Library
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
        <Swiper
          loop={true}
          slidesPerView={3}
          speed={1000}
          centeredSlides={false}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
            pauseOnMouseEnter: false,
            reverseDirection: false,
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
          pagination={{
            el: `.swiper-pagination`,
            clickable: true,
          }}
          scrollbar={{
            el: `.swiper-scrollbar`,
            draggable: true,
          }}
          modules={[Pagination, Scrollbar, Autoplay]}
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
                    <div ref={dropdownRef} className="dropdown">
                      <button
                        onClick={dropdownToggle}
                        className="dropdown-toggle btn-c btn-c-md btn-primary"
                      >
                        <i className="ti ti-dots-vertical icon-24"></i>
                      </button>
                      {dropdownOpen && (
                        <ul className="dropdown-content focus:outline-none">
                          <li className="dropdown-item">Report</li>
                          <li className="dropdown-item">Hide</li>
                        </ul>
                      )}
                    </div>
                  </div>
                  <div>
                    <Link
                      href={`/library/${item?.id}`}
                      className="heading-4 text-w-neutral-1 line-clamp-1 mb-1 link-1"
                    >
                      {item?.title}
                    </Link>
                    <div className="flex-y gap-3 text-l-regular text-w-neutral-2">
                      <span>{item?.type}</span>
                      <span className="badge badge-circle badge-dot badge-light size-1"></span>
                      <span>{item?.publish}</span>
                    </div>
                  </div>
                </div>
                <Image
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-1"
                  width={530}
                  height={300}
                  src={item?.photo}
                  alt="library"
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination pagination-one related-lib-trending-carousel-pagination flex-c gap-2.5"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default RelatedLibrary;
