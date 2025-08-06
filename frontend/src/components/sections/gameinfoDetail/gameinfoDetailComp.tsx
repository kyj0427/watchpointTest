"use client";

import { GameInfoDetailData } from "@public/data/gameinfoDetailData";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user7 from "@public/images/users/user7.png";
import { useForm } from "react-hook-form";
import AnimateHeight from "react-animate-height";
import VideoPlayer from "@/lib/plyr/VideoPlayer";

interface MessageFormData {
  message: string;
}

const GameInfoDetailComp = () => {
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

  const { register, handleSubmit, reset } = useForm<MessageFormData>();
  const [toggle, setToggle] = useState<boolean | null>(false);

  const onSubmit = (data: MessageFormData) => {
    // Handle the form submission logic (e.g., API call)
    reset(); // Clear the form after submission
  };

  const messages = [
    {
      id: 1,
      name: "Blizzard Entertainment",
      time: "2m",
      avatar: user1,
      content: [
        { text: "Hey team,", icon: "ti ti-mood-nerd" },
        { text: "Avoid combat, watch the jungle", icon: "ti ti-dots-vertical" },
      ],
    },
    {
      id: 2,
      name: "Rolex Millar",
      time: "4m",
      avatar: user2,
      content: [
        {
          text: "As we wrap up our journey through the world of online gaming",
          icon: "ti ti-mood-nerd",
        },
      ],
    },
    {
      id: 3,
      name: "Sammi Esmit",
      time: "4m",
      avatar: user3,
      content: [{ text: "Great!" }],
    },
    {
      id: 4,
      name: "Adder son",
      time: "4m",
      avatar: user4,
      content: [{ text: "Our massage therapy has something for everyone." }],
    },
    {
      id: 5,
      name: "David Smith",
      time: "9m",
      avatar: user7,
      content: [
        { text: "Your comfort and well-being are of utmost importance to us." },
      ],
    },
  ];

  return (
    <section className="pt-60p relative overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-24p">
          <div className="xxl:col-span-8 xl:col-span-7 col-span-12 relative">
            <div className="xl:sticky xl:top-30">
              <div className="mb-30p">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  speed={800}
                  loop={GameInfoDetailData.length > 1}
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
                  {GameInfoDetailData?.map((item, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="rounded-12 overflow-hidden"
                    >
                      <div className="w-full">
                        <div className="relative ">
                          <span className="absolute sm:left-5 left-2 sm:top-5 top-2 badge badge-smm badge-danger font-normal z-[4]">
                              
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
                <div className="pt-30p">
                  <Swiper
                    watchSlidesProgress
                    onSwiper={handleSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    loop={GameInfoDetailData.length > 1}
                    speed={500}
                    freeMode={true}
                    breakpoints={{
                      768: {
                        spaceBetween: 20,
                      },
                      992: {
                        spaceBetween: 24,
                      },
                    }}
                    modules={[FreeMode, Thumbs]}
                    className="thumbs-gallery"
                  >
                    {GameInfoDetailData?.map((item, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="overflow-hidden cursor-pointer rounded-16">
                          <Image
                            className="w-full xxl:h-[200px] lg:h-[160px] md:h-[140px] sm:h-25 h-18 object-cover hover:scale-110 transition-1"
                            width={350}
                            height={200}
                            src={item?.video?.thumbnail}
                            alt="library"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div>
                <h4 className="heading-4 text-w-neutral-1 mb-16p">
                  새로운 정보
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
              <div className="border border-shap p-40p rounded-12">
                <div className="flex-y flex-wrap justify-between gap-24p pb-40p border-b border-shap">
                  <h4 className="heading-4 text-w-neutral-1">Live chat room</h4>
                  <Link href="/chat" className="icon-32 text-w-neutral-4">
                    <i className="ti ti-arrow-up-right"></i>
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-20p py-40p max-h-[540px] overflow-y-auto overflow-x-hidden scrollbar-sm">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-2">
                      <Image
                        className="size-48p shrink-0"
                        src={message.avatar}
                        alt={`${message.name} avatar`}
                        width={48}
                        height={48}
                      />
                      <div>
                        <div className="flex-y gap-2 mb-16p">
                          <Link
                            href="/profile.html"
                            className="text-m-medium text-w-neutral-1 link-1"
                          >
                            {message.name}
                          </Link>
                          <span className="text-xs !text-w-neutral-4">
                            {message.time}
                          </span>
                        </div>
                        <div className="inline-grid gap-y-1 *:inline-flex *:gap-2.5 *:items-center *:px-20p *:py-3 *:text-w-neutral-4 text-sm *:bg-glass-1 *:rounded-24 *:rounded-tl-none">
                          {message?.content?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5"
                            >
                              <p className="text-w-neutral-4">{item.text}</p>
                              {"icon" in item && (
                                <span className="icon-24">
                                  <i
                                    className={`${
                                      (item as { text: string; icon: string })
                                        .icon
                                    } text-w-neutral-4`}
                                  ></i>
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex-y justify-between gap-3 px-20p py-3 bg-b-neutral-3 rounded-24"
                >
                  <div className="flex items-center gap-3">
                    <button type="button" className="icon-24 text-w-neutral-4">
                      <i className="ti ti-mood-smile"></i>
                    </button>
                    <input
                      type="text"
                      className="bg-transparent text-sm text-w-neutral-1 placeholder:text-w-neutral-1 w-full"
                      placeholder="Send a message"
                      {...register("message", {
                        required: "Message is required",
                      })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-c-md btn-primary rounded-12"
                  >
                    <i className="ti ti-send icon-24"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameInfoDetailComp;
