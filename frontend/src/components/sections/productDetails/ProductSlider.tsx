"use client";

import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductSlider = ({
  photos,
}: {
  photos: StaticImageData[] | string[];
}) => {
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

  return (
    <>
      {/* <div
        className="thumbs-carousel-container"
        data-carousel-name="product-slider"
        data-slides-per-view="4"
        data-carousel-direction="vertical"
      >
        <div className="swiper !flex md:gap-30p gap-2.5 xl:h-[514px] sm:h-[400px] h-[300px]">
          <div className="shrink-0 sm:w-[110px] w-20  thumbs-gallery">
            <div className="swiper-wrapper *:!h-fit">
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-full sm:h-[114px] h-24  object-contain"
                    src="./assets/images/shop/product1.2.1.png"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-full sm:h-[114px] h-24  object-contain"
                    src="./assets/images/shop/product1.2.2.png"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-full sm:h-[114px] h-24  object-contain"
                    src="./assets/images/shop/product1.2.3.png"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-full sm:h-[114px] h-24  object-contain"
                    src="./assets/images/shop/product1.2.4.png"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-full sm:h-[114px] h-24  object-contain"
                    src="./assets/images/shop/product1.2.1.png"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-full sm:h-[114px] h-24  object-contain"
                    src="./assets/images/shop/product1.2.2.png"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-full sm:h-[114px] h-24  object-contain"
                    src="./assets/images/shop/product1.2.3.png"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                  <Image
                    className="w-[110px] h-[114px] object-coverer"
                    src="./assets/images/shop/product1.2.4.png"
                    alt="product"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="swiper thumbs-gallery-main">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.1.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.2.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.3.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.4.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.1.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.2.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.3.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                  <Image
                    className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                    src="./assets/images/shop/product1.4.webp"
                    alt="product"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="!flex md:gap-30p gap-2.5 xl:h-[514px] sm:h-[400px] h-[300px]">
        <Swiper
          //className="thumbs-gallery xxl:w-[572px] lg:w-[400px] md:w-[380px] xsm:w-[300px] w-full h-fit overflow-hidden"
          className="shrink-0 sm:w-[110px] w-20  thumbs-gallery"
          watchSlidesProgress
          onSwiper={handleSwiper}
          spaceBetween={10}
          slidesPerView={4}
          direction="vertical"
          loop={photos?.length > 1}
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
        >
          {photos?.map((item, idx) => (
            <SwiperSlide key={idx} className="w-full !h-fit">
              <div className="w-full cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                <Image
                  className="w-[114px] sm:h-[114px] h-24  object-contain"
                  src={item}
                  width={114}
                  height={114}
                  alt="product"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={photos?.length > 1}
          speed={800}
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
          className="thumbs-gallery-main"
          modules={[Navigation, Pagination, Thumbs]}
        >
          {photos?.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full h-full flex-c bg-b-neutral-3 p-32p rounded-12 overflow-hidden">
                <Image
                  className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                  src={item}
                  width={356}
                  height={356}
                  alt="product"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductSlider;
