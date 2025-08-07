"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { IconChevronDown, IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FeaturedVideosSlider from "../FeaturedVideosSlider";



const featuredVideosData = [
  {
    id: 1,
    videoSrc: "/images/overwatch_hero_videos/Genji_video.webm",
    title: "Genji - 사이버 닌자 마스터",
    description: "Genji의 모든 스킬과 콤보를 완벽하게 마스터하는 방법을 배워보세요.",
    thumbnail: "/images/overwatch_hero_images/Genji_heroImage_1.jpg",
    viewers: 270,
    tags: ["DPS", "Genji"],
    category: "DPS"
  },
  {
    id: 2,
    videoSrc: "/images/overwatch_hero_videos/Mercy_video.webm", 
    title: "Mercy - 천사의 힐링",
    description: "Mercy로 팀을 완벽하게 지원하는 방법과 포지셔닝 팁을 공유합니다.",
    thumbnail: "/images/overwatch_hero_images/Mercy_heroImage_1.jpg",
    viewers: 360,
    tags: ["Support", "Mercy"],
    category: "Support" 
  },
  {
    id: 3,
    videoSrc: "/images/overwatch_hero_videos/Reinhardt_video.webm",
    title: "Reinhardt - 방패의 기사",
    description: "Reinhardt의 방어와 공격 타이밍을 완벽하게 조절하는 방법을 배워보세요.",
    thumbnail: "/images/overwatch_hero_images/Reinhardt_heroImage_1.jpg",
    viewers: 420,
    tags: ["Tank", "Reinhardt"],
    category: "Tank"
  },
  {
    id: 4,
    videoSrc: "/images/overwatch_hero_videos/D_Va_video.webm",
    title: "D.Va - 메카 파일럿",
    description: "D.Va의 공격성과 방어력을 균형있게 활용하는 전략을 공유합니다.",
    thumbnail: "/images/overwatch_hero_images/D_Va_heroImage_1.jpg",
    viewers: 380,
    tags: ["Tank", "D.Va"],
    category: "Tank"
  },
  {
    id: 5,
    videoSrc: "/images/overwatch_hero_videos/Reaper_video.webm",
    title: "Reaper - 그림자 사신",
    description: "Reaper의 근접 전투와 그림자 걸음 스킬을 활용한 플레이 방법을 배워보세요.",
    thumbnail: "/images/overwatch_hero_images/Reaper_heroImage_1.jpg",
    viewers: 450,
    tags: ["DPS", "Reaper"],
    category: "DPS"
  },
  {
    id: 6,
    videoSrc: "/images/overwatch_hero_videos/Moira_video.webm",
    title: "Moira - 생명의 과학자",
    description: "Moira의 힐링과 데미지를 균형있게 조절하는 고급 플레이 전략을 공유합니다.",
    thumbnail: "/images/overwatch_hero_images/Moira_heroImage_1.jpg",
    viewers: 320,
    tags: ["Support", "Moira"],
    category: "Support"
  },
];

const YoutubeVideos = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  // 필터링 로직 추가
  const filteredVideos = featuredVideosData.filter(video => {
    if (selectedFilter === "Popular") return true;
    if (selectedFilter === "Action") return video.category === "DPS";
    if (selectedFilter === "Adventure") return video.category === "Tank";
    if (selectedFilter === "Sports") return video.category === "Support";
    return true;
  });

  return (
    <section className="pt-8">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            추천 플레이 영상
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24p">
            {filteredVideos.map((item, idx) => (
                <div
                  key={idx}
                  className="p-20p bg-b-neutral-3 rounded-24 group"
                  data-aos="zoom-in"
                >
                  <div className="relative w-full h-[220px] overflow-hidden rounded-20 mb-4">
                    <video
                      className="w-full h-full object-cover group-hover:scale-110 transition-1"
                      poster={item?.thumbnail}
                      src={item?.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Link
                        href={item?.videoSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-c btn-c-xxl bg-primary text-b-neutral-4 hover:bg-primary/80 transition-colors"
                      >
                        <IconPlayerPlayFilled />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-lg badge-primary mb-24p">
                      {item?.viewers} Viewers
                    </span>
                    <h3 className="heading-3 text-w-neutral-1 line-clamp-1 mb-3">
                      {item?.title}
                    </h3>
                    <p className="text-base text-w-neutral-3 mb-24p">
                      {item?.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {item?.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="badge badge-lg badge-neutral-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
};

export default YoutubeVideos;
