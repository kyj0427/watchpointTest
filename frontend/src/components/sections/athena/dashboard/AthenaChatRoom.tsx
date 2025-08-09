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
                  loop={topTrendingGames.length > 1}
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
                  {topTrendingGames?.map((item, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="rounded-12 overflow-hidden"
                    >
                      <div className="w-full">
                        <div className="relative ">
                          <span className="absolute sm:left-5 left-2 sm:top-5 top-2 badge badge-smm badge-danger font-normal z-[4]">
                            24K Watching
                          </span>
                          {item?.video.isLive && (
                            <VideoPlayer
                              posterSrc={item?.video?.thumbnail}
                              videoSrc={item?.video?.videoUrl}
                            />
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
              </div>
              <div>
                <h4 className="heading-4 text-w-neutral-1 mb-16p">
                  About Trending Game
                </h4>
                <div className="grid grid-cols-1 gap-16p">
                  <p className="text-m-regular text-w-neutral-3">
                    Our vision is to create a welcoming, inclusive, and
                    supportive environment where gamers of all backgrounds and
                    skill levels can come together. We believe in the power of
                    gaming to foster camaraderie, creativity, and personal
                    growth. Whether you&lsquo;re a solo player, a competitive
                    gamerstreamer, or a game developer, you have a place here.
                  </p>
                  <p className="text-m-regular text-w-neutral-3">
                    We&lsquo;re a diverse group of gamers, ranging from casual
                    players to hardcore enthusiasts, spanning various platforms
                    and genres. What unites us is our belief that gaming is not
                    just a pastime but an art form, a form of storytelling, and
                    a means of forging connections with people from all walks of
                    life
                  </p>
                  <p className="text-m-regular text-w-neutral-3">
                    As a result the villagers began invading one another, which
                    in turn led to an ultimate war. Wild Ninnekos are born with
                    to help the Ninnekos conquer the entire forest, build new
                    villages, and establish a strong empire.
                  </p>
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
