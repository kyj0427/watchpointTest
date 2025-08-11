"use client";

import { useEffect, useState } from "react";
import Mentorings from "./Mentoring";
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
    mentorinfo: {
        name: string;
        image: string;
        position: string;
    };
};

interface MyMentoringListProps {
    data: Mentoring[];
    // userId: string;  // 로그인한 사용자 ID
    type: string;
}

const MyMentoringList = ({ data, type }: MyMentoringListProps) => {
    // const [myMentorings, setMyMentorings] = useState<Mentoring[]>([]);

    // useEffect(() => {
    //     const filtered = data.filter(
    //     (mentoring) => mentoring.mentorinfo.name === userId
    //     );
    //     setMyMentorings(filtered);
    // }, [data, userId]);

    return (
        
        <div>
            <div className="flex items-center justify-between mb-40p mt-10">
            <h2 className="heading-2 text-w-neutral-1">내 강의 목록</h2>
            <CourseRegisterModal/>
            </div>
        <Mentorings data={data} type={type} />
        </div>
    );
};

export default MyMentoringList;