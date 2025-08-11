"use client";

import RatingStars from "@/components/ui/RatingStars";
import { mentorings } from "@public/data/mentorings";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type Mentoring = {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    tags: string[];
    mentorinfo: {
        name: string;
        image: string;
        position: string;
        career: string[];
    };
};

const  MentoringForMentors= ({ type }:{ type:string }) => {
    return (
        <section className="section-pt">
        <div className="container">

            {/* selecting filter dropdown */}
            <div className="flex items-center justify-between flex-wrap gap-24p">
                <h2 className="heading-2">강의 목록</h2>
            </div>

            {/* swiper = slider */}
            <div className="mt-40p">
                {mentorings?.map((item, idx) => (
                // data from marketplace.ts => replace data from our db
                <div key={idx} className="swiper-slide">
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
                        href={`/coaching/mentoring-lists/${type}/${item?.id}`}
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
                            src={item?.mentorinfo?.image}
                            width={60}
                            height={60}
                            alt="David Liu"
                        />
                        <div>
                            <Link
                            href="#"
                            className="flex-y gap-2 text-l-medium link-1 text-w-neutral-1 mb-1"
                            >
                            <span>{item?.mentorinfo?.name}</span>
                            <IconCircleCheckFilled
                                size={24}
                                className="text-secondary"
                            />
                            </Link>
                            <span className="text-s-medium text-w-neutral-3">
                            {item?.mentorinfo?.position}
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                ))}
                <div className="flex items-center gap-28p pt-60p">
                <div className="swiper-scrollbar swiper-scrollbar-1"></div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default MentoringForMentors;
