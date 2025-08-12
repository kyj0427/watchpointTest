"use client";

import RatingStars from "@/components/ui/RatingStars";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type Mentoring = {
    id: number;
    title: string;
    description: string;
    category: string[];
    image: string;
    price: number;
    rating: number;
    reviews: number;
    // menteeUserIds: string[]
    mentorinfo: {
        name: string;
        image: string;
        position: string;
        career: string[];
    };
};


const Mentorings = ({ data, type }: { data: Mentoring[]; type: string }) => {

    return (
        <div>
        {/* 카드 리스트 */}
        <div className="grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p mt-60p">
            {data.map((item) => (
            <div key={item.id} className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full">
                <div className="overflow-hidden">
                <div className="absolute top-3 left-3 z-[2] flex gap-2 flex-wrap">
                {/* 카테고리 뱃지 */}
                {item.category?.map((cate, index) => (
                    <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium shadow-sm"
                    >
                    {cate}
                    </span>
                ))}
                </div>
                <Image
                    src={item.image}
                    width={400}
                    height={310}
                    className="w-full object-cover object-top group-hover:scale-110 group-hover:rotate-2 transition-1"
                    alt={item.title}
                />
                </div>
                <div className="p-28p">
                <Link href={`/coaching/mentoring-lists/${type}/${item.id}`} className="heading-3 link-1 mb-2 line-clamp-1">
                    {item.title}
                </Link>
                <p className="text-l-regular text-w-neutral-2">
                    요금 : <span className="span">{item.price}</span>원
                </p>
                <div className="flex-y gap-2 my-24p">
                    <RatingStars className="text-primary" rating={item.rating} />
                    <p className="text-base text-w-neutral-1">
                    {item.rating} ({item.reviews})
                    </p>
                </div>
                <div className="flex-y flex-wrap gap-3">
                    <Image className="size-60p rounded-full shrink-0" src={item.mentorinfo.image} width={20} height={20} alt={item.mentorinfo.name} />
                    <div>
                    <Link href="/profile" className="flex-y gap-2 text-l-medium link-1 text-w-neutral-1 mb-1">
                        <span>{item.mentorinfo.name}</span>
                        <IconCircleCheckFilled size={24} className="text-secondary" />
                    </Link>
                    <span className="text-s-medium text-w-neutral-3">{item.mentorinfo.position}</span>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Mentorings;