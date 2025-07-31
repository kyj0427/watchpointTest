"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { tournaments } from "@public/data/tournaments";
import {
  IconArrowUpRight,
  IconChevronDown,
  IconUsersGroup,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const UpcomingTournaments = () => {
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
            Upcoming Tournaments
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
        <div className="mt-40p">
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
            {tournaments?.map((item, idx) => (
              <SwiperSlide key={idx} className="pb-15">
                <div
                  className="bg-b-neutral-3 rounded-12 group"
                  data-aos="zoom-in"
                >
                  <div className="relative px-20p pt-20p">
                    <div className="overflow-hidden rounded-12">
                      <Image
                        className="w-full sm:h-[270px] h-[220px] group-hover:scale-110 object-cover transition-1"
                        src={item?.image}
                        width={400}
                        height={270}
                        alt="game"
                      />
                    </div>
                    <span className="absolute left-10 -bottom-5 uppercase badge badge-xl badge-outline-primary text-m-medium">
                      {item?.game}
                    </span>
                  </div>
                  <div className="pt-48p pb-40p px-40p">
                    <span className="text-m-regular text-w-neutral-1 mb-3">
                      {item?.endDate}, {item?.endDate}
                    </span>
                    <Link
                      href={`/tournaments/${item?.id}`}
                      className="heading-3 text-w-neutral-2 line-clamp-1 link-1 mb-3"
                    >
                      {item?.title}
                    </Link>
                    <p className="text-m-regular text-w-neutral-4 line-clamp-2">
                      {item?.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-16p flex-wrap px-40p pt-24p pb-32p rounded-b-12 bg-b-neutral-2/20 border-t border-w-neutral-4/10">
                    <div className="flex-y gap-x-40p justify-between">
                      <div>
                        <span className="text-m-medium text-w-neutral-4 mb-3">
                          Prize Pool
                        </span>
                        <div className="flex items-center gap-3">
                          <i className="ti ti-badge-filled icon-24 text-secondary"></i>
                          <span className="text-xl-medium text-w-neutral-1">
                            ${item?.prizePool}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-m-medium text-w-neutral-4 mb-3">
                          Player Count
                        </span>
                        <div className="flex items-center gap-3">
                          <IconUsersGroup size={24} className="text-primary" />
                          <span className="text-xl-medium text-w-neutral-1">
                            {item?.playerCount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/tournaments/${item?.id}`}
                      className="btn-c btn-c-3xl btn-primary"
                    >
                      <IconArrowUpRight />
                    </Link>
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

export default UpcomingTournaments;
