"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import HeroSkills from "./HeroSkills";
// import { heroSkills } from "@public/data/heroSkills";
import HeroDetailsAside from "./HeroDetailsAside";

interface Hitpoints {
  health: number;
  armor: number;
  shields: number;
  total: number;
}

interface VideoLink {
  mp4: string;
  webm?: string;
}

interface Video {
  thumbnail: string;
  link: VideoLink;
}

interface Ability {
  name: string;
  description: string;
  icon: string;
  video?: Video;
}

interface StoryChapter {
  title: string;
  content: string;
  picture?: string;
}

interface Story {
  summary: string;
  media?: {
    type: string; // e.g. "video"
    link: string;
  };
  chapters: StoryChapter[];
}

interface HeroData {
  key?: string;
  name: string;
  description: string;
  portrait: string;
  role: string;
  location: string;
  age?: number;
  birthday?: string;
  hitpoints?: Hitpoints;
  abilities?: Ability[];
  story?: Story;
  image?: string;
}

const HeroDetails = () => {
  const params = useParams();
  const heroKey = params?.heroKey || params?.id;

  const [heroDetails, setHeroDetails] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!heroKey) return;

    setLoading(true);
    setError(null);

    // fetch 시 /public/data/heroes/폴더에 JSON파일 놓고, fetch 경로값에는 '/data/heroes/...'로 호출하세요
    fetch(`/data/heroes/${heroKey}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`영웅 데이터 로딩 실패: ${res.statusText}`);
        return res.json();
      })
      .then((data: HeroData) => {
        setHeroDetails(data);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [heroKey]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 dark:text-gray-400">
        로딩 중...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-600">
        오류가 발생했습니다: {error}
      </div>
    );

  if (!heroDetails)
    return (
      <div className="p-10 text-center text-gray-600">
        해당 영웅을 찾을 수 없습니다.
      </div>
    );

  // portrait가 없을 경우 image 사용, 없으면 기본 이미지
  const heroImage = heroDetails.portrait || heroDetails.image || "/default-hero.jpg";

  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-30p">
          <div className="3xl:col-span-4 xxl:col-span-5 col-span-12 relative">
            <aside className="xxl:sticky xxl:top-30">
              <div className="grid grid-cols-1 gap-30p bg-b-neutral-3 rounded-12 py-8 px-10 xxl:max-h-screen xxl:overflow-y-auto scrollbar-sm">
                <HeroDetailsAside />
              </div>
            </aside>
          </div>

          <div className="3xl:col-span-8 xxl:col-span-7 col-span-12">
            <div className="relative">
              {/* 비주얼 */}
              <div className="relative">
                 <div className="glitch-effect mb-24p overflow-hidden rounded-12">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="glitch-thumb">
                      <Image
                        src={`/images/game_hero/hero_portrait_bg/${heroKey}_heroImage_3.jpg`}
                        alt={heroDetails.name}
                        width={480}
                        height={480}
                        priority
                        className="w-full xl:h-[450px] md:h-[400px] sm:h-[300px] h-[280px] object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute left-16 top-20 z-10 w-1/2">
                  <h3 className="heading-2 text-w-neutral-1 mb-2.5">{heroDetails.name}</h3>
                  <p className="heading-4 text-m-regular text-w-neutral-4 mb-2.5">
                    {heroDetails.description}
                  </p>
                </div>
              </div>             

              <div className="flex flex-col-[64] gap-10 items-start bg-b-neutral-3 p-4 rounded">
                {/* portrait */}
                <div className="overflow-hidden rounded-24 w-64 h-64 mb-24p">
                    <Image
                      src={heroImage}
                      alt={heroDetails.name}
                      width={200}
                      height={200}
                      priority
                      className="w-full object-cover"
                    />
                </div>

                {/* 기본 정보 */}
                <div className="">
                  <div>
                    <h3 className="heading-4 text-w-neutral-1 mb-2.5">{heroDetails.name}</h3>
                  </div>   

                  <div>
                    <div className="flex gap-6 flex-wrap">
                      <span className="text-m-medium text-primary mb-1 block">role</span>
                      <p className="text-sm">{heroDetails.role}</p>
                    </div>  
                    <div className="flex gap-6 flex-wrap">
                      <span className="text-m-medium text-primary mb-1 block">티어리스트</span>
                      <p className="text-sm">#1</p>
                    </div>  
                    {/* <p className="heading-6 text-m-regular text-w-neutral-4 mb-2.5">
                      {heroDetails.description}
                    </p> */}
                  </div>               

                  {/* 상세 정보 */}
                  <div className="gap-6 text-w-neutral-4 mb-24p">                   
                     <div className="flex gap-6">
                      <span className="text-m-medium text-primary mb-1 block">Location</span>
                      <p className="text-sm">{heroDetails.location}</p>
                    </div>
                    {heroDetails.age !== undefined && (
                      <div className="flex gap-6">
                        <span className="text-m-medium text-primary mb-1 block">Age</span>
                        <p className="text-sm">{heroDetails.age}</p>
                      </div>
                    )}
                    {heroDetails.birthday && (
                      <div className="flex gap-6">
                        <span className="text-m-medium text-primary mb-1 block">Birthday</span>
                        <p className="text-sm">{heroDetails.birthday}</p>
                      </div>
                    )}
                  </div>
                 
                </div>

                {/* 특전추천*/}                 
                  <div className="mb-8 rounded p-4  border rounded p-4 bg-b-neutral-3">
                    <h4 className="text-left heading-6 mb-2.5 text-w-neutral-1">특전추천</h4>
                    <div className="grid grid-cols-2">
                      <div>
                        <div className="overflow-hidden w-10">
                          <Image
                            src={`//i.namu.wiki/i/TG8DYkgwjySi3084P4jjYuAgUPNbaOa3hkrtM3dV9szWSWhMsV5_CUSiIvlgJh4gz5qelXbEUjzmxgppD24SFw.webp`}
                            alt={`D.Va/토끼 파워`}
                            width={64}
                            height={64}
                            priority
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="overflow-hidden w-10">
                          <Image
                            src={`//i.namu.wiki/i/E5FDaMlQVi4HoeG8rCV53HNqrO9ChIlJW8nSoxwIoaGdCnqUmp1VddnWDkqeiVfXIGxYPRyfroUIOVVbufTbgg.webp`}
                            alt={`D.Va/확장 부스터`}
                            width={80}
                            height={80}
                            priority
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="overflow-hidden w-10">
                          <Image
                            src={`//i.namu.wiki/i/3bddzZRU11BitKM8Jq9VxDkx4muhAlrYfzANXvkEKlzXYHKgDWxeZxExQ8_hP3eIOaIxgZ62RDjfeQ-ORDC29A.webp`}
                            alt={`D.Va/중로켓`}
                            width={64}
                            height={64}
                            priority
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="overflow-hidden w-10">
                          <Image
                            src={`//i.namu.wiki/i/TG8DYkgwjySi3084P4jjYuAgUPNbaOa3hkrtM3dV9szWSWhMsV5_CUSiIvlgJh4gz5qelXbEUjzmxgppD24SFw.webp`}
                            alt={`D.Va/토끼 파워`}
                            width={64}
                            height={64}
                            priority
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                      
                  </div>    
              
              </div>      
              

              {/* Abilities */}
              {heroDetails.abilities && heroDetails.abilities.length > 0 && (
                <section className="mb-12 mt-12">
                  <h4 className="heading-4 mb-4 text-w-neutral-1">Abilities</h4>
                  <ul className="space-y-6">
                    {heroDetails.abilities.map((ability, idx) => (
                      <li key={idx} className="flex gap-4 items-start bg-b-neutral-3 p-4 rounded">
                        <img
                          src={ability.icon}
                          alt={ability.name}
                          className="w-12 h-12 object-contain"
                          loading="lazy"
                        />
                        <div>
                          <h5 className="text-m-medium text-w-neutral-1 mb-1">{ability.name}</h5>
                          <p className="text-sm text-w-neutral-4 mb-2">{ability.description}</p>
                          {ability.video?.link?.mp4 && (
                            <video
                              src={ability.video.link.mp4}
                              controls
                              className="w-full max-w-md rounded"
                              poster={ability.video.thumbnail}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Story */}
              {heroDetails.story && (
                <section>
                  <h4 className="heading-4 mb-4 text-w-neutral-1">Story</h4>
                  <p className="text-sm text-w-neutral-4 mb-6">{heroDetails.story.summary}</p>

                  {/* Story video */}
                  {heroDetails.story.media?.type === "video" && heroDetails.story.media.link && (
                    <div className="mb-6">
                      <iframe
                        width="560"
                        height="315"
                        src={heroDetails.story.media.link.replace("youtu.be", "youtube.com/embed")}
                        title={`${heroDetails.name} story video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 md:h-96 rounded"
                      />
                    </div>
                  )}

                  {/* Story chapters */}
                  {heroDetails.story.chapters.length > 0 && (
                    <div className="space-y-8">
                      {heroDetails.story.chapters.map((chapter, i) => (
                        <article key={i} className="border rounded p-4 bg-b-neutral-3">
                          <h5 className="heading-5 mb-2.5 text-w-neutral-1">{chapter.title}</h5>
                          <div className="mb-2 text-sm text-w-neutral-4">{chapter.content}</div>
                          {chapter.picture && (
                            <img
                              src={chapter.picture}
                              alt={chapter.title}
                              className="w-full rounded object-cover max-h-60"
                              loading="lazy"
                            />
                          )}
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Skills 컴포넌트 */}
              {/* <div className="mt-12">
                <HeroSkills faqItems={heroSkills} />
              </div> */}

              {/* 뒤로 가기 */}
              {/* <div className="mt-10">
                <Link href="/gameinfo/heroes" passHref>
                  <button className="text-primary underline bg-transparent border-none p-0 cursor-pointer">
                    뒤로 가기
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDetails;
