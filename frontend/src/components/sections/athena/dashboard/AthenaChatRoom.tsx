"use client";

import { topTrendingGames } from "@public/data/topTrending";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimateHeight from "react-animate-height";
import VideoPlayer from "@/lib/plyr/VideoPlayer";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { userVideosData } from "@public/data/athenaVideos";
import AthenaAIChat from "./AthenaAIChat";


const AthenaChatRoom = () => {

  const {user} = useAuth();
  const params = useParams();
  const videoId = params.videoId as string;

  // 동영상 데이터 찾기
  const video = user && userVideosData[user.id]?.videos.find(v => v.id === videoId);

  const thumbsSwiperRef = useRef(null);

  // Define a type for the thumbsSwiper instance
  type ThumbsSwiperType = any | null;

  // Default initial state
  const defaultThumbsSwiper: ThumbsSwiperType = null;

  // Use the defined type for thumbsSwiper
  const [thumbsSwiper, setThumbsSwiper] =
    useState<ThumbsSwiperType>(defaultThumbsSwiper);

  // function to handle Swiper instance
  const handleSwiper = (swiper: ThumbsSwiperType) => {
    // store the Swiper instance in state
    setThumbsSwiper(swiper);
  };

  const [toggle, setToggle] = useState<boolean | null>(false);

  const handleMessageSend = (message: string) => {
    // 실제 AI API 호출 
    console.log("메시지 전송:", message);
  };

  return (
    <section className="pt-40 relative overflow-visible">
      <div className="container">
        <div className="flex justify-between items-center mb-24p">
          <h4 className="heading-4 text-w-neutral-1"> 
            {video ? video.title : "동영상을 찾을 수 없습니다"}
          </h4>
          <Link 
            href="/coaching/athena/library" 
            className="btn btn-md btn-outline-primary rounded-12 flex items-center gap-2 hover:bg-primary hover:text-b-neutral-4 transition-colors"
          >
            <i className="ti ti-arrow-left icon-20"></i>
            목록으로 돌아가기
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-24p">
          <div className="xxl:col-span-8 xl:col-span-7 col-span-12 relative">
            <div className="xl:sticky xl:top-30">
              <div className="mb-30p">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  speed={800}
                  loop={false}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  pagination={{
                    el: ".thumbs-gallery-pagination",
                    clickable: true,
                  }}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[Navigation, Pagination, Thumbs]}
                  className="swiper thumbs-gallery-main"
                >
                  {video ? (
                    <SwiperSlide                      
                      className="rounded-12 overflow-hidden"
                    >
                      <div className="w-full">
                        <div className="relative ">
                          <span className="absolute sm:left-5 left-2 sm:top-5 top-2 badge badge-smm badge-primary font-normal z-[4]">
                            {video.hero} - {video.map}
                          </span>
                          
                            <VideoPlayer
                              // posterSrc={video.thumbnail}
                              videoSrc={video.file_path}                              
                            />
                          
                        </div>
                      </div>
                    </SwiperSlide>
                  ) : (
                    // 비디오 찾을수없을떄 화면
                    <SwiperSlide className="rounded-12 overflow-hidden">
                      <div className="w-full">
                        <div className="relative bg-b-neutral-3 h-96 flex items-center justify-center">
                          <div className="text-center">
                            <i className="ti ti-video-off icon-48 text-w-neutral-4 mb-16p"></i>
                            <p className="text-w-neutral-4">동영상을 찾을 수 없습니다</p>
                            <p className="text-sm text-w-neutral-5 mt-8p">요청하신 동영상이 존재하지 않거나 삭제되었습니다.</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                }
                </Swiper>
                
              </div>
              <div>
                <h4 className="heading-4 text-w-neutral-1 mb-16p">
                  동영상 정보
                </h4>
                <div className="grid grid-cols-1 gap-16p">
                  <div className="flex-y gap-3 text-m-regular text-w-neutral-3">
                    <span className="badge badge-compact badge-glass">
                      {video?.hero || '영웅'}
                    </span>
                    <span className="badge badge-compact badge-glass">
                      {video?.map || '맵'}
                    </span>
                    <span className="badge badge-compact badge-glass">
                      {video?.rank || '랭크'}
                    </span>
                  </div>
                  <p className="text-m-regular text-w-neutral-3">
                    {video?.description || '동영상 설명이 없습니다.'}
                  </p>
                  {video?.analysis && (
                    <div className="grid grid-cols-2 gap-16p">
                      <div className="text-center p-16p bg-b-neutral-3 rounded-12">
                        <p className="text-xs text-w-neutral-4 mb-8p">전체 점수</p>
                        <p className="text-xl font-bold text-primary">{video.analysis.overallScore}</p>
                      </div>
                      <div className="text-center p-16p bg-b-neutral-3 rounded-12">
                        <p className="text-xs text-w-neutral-4 mb-8p">포지셔닝</p>
                        <p className="text-xl font-bold text-primary">{video.analysis.positioning}</p>
                      </div>
                    </div>
                  )}
                  <AnimateHeight height={toggle ? "auto" : 0} duration={500}>
                    <div className="grid grid-cols-1 gap-16p">
                      <p className="text-m-regular text-w-neutral-3">
                        We&lsquo;re a diverse group of gamers, ranging from
                        casual players to hardcore enthusiasts, spanning various
                        platforms and genres. What unites us is our belief that
                        gaming is not just a pastime but an art form, a form of
                        storytelling, and a means of forging connections with
                        people from all walks of life
                      </p>
                      <p className="text-m-regular text-w-neutral-3">
                        As a result the villagers began invading one another,
                        which in turn led to an ultimate war. Wild Ninnekos are
                        born with to help the Ninnekos conquer the entire
                        forest, build new villages, and establish a strong
                        empire.
                      </p>
                    </div>
                  </AnimateHeight>
                </div>

                <button
                  onClick={() => setToggle(!toggle)}
                  className="inline-flex items-center text-base font-poppins font-semibold gap-2 mt-40p "
                >
                  {toggle ? "Show less" : "Show more"}
                  {toggle ? (
                    <i className="ti ti-chevron-down icon-24 transition-1"></i>
                  ) : (
                    <i className="ti ti-chevron-up icon-24 transition-1"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="xxl:col-span-4 xl:col-span-5 col-span-12 relative">
            <div className="xl:sticky xl:top-30">
              <AthenaAIChat
                videoId={videoId}
                chatHistory={video?.chatHistory || []}
                onMessageSend={handleMessageSend}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AthenaChatRoom;
