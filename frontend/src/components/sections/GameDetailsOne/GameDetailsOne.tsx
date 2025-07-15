"use client";

import { topTrendingGames } from "@public/data/topTrending";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useForm } from "react-hook-form";
import AnimateHeight from "react-animate-height";
import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user7 from "@public/images/users/user7.png";
import avatar7 from "@public/images/users/avatar7.png";
import bitcoin from "@public/images/photos/bitcoin.svg";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
} from "@tabler/icons-react";

interface MessageFormData {
  message: string;
}

const GameDetailsOne = () => {
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
      name: "David Malan",
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
    <section className="pt-60p overflow-visible">
      <div className="container">
        <h3 className="heading-3 text-w-neutral-1 mb-30p">Overview</h3>
        <div className="grid grid-cols-12 gap-x-24p gap-y-10">
          <div className="xxl:col-span-8 col-span-12">
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
                      <Image
                        className="w-full xxl:h-[480px] xl:h-[400px] md:h-[380px] sm:h-[320px] h-[280px] object-cover"
                        src={item?.video?.thumbnail}
                        alt="game"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="pt-30p">
                  <Swiper
                    watchSlidesProgress
                    onSwiper={handleSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    loop={topTrendingGames.length > 1}
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
                    {topTrendingGames?.map((item, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="overflow-hidden cursor-pointer rounded-16">
                          <Image
                            className="w-full xxl:h-[200px] lg:h-[160px] md:h-[140px] sm:h-25 h-18 object-cover hover:scale-110 transition-1"
                            width={350}
                            height={200}
                            src={item?.video?.thumbnail}
                            alt="game"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="pt-30p">
                <h4 className="heading-4 text-w-neutral-1 mb-16p">
                  About Game
                </h4>
                <div className="grid grid-cols-1 gap-16p">
                  <p className="text-m-regular text-w-neutral-3">
                    Our vision is to create a welcoming, inclusive, and
                    supportive environment where gamers of all backgrounds and
                    skill levels can come together. We believe in the power of
                    gaming to foster camaraderie, creativity, and personal
                    growth. Whether you&apos;re a solo player, a competitive
                    gamerstreamer, or a game developer, you have a place here.
                  </p>
                  <p className="text-m-regular text-w-neutral-3">
                    We&apos;re a diverse group of gamers, ranging from casual
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
                        We&apos;re a diverse group of gamers, ranging from
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
                  className="inline-flex items-center gap-2 mt-40p"
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

          <div className="xxl:col-span-4 col-span-12 relative">
            <div className="xxl:sticky xxl:top-30">
              <div className="p-40p rounded-12 bg-b-neutral-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Image className="avatar size-60p" src={avatar7} alt="user" />
                  <div>
                    <span className="text-xl-medium text-w-neutral-1 mb-1">
                      Meta Apes
                    </span>
                    <span className="text-m-regular text-w-neutral-4">
                      Status: Live
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-16p py-24p *:flex *:items-center *:justify-between *:flex-wrap *:gap-16p">
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Developer
                    </span>
                    <span className="text-m-medium text-w-neutral-1">
                      Meta Apes PTE
                    </span>
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Blockchain
                    </span>
                    <Image
                      className="size-5 rounded-full"
                      src={bitcoin}
                      width={20}
                      height={20}
                      alt="icon"
                    />
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Release date
                    </span>
                    <span className="text-m-medium text-w-neutral-1">
                      4 May, 2022
                    </span>
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Platform
                    </span>
                    <span className="text-m-medium text-w-neutral-1">
                      Android, iOS
                    </span>
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Genre
                    </span>
                    <span className="text-m-medium text-w-neutral-1">
                      Strategic role-playing game
                    </span>
                  </div>
                </div>
                <span className="text-m-medium text-w-neutral-1 mb-20p">
                  Community
                </span>
                <div className="flex items-center gap-3">
                  <Link href="#" className="btn-socal-primary">
                    <IconBrandFacebook />
                  </Link>
                  <Link href="#" className="btn-socal-primary">
                    <IconBrandTwitch />
                  </Link>
                  <Link href="#" className="btn-socal-primary">
                    <IconBrandInstagram />
                  </Link>
                  <Link href="#" className="btn-socal-primary">
                    <IconBrandDiscord />
                  </Link>
                  <Link href="#" className="btn-socal-primary">
                    <IconBrandYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameDetailsOne;
