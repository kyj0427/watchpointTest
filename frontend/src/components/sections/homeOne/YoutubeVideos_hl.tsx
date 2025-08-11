"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { IconChevronDown, IconPlayerPlayFilled, IconPlayerPauseFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import FeaturedVideosSlider from "../FeaturedVideosSlider";


// 임시 비디오 데이터 : Youtube API 연동 후 삭제 예정
const featuredVideosData = [
  {
    id: 1,
    videoSrc: "/images/game_hero/hero_abilities_video/Genji_video.webm",
    title: "Genji - 사이버 닌자 마스터",
    description: "Genji의 모든 스킬과 콤보를 완벽하게 마스터하는 방법을 배워보세요.",
    thumbnail: "/images/game_hero/hero_portrait_bg/Genji_heroImage_2.jpg",
    viewers: 270,
    tags: ["DPS", "Genji"],
    category: "DPS"
  },
  {
    id: 2,
    videoSrc: "/images/game_hero/hero_abilities_video/Mercy_video.webm", 
    title: "Mercy - 천사의 힐링",
    description: "Mercy로 팀을 완벽하게 지원하는 방법과 포지셔닝 팁을 공유합니다.",
    thumbnail: "/images/game_hero/hero_portrait_bg/Mercy_heroImage_2.jpg",
    viewers: 360,
    tags: ["Support", "Mercy"],
    category: "Support" 
  },
  {
    id: 3,
    videoSrc: "/images/game_hero/hero_abilities_video/Reinhardt_video.webm",
    title: "Reinhardt - 방패의 기사",
    description: "Reinhardt의 방어와 공격 타이밍을 완벽하게 조절하는 방법을 배워보세요.",
    thumbnail: "/images/game_hero/hero_portrait_bg/Reinhardt_heroImage_2.jpg",
    viewers: 420,
    tags: ["Tank", "Reinhardt"],
    category: "Tank"
  },
  {
    id: 4,
    videoSrc: "/images/game_hero/hero_abilities_video/D_Va_video.webm",
    title: "D.Va - 메카 파일럿",
    description: "D.Va의 공격성과 방어력을 균형있게 활용하는 전략을 공유합니다.",
    thumbnail: "/images/game_hero/hero_portrait_bg/D_Va_heroImage_2.jpg",
    viewers: 380,
    tags: ["Tank", "D.Va"],
    category: "Tank"
  },
  {
    id: 5,
    videoSrc: "/images/game_hero/hero_abilities_video/Reaper_video.webm",
    title: "Reaper - 그림자 사신",
    description: "Reaper의 근접 전투와 그림자 걸음 스킬을 활용한 플레이 방법을 배워보세요.",
    thumbnail: "/images/game_hero/hero_portrait_bg/Reaper_heroImage_2.jpg",
    viewers: 450,
    tags: ["DPS", "Reaper"],
    category: "DPS"
  },
  {
    id: 6,
    videoSrc: "/images/game_hero/hero_abilities_video/Moira_video.webm",
    title: "Moira - 생명의 과학자",
    description: "Moira의 힐링과 데미지를 균형있게 조절하는 고급 플레이 전략을 공유합니다.",
    thumbnail: "/images/game_hero/hero_portrait_bg/Moira_heroImage_2.jpg",
    viewers: 320,
    tags: ["Support", "Moira"],
    category: "Support"
  },
];

const YoutubeVideos = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  // 비디오 재생/일시정지 함수
  const playVideo = (videoId: number) => {
    const videoElement = videoRefs.current[videoId];
    
    if (!videoElement) return;

    // 다른 비디오 정지
    if (playingVideoId !== null && playingVideoId !== videoId) {
      const prevVideo = videoRefs.current[playingVideoId];
      if (prevVideo) {
        prevVideo.pause();
      }
    }

    // 현재 비디오 재생
    videoElement.play();
    setPlayingVideoId(videoId);
  };

  const pauseVideo = (videoId: number) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      videoElement.pause();
      setPlayingVideoId(null);
    }
  };

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
                  {/* 썸네일 */}
                  <Image
                    src={item?.thumbnail}
                    alt={item?.title}
                    width={400}
                    height={240}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-1 ${
                      playingVideoId === item.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  
                  {/* 비디오 (항상 렌더링하되 숨김) */}
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-1 ${
                      playingVideoId === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    poster={item?.thumbnail}
                    src={item?.videoSrc}
                    autoPlay={false}
                    muted
                    loop
                    playsInline
                    preload="none"
                    onEnded={() => setPlayingVideoId(null)}
                  />
                  
                  {/* 재생/일시정지 버튼 */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button
                      onClick={() => {
                        if (playingVideoId === item.id) {
                          pauseVideo(item.id);
                        } else {
                          playVideo(item.id);
                        }
                      }}
                      className="btn-c btn-c-xxl bg-primary text-b-neutral-4 hover:bg-primary/80 transition-colors"
                    >
                      {playingVideoId === item.id ? (
                        <IconPlayerPauseFilled />
                      ) : (
                        <IconPlayerPlayFilled />
                      )}
                    </button>
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
