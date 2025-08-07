"use client";

import { calculateDiscount } from "@/utility/calculateDiscount";
import { overwatchStoreData } from "@public/data/overwatchStoreData_hl";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const OverwatchStore = () => {
  return (
    <section className="section-pt">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-24p">
          <h2 className="heading-2 text-w-neutral-1 text-split-left">
            Overwatch2 상점
          </h2>
          {/* <Link
            href="/marketplace-two"
            className="btn btn-lg py-3 btn-neutral-2 shrink-0"
          >
            View All
          </Link> */}
        </div>
        <div className="mt-40p" data-aos="fade-up">
          <Swiper
            loop={true}
            slidesPerView={4}
            speed={500}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={16}
            centeredSlides={false}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              // 576: {
              //   slidesPerView: 2,
              //   spaceBetween: 20,
              // },
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              // 1400: {
              //   slidesPerView: 3,
              //   spaceBetween: 24,
              // },
              1600: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            modules={[Autoplay, Pagination]}
          >
            {/* 상점데이터 */}
            {overwatchStoreData?.slice(0,10).map((product, idx) => (
              <SwiperSlide className="pb-15" key={product.id}>
                <div className="w-full bg-b-neutral-3 rounded-12 group h-full">
                  <div className="overflow-hidden rounded-t-12">
                    <Image
                      className="w-full 4xl:h-[320px] xl:h-[280px] lg:h-[260px] sm:h-[220px] h-[200px] group-hover:scale-110 object-cover transition-1"
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="p-20p flex flex-col h-full">
                    {/* 상품명 , 링크연결 */}
                    <Link
                      href={product.link}
                      className="text-xl-medium sm:text-2xl text-w-neutral-1 link-1 line-clamp-2 mb-20p h-[60px] flex items-start"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.name}
                    </Link>
                    {/* 카테고리 */}
                    <div className="mb-20p">
                        <div className="text-sm text-w-neutral-3 block">
                          {product.category} {product.type && product.type.trim() !== "" && `| ${product.type}`}
                        </div>
                    </div>
                    {/* 가격 */}
                    <div className="flex justify-between items-start gap-20p h-[70px] sm:h-[70px] lg:h-[70px] flex-shrink-0">
                      {/* 할인율 있는 경우 */}
                      {product.discount_rate !== null && product.price ? (
                        <>
                          <div className="badge badge-md badge-neutral-2">
                            <div className="flex flex-col">
                              <span className="text-xl-medium text-w-neutral-1">
                                {Math.round(Number(calculateDiscount(parseFloat(product.price.replace(',', '')), parseInt(product.discount_rate || '0'))))} {product.currency}
                              </span>
                              <span className="text-sm text-w-neutral-4 line-through">
                                {product.price} {product.currency}
                              </span>
                            </div>
                          </div>
                          <span className="badge badge-sm badge-primary text-md">
                            {product.discount_rate}% OFF
                          </span>
                        </>
                      ) : (
                        <>
                        {/* 할인율 없는 경우 */}
                          <div className="badge badge-md badge-neutral-2">
                            <span className="text-xl-medium text-w-neutral-1">
                              {product.price || null} {product.currency}
                            </span>
                          </div>
                          <div className="badge badge-sm badge-primary text-xs invisible">
                            &nbsp;
                          </div>
                        </>
                      )}
                    </div>
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination pagination-one flex-c gap-2.5"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OverwatchStore;
