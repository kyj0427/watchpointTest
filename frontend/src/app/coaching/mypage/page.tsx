// src/app/mentoring-lists/[type]/page.tsx
import { NavLinkProps } from "@/config/types";
import { mentorings } from "@public/data/mentorings";
import CoachingBreadcrumb from "@/components/sections/mentor-menti/CoachingBreadcumb";
import MyMentoringList from "@/components/sections/mentor-menti/CoachingMypage";

const type = "mentoring";
const data = mentorings;


const Page = () => {

    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/coaching", label: "강의" },
        { id: 2, url: "/coaching/mypage", label: "강의 마이페이지" },
    ]

    const headerData = {
        title: "강의 마이페이지",
        bgImgClasses: "",
        navLinks,
    };

    return (
        <main>
        <CoachingBreadcrumb breadcrumb={headerData} />
        <MyMentoringList type={type} data={data} />
        {/* userId={currentUserId} */}
        </main>
    );
}

export default Page