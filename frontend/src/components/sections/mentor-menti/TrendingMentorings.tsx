"use client";

import RatingStars from "@/components/ui/RatingStars";
import { marketplace } from "@public/data/marketplace";
import { mentorings } from "@public/data/mentorings";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TrendingMentorings = ({ type }:{ type:string }) => {
    return (
        <section className="section-pt">
        <div className="container">
            <div className="flex items-center justify-between flex-wrap gap-24p">
                <h2 className="heading-2">가장 인기 있는 강의</h2>
                <Link
                    href="/coaching/mentor-menti/mentoring-lists/mentoring"
                    className="btn-primary flex-wrap items-center"
                >더보기</Link>
            </div>
            <div className="mt-40p">
            <Swiper
                loop={true}
                slidesPerView={4}
                speed={500}
                autoplay={{
                delay: 1000,
                disableOnInteraction: true,
                pauseOnMouseEnter: false,
                reverseDirection: true,
                }}
                spaceBetween={24}
                centeredSlides={false}
                breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 14,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1600: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                }}
                navigation={{
                nextEl: ".btn-next",
                prevEl: ".btn-prev",
                }}
                pagination={{
                clickable: true,
                el: ".swiper-pagination",
                }}
                scrollbar={{
                el: ".swiper-scrollbar",
                draggable: true,
                }}
                modules={[Autoplay, Navigation, Scrollbar]}
            >
                {mentorings?.map((item, idx) => (
                <SwiperSlide key={idx} className="swiper-slide">
                    <div
                    className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full "
                    data-aos="zoom-in"
                    >
                    <div className="overflow-hidden">
                        <span className="badge badge-neutral absolute top-3 left-3 z-[2]">
                        <i className="avatar avatar-primary size-3"></i>
                        <span className="text-s-regular text-w-neutral-1">
                            Heroes
                        </span>
                        </span>
                        <Image
                        src={item?.image}
                        width={640}
                        height={310}
                        className="w-full 3xl:h-[310px] xl:h-[280px] lg:h-[260px] h-[240px] object-cover object-top group-hover:scale-110 group-hover:rotate-2 transition-1"
                        alt="Playing Valorant"
                        />
                    </div>
                    <div className="p-28p">
                        <Link
                        href={`/coaching/mentor-menti/mentoring-lists/${type}/${item?.id}`}
                        className="heading-3 link-1 mb-2 line-clamp-1"
                        >
                        {item?.title}
                        </Link>
                        <p className="text-l-regular text-w-neutral-2">
                        Starting at $ <span className="span">{item?.price}</span>
                        </p>
                        <div className="flex-y gap-2 my-24p">
                        <RatingStars rating={item?.rating} />
                        <p className="text-base text-w-neutral-1">
                            {item?.rating} ({item?.reviews})
                        </p>
                        </div>
                        <div className="flex-y flex-wrap gap-3">
                        <Image
                            className="size-60p rounded-full shrink-0"
                            src={item?.author?.image}
                            width={60}
                            height={60}
                            alt="David Liu"
                        />
                        <div>
                            <Link
                            href="#"
                            className="flex-y gap-2 text-l-medium link-1 text-w-neutral-1 mb-1"
                            >
                            <span>{item?.author?.name}</span>
                            <IconCircleCheckFilled
                                size={24}
                                className="text-secondary"
                            />
                            </Link>
                            <span className="text-s-medium text-w-neutral-3">
                            {item?.author?.role}
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                </SwiperSlide>
                ))}
                <div className="flex items-center gap-28p pt-60p">
                <div className="swiper-navigation swp-navigation-one">
                    <button type="button" className="navigation-btn-one btn-prev">
                    <i className="ti ti-chevron-left"></i>
                    </button>
                    <button type="button" className="navigation-btn-one btn-next">
                    <i className="ti ti-chevron-right"></i>
                    </button>
                </div>
                <div className="swiper-scrollbar swiper-scrollbar-1"></div>
                </div>
            </Swiper>
            </div>
        </div>
        </section>
    );
};

export default TrendingMentorings;
