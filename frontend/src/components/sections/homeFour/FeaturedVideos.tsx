"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { IconChevronDown, IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FeaturedVideosSlider from "../FeaturedVideosSlider";
import game60 from "@public/images/games/game60.png";
import game61 from "@public/images/games/game61.png";

const featuredVideosData = [
  {
    id: 1,
    image: game60,
    title: "Turbo Drive Racing Rival",
    description: "Brace yourself for an immersive horror Whispering Shadows.",
    viewers: 270,
    tags: ["English", "Strumming"],
  },
  {
    id: 2,
    image: game61,
    title: "Rise the Eternal Realm",
    description: "Brace yourself for an immersive horror Whispering Shadows.",
    viewers: 360,
    tags: ["English", "Strumming"],
  },
];

const FeaturedVideos = () => {
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
            Featured Videos
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
          <div className="grid 3xl:grid-cols-2 grid-cols-1 gap-24p">
            <div data-aos="zoom-in">
              <FeaturedVideosSlider />
            </div>
            <div className="grid 3xl:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-24p">
              {featuredVideosData?.map((item, idx) => (
                <div
                  key={idx}
                  className="grid 3xl:grid-cols-2 grid-cols-1 gap-24p items-center p-20p bg-b-neutral-3 rounded-24 group"
                  data-aos="fade-up"
                >
                  <div className="relative w-full xl:h-[264px] sm:h-[240px] h-[220px] overflow-hidden rounded-20">
                    <Image
                      className="w-full xl:h-[264px] sm:h-[240px] h-[220px] group-hover:scale-110 object-cover rounded-20 transition-1"
                      src={item?.image}
                      alt="img"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Link
                        href="/live-stream"
                        className="btn-c btn-c-xxl bg-primary text-b-neutral-4"
                      >
                        <IconPlayerPlayFilled />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-lg badge-primary mb-24p">
                      {item?.viewers} Viewers
                    </span>
                    <Link
                      href="/game-details-one"
                      className="heading-3 text-w-neutral-1 link-1 line-clamp-1 text-split-left mb-3"
                    >
                      {item?.title}
                    </Link>
                    <p className="text-base text-w-neutral-3 mb-24p">
                      {item?.description}
                    </p>
                    <div className="flex-y flex-wrap gap-3">
                      {item?.tags?.map((item, idx) => (
                        <span
                          key={idx}
                          className="badge badge-lg badge-neutral-2"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
