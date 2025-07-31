"use client";

import { testimonials } from "@public/data/testimonials";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import RatingStars from "../ui/RatingStars";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Testimonials = () => {
  return (
    <div className="bg-b-neutral-3 rounded-12 px-32p py-24p">
      <h4 className="heading-4 text-w-neutral-1 mb-24p">Testimonials</h4>
      <div className="swiper one-card-carousel">
        <Swiper
          loop={true}
          slidesPerView={1}
          speed={1000}
          centeredSlides={false}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
            pauseOnMouseEnter: false,
          }}
          spaceBetween={24}
          navigation={{
            nextEl: `.carousel-next`,
            prevEl: `.carousel-prev`,
          }}
          pagination={{
            el: `.swiper-pagination`,
            clickable: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {testimonials?.map((item, idx) => (
            <SwiperSlide key={idx} className="pb-15">
              <div className="flex-col-c text-center">
                <RatingStars rating={item?.ratings} />
                <p className="text-base text-w-neutral-1 line-clamp-3 my-16p">
                  {item?.riview}
                </p>
                <Link href="#" className="text-l-medium text-w-neutral-1 mb-1">
                  {item?.author?.name}
                </Link>
                <span className="text-sm text-w-neutral-2 mb-3">
                  {item?.author?.role}
                </span>
                <Image
                  className="avatar size-60p"
                  src={item?.author?.avatar}
                  alt="user"
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination pagination-one flex-c gap-2.5"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
