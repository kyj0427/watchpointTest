"use client";

import { useParams } from "next/navigation";
import HeroSkills from "./HeroSkills";
import { heroSkills } from "@public/data/heroSkills";
import HeroDetailsAside from "./HeroDetailsAside";
import { hero } from "@public/data/hero";
import Image from "next/image";
import Link from "next/link";

const HeroDetails = () => {  
  const params = useParams(); // URL params 얻기
  const heroKey = params?.heroKey || params?.id; // 라우팅 경로에 따라 id 또는 heroKey 등 다를 수 있음

  // hero 배열에서 key가 일치하는 영웅 찾기
  const heroDetails = hero.find((h) => h.key === heroKey);

  if (!heroDetails) {
    return <div>해당 영웅을 찾을 수 없습니다.</div>;
  }

  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="3xl:col-span-4 xxl:col-span-5 col-span-12 relative">
            <div className="xxl:sticky xxl:top-30">
                  <aside className="xxl:sticky xxl:top-30">
                    <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:py-32p *:px-40p xxl:max-h-screen xxl:overflow-y-auto scrollbar-sm">
                      <HeroDetailsAside/>     
                    </div>
                  </aside>    
            </div>
          </div>
          <div className="3xl:col-span-8 xxl:col-span-7 col-span-12">
            <div className="relative">
              <div className="glitch-effect mb-24p overflow-hidden rounded-12">
                <div className="glitch-thumb">
                   <Image
                    className="w-full xl:h-[450px] md:h-[400px] sm:h-[300px] h-[280px] object-cover" 
                    src={heroDetails?.image} 
                    width={1080}
                    height={480}
                    alt={heroDetails?.name}
                  /> 
                 
                </div>
                {<div className="glitch-thumb">
                  <Image
                    className="w-full xl:h-[450px] md:h-[400px] sm:h-[300px] h-[280px] object-cover" 
                    src={heroDetails?.image} 
                    width={1080}
                    height={480}
                    alt={heroDetails?.name}
                  />
                </div> }
              </div>
              <div className="heroNameGroup">
                <h3 className="heading-2 text-w-neutral-1 mb-2.5">
                 {heroDetails?.name}
                </h3>
                <p className="heading-4 text-m-regular text-w-neutral-4 mb-2.5">
                 오버워치 창립자 중 한 명인 아나는 탁월한 전투 능력과 노련함으로 고향과 자신에게 가장 소중한 이들을 지킵니다.
                </p>
              </div>
              <div>
                {/* <h3 className="heading-3 text-w-neutral-1 mb-2.5">
                 {heroDetails?.name}
                </h3>
                <p className="text-m-regular text-w-neutral-4 mb-2.5">
                 오버워치 창립자 중 한 명인 아나는 탁월한 전투 능력과 노련함으로 고향과 자신에게 가장 소중한 이들을 지킵니다.
                </p> */}
                
                <div className="flex items-center flex-wrap gap-y-24p gap-x-60p mt-24p mb-24p">
                  <div>
                    <span className="text-m-medium text-primary mb-1">
                      Role
                    </span>
                    <p className="text-sm text-w-neutral-4">
                      {heroDetails?.role}
                    </p>
                  </div>
                  <div>
                    <span className="text-m-medium text-primary mb-1">
                      Location
                    </span>
                    <p className="text-sm text-w-neutral-4">
                      이집트, 카이로
                      {heroDetails?.location}
                    </p>
                  </div>
                  <div>
                    <span className="text-m-medium text-primary mb-1">Birth</span>
                    <p className="text-sm text-w-neutral-4">1월 1일 (나이: 62) {heroDetails?.birthday}</p>
                  </div>
                </div>      
                <div className="mb-10p">
                  <div>
                    <span className="text-m-medium text-primary mb-1">
                      Skills
                    </span>
                    <p className="text-sm text-w-neutral-4">
                     
                    </p>
                  </div>
                </div>         
                <div className="grid grid-cols-1 border-y border-shap divide-y divide-shap">
                  <HeroSkills faqItems={heroSkills} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDetails;
