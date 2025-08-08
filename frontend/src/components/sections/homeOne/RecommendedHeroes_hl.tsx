"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
// 오버워치 히어로 데이터
const heroData = [
  {
    id: 1,
    name: "Genji",
    role: "DPS",
    image: "/images/game_hero/hero_portrait_bg/Genji_heroImage_2.jpg",
    description: "사이버 닌자로 빠르고 민첩한 공격을 구사합니다.",
  },
  {
    id: 2,
    name: "Mercy",
    role: "Support",
    image: "/images/game_hero/hero_portrait_bg/Mercy_heroImage_2.jpg",
    description: "천사로 팀을 치유하고 부활시킵니다.",
  },
  {
    id: 3,
    name: "Reinhardt",
    role: "Tank",
    image: "/images/game_hero/hero_portrait_bg/Reinhardt_heroImage_2.jpg",
    description: "방패의 기사로 팀을 보호합니다.",
  },
  {
    id: 4,
    name: "D.Va",
    role: "Tank",
    image: "/images/game_hero/hero_portrait_bg/D_Va_heroImage_2.jpg",
    description: "메카 파일럿으로 공격과 방어를 모두 수행합니다.",
  },
  {
    id: 5,
    name: "Reaper",
    role: "DPS",
    image: "/images/game_hero/hero_portrait_bg/Reaper_heroImage_2.jpg",
    description: "그림자 사신으로 근접 전투에 특화되어 있습니다.",
  },
  {
    id: 6,
    name: "Moira",
    role: "Support",
    image: "/images/game_hero/hero_portrait_bg/Moira_heroImage_2.jpg",
    description: "생명의 과학자로 힐링과 데미지를 조절합니다.",
  },
  {
    id: 7,
    name: "Bastion",
    role: "DPS",
    image: "/images/game_hero/hero_portrait_bg/Bastion_heroImage_2.jpg",
    description: "자동화된 전투 로봇으로 강력한 화력을 제공합니다.",
  },
  {
    id: 8,
    name: "Baptiste",
    role: "Support",
    image: "/images/game_hero/hero_portrait_bg/Baptiste_heroImage_2.jpg",
    description: "전직 탈론 요원으로 치유와 보호 능력을 갖고 있습니다.",
  },
];
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RecommendedHeroes = () => {
  const filterTypes = ["All", "DPS", "Tank", "Support"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  // 필터링 로직 추가
  const filteredHeroes = heroData.filter(hero => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "DPS") return hero.role === "DPS";
    if (selectedFilter === "Tank") return hero.role === "Tank";
    if (selectedFilter === "Support") return hero.role === "Support";
    return true;
  });

  // 필터링된 데이터가 4개 미만이면 자동회전 비활성화
  const shouldAutoplay = filteredHeroes.length >= 4;

  return (
    <section className="section-pt">
      <div className="container">
        <div
          className="flex items-center justify-between flex-wrap gap-24p"
          data-aos="fade-up"
        >
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            추천 영웅
          </h2>
          <Listbox
            ref={filterRef}
            value={selectedFilter}
            onChange={setSelectedFilter}
            as="div"
            className="dropdown group relative"
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
            <Listbox.Options className="dropdown-content absolute top-full right-0 z-50 min-w-[120px] bg-b-neutral-4 rounded-12 shadow-lg border border-b-neutral-3">
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
        <div className="mt-40p overflow-visible" data-aos="fade-up">
          <Swiper
            key={selectedFilter}
            loop={true}
            slidesPerView={4}
            speed={500}
            autoplay={shouldAutoplay ? {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              stopOnLastSlide: false,
            } : false}
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
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            modules={[Autoplay, Pagination]}
          >
            {filteredHeroes?.map((hero, idx) => (
              <SwiperSlide key={idx} className="pb-60p">
                <div className="swiper-slide">
                  <div className="w-full bg-b-neutral-3 px-20p pt-20p pb-32p rounded-12">
                    <div className="glitch-effect rounded-12 overflow-hidden mb-24p">
                      <div className="glitch-thumb">
                        <Image
                          className="w-full md:h-[228px] h-[200px] object-cover"
                          src={hero?.image}
                          width={400}
                          height={228}
                          alt={hero?.name}
                        />
                      </div>
                      <div className="glitch-thumb">
                        <Image
                          className="w-full md:h-[228px] h-[200px] object-cover"
                          src={hero?.image}
                          width={400}
                          height={228}
                          alt={hero?.name}
                        />
                      </div>
                    </div>
                    <div>
                      <Link
                        href="/game-details-one"
                        className="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-2"
                      >
                        {hero?.name}
                      </Link>
                      <p className="text-l-regular text-w-neutral-2 line-clamp-1">
                        {hero?.description}
                      </p>
                      <span className="badge badge-sm badge-primary mt-2">
                        {hero?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination pagination-one recent-games-one-carousel-pagination flex-c gap-2.5"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RecommendedHeroes;
