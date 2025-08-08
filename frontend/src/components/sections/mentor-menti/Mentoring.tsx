"use client";

import RatingStars from "@/components/ui/RatingStars";
import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Mentoring = {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    author: {
        name: string;
        image: string;
        role: string;
    };
};


const positionCategory = ["dealer", "tank", "support"]

const filterTypes = ["Popular", "Recommended"];

const MentoringList = ({ data, type }: { data: Mentoring[]; type: string }) => {
    const [category, setCategory] = useState<string>("all");
    const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

    const {
        open: filterOpen,
        handleToggle: filterToggle,
        ref: filterRef,
    } = useToggle();

    // 필터링 조건 적용
    const filteredData = data.filter((item) =>
        category === "all" || item?.category === category
    );

    return (
        <div>
        <h2 className="heading-2 text-w-neutral-1 mb-40p">멘토링 목록</h2>
        {/* 필터 바 */}
        <div className="flex items-center justify-between flex-wrap gap-24p pb-30p border-b border-shap">
            <Listbox
            ref={filterRef}
            value={selectedFilter}
            onChange={setSelectedFilter}
            as="div"
            className="dropdown group"
            >
            <Listbox.Button onClick={filterToggle} className="dropdown-toggle toggle-1">
                {selectedFilter}
                <IconChevronDown className={`${filterOpen && "rotate-180"} icon-24`} />
            </Listbox.Button>
            <Listbox.Options className="dropdown-content left-0">
                {filterTypes?.map((item, idx) => (
                <Listbox.Option
                    className={`dropdown-item ${selectedFilter === item && "active"}`}
                    key={idx}
                    value={item}
                >
                    {item}
                </Listbox.Option>
                ))}
            </Listbox.Options>
            </Listbox>

            {/* 카테고리 버튼 */}
            <div className="flex items-center overflow-x-auto scrollbar-0 max-w-[680px]">
            <div className="flex flex-wrap gap-2 text-base text-w-neutral-1 *:rounded-12 *:px-32p *:py-3 whitespace-nowrap">
                {positionCategory?.map((item, idx) => (
                <button
                    onClick={() => setCategory(category === item ? "all" : item)}
                    key={idx}
                    className={`${
                    category === item ? "bg-b-neutral-2" : "bg-b-neutral-3"
                    } capitalize`}
                >
                    {item}
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* 카드 리스트 */}
        <div className="grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p mt-60p">
            {filteredData.map((item) => (
            <div key={item.id} className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full">
                <div className="overflow-hidden">
                <span className="badge badge-neutral absolute top-3 left-3 z-[2]">
                    <span className="avatar avatar-primary size-3"></span>
                    <span className="text-s-regular text-w-neutral-1">{item.category}</span>
                </span>
                <Image
                    src={item.image}
                    width={400}
                    height={310}
                    className="w-full object-cover object-top group-hover:scale-110 group-hover:rotate-2 transition-1"
                    alt={item.title}
                />
                </div>
                <div className="p-28p">
                <Link href={`/mentoring-lists/${type}/${item.id}`} className="heading-3 link-1 mb-2 line-clamp-1">
                    {item.title}
                </Link>
                <p className="text-l-regular text-w-neutral-2">
                    Starting at $ <span className="span">{item.price}</span>
                </p>
                <div className="flex-y gap-2 my-24p">
                    <RatingStars className="text-primary" rating={item.rating} />
                    <p className="text-base text-w-neutral-1">
                    {item.rating} ({item.reviews})
                    </p>
                </div>
                <div className="flex-y flex-wrap gap-3">
                    <Image className="size-60p rounded-full shrink-0" src={item.author.image} width={20} height={20} alt={item.author.name} />
                    <div>
                    <Link href="/profile" className="flex-y gap-2 text-l-medium link-1 text-w-neutral-1 mb-1">
                        <span>{item.author.name}</span>
                        <IconCircleCheckFilled size={24} className="text-secondary" />
                    </Link>
                    <span className="text-s-medium text-w-neutral-3">{item.author.role}</span>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default MentoringList;