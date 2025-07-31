"use client";

import { homeThreeBannerData } from "@public/data/homeBannerData";
import { IconBrandApple, IconBrandWindows } from "@tabler/icons-react";
import Image from "next/image";
import heroBanner4 from "@public/images/photos/heroBanner4.webp";
import heroBanner10 from "@public/images/photos/heroBanner10.webp";
import heroBanner11 from "@public/images/photos/heroBanner11.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Autoplay, Pagination } from "swiper/modules";

const HomeBannerThree = () => {
  return (
    <section className="section-pt overflow-visible">
      <div className="container relative pt-[30px]">
        <div className="grid grid-cols-12 items-center gap-30p">
          <div className="xl:col-span-8 col-span-12">
            <div className="relative">
              <Swiper
                loop={true}
                slidesPerView={1}
                speed={1000}
                centeredSlides={false}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: false,
                  reverseDirection: true,
                }}
                spaceBetween={24}
                navigation={{
                  nextEl: `.btn-next`,
                  prevEl: `.btn-prev`,
                }}
                pagination={{
                  el: `.swiper-pagination`,
                  clickable: true,
                }}
                className="swiper one-card-carousel rounded-12"
                data-carousel-name="home-two-hero"
                modules={[Autoplay, Pagination]}
              >
                {homeThreeBannerData?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full rounded-16 overflow-hidden relative">
                      <Image
                        className="w-full lg:h-[506px] md:h-[440px] h-[380px] object-cover"
                        src={item?.image}
                        width={940}
                        height={506}
                        alt="product"
                      />
                      <div className="absolute inset-0 z-[2] p-30p">
                        <div className="relative h-full">
                          <div className="absolute top-0 flex items-center gap-3.5">
                            <span className="flex-c bg-secondary text-b-neutral-4 icon-24 size-40p rounded-full">
                              <IconBrandWindows size={24} />
                            </span>
                            <span className="flex-c bg-secondary text-b-neutral-4 icon-24 size-40p rounded-full">
                              <IconBrandApple size={24} />
                            </span>
                          </div>
                          <div className="absolute bottom-0 w-full">
                            <div className="text-center flex-c">
                              <h1
                                className="display-100 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-30p"
                                data-text={`${item?.title}`}
                              >
                                {item?.title}
                              </h1>
                            </div>
                            <div className=" flex items-center ml-3">
                              {item?.friends?.slice(0, 4).map((img, idx) => (
                                <Image
                                  key={idx}
                                  className="avatar size-40p shrink-0 border border-white -ml-3"
                                  width={40}
                                  height={40}
                                  src={img}
                                  alt="user"
                                />
                              ))}
                              <span className="badge badge-ssm badge-primary border-none !whitespace-nowrap text-base !w-fit z-[2]">
                                + 75 Friends
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overlay-1"></div>
                    </div>
                  </SwiperSlide>
                ))}
                <div>
                  <div className="swiper-pagination pagination-two home-two-hero-carousel-pagination items-center gap-2.5  pb-30p px-30p sm:flex justify-end hidden"></div>
                </div>
              </Swiper>
            </div>
          </div>

          <div className="xl:col-span-4 col-span-12">
            <PhotoProvider>
              <div className="grid grid-cols-4 gap-24p">
                <div className="col-span-4">
                  <PhotoView src={heroBanner4?.src}>
                    <div className="gallery-items relative rounded-32 overflow-hidden group">
                      <Image
                        className="w-full xl:h-[312px] md:h-[280px] h-[220px] group-hover:scale-110 object-cover transition-1"
                        src={heroBanner4}
                        width={800}
                        height={312}
                        alt="Gallery Image 1"
                      />
                      <div className="overlay-3"></div>
                    </div>
                  </PhotoView>
                </div>
                <div className="col-span-2">
                  <PhotoView src={heroBanner10?.src}>
                    <div className="gallery-items relative rounded-32 overflow-hidden group">
                      <Image
                        className="w-full md:h-[170px] h-[140px] group-hover:scale-110 object-cover transition-1"
                        src={heroBanner10}
                        width={400}
                        height={170}
                        alt="Gallery Image 2"
                      />
                      <div className="overlay-3"></div>
                    </div>
                  </PhotoView>
                </div>
                <div className="col-span-2">
                  <PhotoView src={heroBanner11?.src}>
                    <div className="gallery-items relative rounded-32 overflow-hidden group">
                      <Image
                        className="w-full md:h-[170px] h-[140px] group-hover:scale-110 object-cover transition-1"
                        src={heroBanner11}
                        width={400}
                        height={170}
                        alt="Gallery Image 5"
                      />
                      <div className="overlay-3"></div>
                      <div className="photo-counter">
                        <h4>+270</h4>
                        <h4>Photos</h4>
                      </div>
                    </div>
                  </PhotoView>
                </div>
              </div>
            </PhotoProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBannerThree;
