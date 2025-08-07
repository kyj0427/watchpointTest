"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { GameInfoDetailData } from "@public/data/gameinfoDetailData";
import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GameInfoSlide = ({ className }: { className?: string }) => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <section className={`section-pt ${className && className}`}>
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            새로운 정보
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
        <div className="mt-40p" data-aos="fade-up">
          <Swiper
            loop={true}
            speed={1000}
            autoplay={{
              delay: 1000,
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
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            scrollbar={{
              el: ".swiper-scrollbar",
              draggable: true,
            }}
            modules={[FreeMode, Autoplay, Pagination]}
          >
            {GameInfoDetailData?.map((item, idx) => (
              <SwiperSlide key={idx} className="pb-60p">
                <div className="w-full bg-b-neutral-3 p-24p rounded-24 grid 4xl:grid-cols-2 grid-cols-1 items-center gap-24p group">
                  <div className="overflow-hidden rounded-24">
                    <Image
                      className="w-full xxl:h-[304px] xl:h-[280px] md:h-[260px] h-[240px] object-cover group-hover:scale-110 transition-1"
                      src={item?.photo}
                      width={304}
                      height={280}
                      alt="img"
                    />
                  </div>
                  <div>
                    <div className="flex-y flex-wrap gap-2">
                      <span className="badge badge-neutral-2 badge-smm">
                        {item?.genres[0]}
                      </span>
                      <span className="badge badge-danger badge-smm">Live</span>
                      <span className="badge badge-neutral-2 badge-smm">
                        {item?.category}
                      </span>
                    </div>
                    <Link
                      href="/live-stream"
                      className="heading-3 text-w-neutral-1 4xl:line-clamp-2 line-clamp-1 link-1 my-16p"
                    >
                      {item?.title}
                    </Link>
                    <div className="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
                      <div className="flex-y gap-2.5">
                        <span className="badge badge-secondary size-3 badge-circle"></span>
                        <p className="text-base text-neutral-100">
                          <span className="span">{item?.views}</span> Viewers
                        </p>
                      </div>
                      <div className="flex-y gap-2.5">
                        <span className="badge badge-primary size-3 badge-circle"></span>
                        <p className="text-base text-neutral-100">
                          <span className="span">{item?.publish}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex-y flex-wrap gap-3">
                      <Image
                        className="size-60p rounded-full shrink-0"
                        src={item?.author.avatar}
                        alt="user"
                        width={48}
                        height={48}
                      />
                      <div>
                        <Link
                          href="/profile"
                          className="text-l-medium flex-y gap-2 link-1 text-w-neutral-1"
                        >
                          {item?.author?.name}
                          <IconCircleCheckFilled
                            size={24}
                            className="text-secondary"
                          />
                        </Link>
                        <span className="text-s-medium text-w-neutral-4">
                          {item?.author?.role}
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

export default GameInfoSlide;
