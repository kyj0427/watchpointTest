"use client"

import Mentorings from "./Mentoring"
import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useToggle } from "@/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import CourseRegisterModal from "./CourseRegisterModal";



type Mentoring = {
    id: number;
    title: string;
    description: string;
    category: string[];
    image: string;
    price: number;
    rating: number;
    reviews: number;
    menteeUserIds: string[]
    mentorinfo: {
        name: string;
        image: string;
        position: string;
        career: string[];
    };
};

interface MentoringListProps {
    data: Mentoring[];
    type: string;
}

const positionCategory = ["딜러", "탱커", "서포터"];
const filterTypes = ["인기순", "추천"];



// 정렬 필터 (필요하면)
// if (selectedFilter === "인기순") {
    //     filteredData = filteredData.sort((a, b) => b.reviews - a.reviews);
    // } else if (selectedFilter === "추천") {
        //     filteredData = filteredData.sort((a, b) => b.rating - a.rating);
        // }
        
        
const MentoringList = ({ data, type }: MentoringListProps) => {
    const [category, setCategory] = useState<string>("all");
    const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);
            // 필터링 적용
    let filteredData = data.filter(
        item => category === "all" || item.category.includes(category)
    );

    const {
        open: filterOpen,
        handleToggle: filterToggle,
        ref: filterRef,
    } = useToggle();

    return(
        <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-10 mb-40p">
        <h2 className="heading-2 text-w-neutral-1">강의 목록</h2>
        <CourseRegisterModal />
        </div>
        {/* 필터 바 */}
        <div className="flex items-center justify-between flex-wrap gap-24p pb-30p border-b border-shap">
            <Listbox
            ref={filterRef}
            value={selectedFilter}
            onChange={setSelectedFilter}
            as="div"
            className="dropdown group"
            >
            <ListboxButton onClick={filterToggle} className="dropdown-toggle toggle-1">
                {selectedFilter}
                <IconChevronDown className={`${filterOpen && "rotate-180"} icon-24`} />
            </ListboxButton>
            <ListboxOptions className="dropdown-content left-0">
                {filterTypes?.map((item, idx) => (
                <ListboxOption
                    // db맵부분
                    className={`dropdown-item ${selectedFilter === item && "active"}`}
                    key={idx}
                    value={item}
                >
                    {item}
                </ListboxOption>
                ))}
            </ListboxOptions>
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
            {/* Mentorings 컴포넌트에 필터된 데이터 넘기기 */}
        <Mentorings data={filteredData} type={type} />
        </div>
    )
}

export default MentoringList;