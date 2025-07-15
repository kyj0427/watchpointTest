"use client";

import AccordionOne from "@/components/ui/AccordionOne";
import { faqItemsTwo } from "@public/data/faqItems";
import { library } from "@public/data/library";
import { topTrendingGames } from "@public/data/topTrending";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LibraryDetails = () => {
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

  const libraryDetails = library[0];

  return (
    <section className="pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-24p gap-y-10">
          <div className="xxl:col-span-8 col-span-12">
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
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Navigation, Pagination, Thumbs]}
              className="swiper thumbs-gallery-main"
            >
              {libraryDetails?.images?.map((img, idx) => (
                <SwiperSlide
                  key={idx}
                  className="swiper-slide rounded-12 overflow-hidden"
                >
                  <Image
                    className="w-full xxl:h-[480px] xl:h-[400px] md:h-[380px] sm:h-[320px] h-[280px] object-cover"
                    width={1200}
                    height={480}
                    src={img}
                    alt="library"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="py-30p">
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
                {libraryDetails?.images?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="overflow-hidden cursor-pointer rounded-16">
                      <Image
                        className="w-full xxl:h-[200px] lg:h-[160px] md:h-[140px] sm:h-25 h-18 object-cover hover:scale-110 transition-1"
                        width={400}
                        height={200}
                        src={img}
                        alt="library"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div>
              <div data-aos="fade-up">
                <h3 className="heading-3 text-w-neutral-1 mb-2.5">
                  Description
                </h3>
                <p className="text-m-regular text-w-neutral-4 mb-2.5">
                  We&lsquo;re a diverse group of gamers, ranging from casual
                  players to hardcore enthusiasts, spanning various platforms
                  and genres. What unites us is our belief that gaming is not
                  just a pastime but an art form, a form of storytelling, and a
                  means of forging connections with people from all walks of
                  life.
                </p>
                <p className="text-m-regular text-w-neutral-4">
                  We invite you to become a part of our gaming community. Share
                  your stories, insights, and experiences. Engage with others
                  who are as passionate about gaming as you are.of virtual
                  adventures and make lasting memories.
                </p>
                <div className="flex items-center flex-wrap gap-y-24p gap-x-60p mt-24p">
                  <div>
                    <span className="text-base text-primary mb-1">Game</span>
                    <p className="text-sm text-w-neutral-4">
                      League of Legends
                    </p>
                  </div>
                  <div>
                    <span className="text-base text-primary mb-1">
                      Languages
                    </span>
                    <p className="text-sm text-w-neutral-4">
                      English, Romanian and French
                    </p>
                  </div>
                  <div>
                    <span className="text-base text-primary mb-1">ADC</span>
                    <p className="text-sm text-w-neutral-4">Valid D2003</p>
                  </div>
                </div>
              </div>
              <div className="py-40p" data-aos="fade-up">
                <h4 className="heading-4 text-w-neutral-1">Seller</h4>
                <div className="flex items-center gap-3 py-3">
                  <Image
                    className="avatar size-60p"
                    width={60}
                    height={60}
                    src={libraryDetails?.author?.avatar}
                    alt="user"
                  />
                  <div>
                    <span className="text-l-medium text-w-neutral-1 mb-1">
                      {libraryDetails?.author?.name}
                    </span>
                    <span className="text-sm text-w-neutral-4">
                      {libraryDetails?.author?.role}
                    </span>
                  </div>
                </div>
                <p className="text-m-regular text-w-neutral-4">
                  Been playing TFT since set 1, usually hitting Grandmaster
                  every set
                </p>
              </div>
              <div
                className="grid grid-cols-1 border-y border-shap divide-y divide-shap"
                data-aos="fade-up"
              >
                <AccordionOne faqItems={faqItemsTwo} />
              </div>
            </div>
          </div>
          <div className="xxl:col-span-4 col-span-12 relative">
            <div className="xxl:sticky xxl:top-30">
              <div className="p-40p rounded-12 bg-b-neutral-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Image
                    className="avatar size-60p"
                    width={60}
                    height={60}
                    src={libraryDetails?.photo}
                    alt="user"
                  />
                  <div>
                    <span className="text-xl-medium text-w-neutral-1 mb-1">
                      {libraryDetails?.name}
                    </span>
                    <span className="text-m-regular text-w-neutral-4">
                      Status: Live
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-16p py-24p *:flex *:items-center *:justify-between *:flex-wrap *:gap-16p border-b border-shap">
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Developer
                    </span>
                    <span className="text-m-medium text-w-neutral-1">
                      {libraryDetails?.author?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Blockchain
                    </span>
                    {libraryDetails?.blockchain && (
                      <Image
                        className="size-5 rounded-full"
                        width={20}
                        height={20}
                        src={libraryDetails?.blockchain?.icon}
                        alt="icon"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Release date
                    </span>
                    <span className="text-m-medium text-w-neutral-1">
                      {libraryDetails?.publish}
                    </span>
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Platform
                    </span>
                    <span className="text-m-medium text-w-neutral-1">
                      {libraryDetails?.platform?.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-m-regular text-w-neutral-4">
                      Genre
                    </span>
                    <span className="text-m-medium text-w-neutral-1 span">
                      {libraryDetails?.genres?.join(", ")}
                    </span>
                  </div>
                </div>
                <div className="pt-24p">
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
      </div>
    </section>
  );
};

export default LibraryDetails;
