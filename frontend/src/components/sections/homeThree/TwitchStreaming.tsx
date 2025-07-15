"use client";

import Image from "next/image";
import Link from "next/link";
import FeaturedVideosSlider from "../FeaturedVideosSlider";
import game50 from "@public/images/games/game50.png";
import game49 from "@public/images/games/game49.png";
import user5 from "@public/images/users/user5.png";
import user6 from "@public/images/users/user6.png";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
  IconChevronDown,
} from "@tabler/icons-react";
import { useState } from "react";
import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";

const TwitchStreaming = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  const twitchStreaming = [
    {
      id: "1",
      author: {
        name: "Malan Willam",
        avatar: user5,
        role: "Developer",
      },
      image: game50,
      title: "Odyssey through the Prism Realm",
      tags: ["Online", "Action", "Shooter", "Strategy", "PVP"],
      social: [
        { icon: <IconBrandTwitch />, link: "#" },
        { icon: <IconBrandInstagram />, link: "#" },
        { icon: <IconBrandDiscord />, link: "#" },
        { icon: <IconBrandYoutube />, link: "#" },
      ],
    },
    {
      id: "2",
      author: {
        name: "Alan Willam",
        avatar: user6,
        role: "Writer",
      },
      image: game49,
      title: "Odyssey through the Prism Realm",
      tags: ["Online", "Action", "Shooter", "Strategy", "PVP"],
      social: [
        { icon: <IconBrandTwitch />, link: "#" },
        { icon: <IconBrandInstagram />, link: "#" },
        { icon: <IconBrandDiscord />, link: "#" },
        { icon: <IconBrandYoutube />, link: "#" },
      ],
    },
  ];

  return (
    <section className="section-pt">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Twitch Streaming
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
          <div className="grid 3xl:grid-cols-2 grid-cols-1 gap-30p">
            <div>
              <FeaturedVideosSlider />
            </div>
            <div className="grid 3xl:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-24p">
              {twitchStreaming?.map((item, idx) => (
                <div
                  key={idx}
                  className="grid 3xl:grid-cols-2 grid-cols-1 gap-24p items-center p-20p bg-b-neutral-3 rounded-12 group"
                  data-aos="fade-up"
                >
                  <div className="w-full xl:h-[264px] sm:h-[240px] h-[220px] overflow-hidden rounded-12">
                    <Image
                      className="w-full xl:h-[264px] sm:h-[240px] h-[220px] group-hover:scale-110 object-cover rounded-12 transition-1"
                      src={item?.image}
                      alt="img"
                    />
                  </div>
                  <div>
                    <Link
                      href="/live-stream"
                      className="heading-3 text-w-neutral-1 link-1 line-clamp-2 text-split-left"
                    >
                      {item?.title}
                    </Link>
                    <div className="flex items-normal gap-3 my-20p">
                      <div className="shrink-0 relative h-[70px] w-fit">
                        <Image
                          className="avatar size-[60px]"
                          src={item?.author.avatar}
                          alt="user"
                        />
                        <span className="absolute md:-bottom-2 -bottom-0 left-1/2 -translate-x-1/2 badge px-2 py-1 badge-danger">
                          Live
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {item?.tags?.map((item, idx) => (
                          <span
                            key={idx}
                            className="badge badge-smm badge-neutral-2 font-normal"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 *:btn-socal-accent-4 *:rounded-full">
                      {item?.social?.map((item, idx) => (
                        <Link key={idx} href={item?.link}>
                          {item?.icon}
                        </Link>
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

export default TwitchStreaming;
