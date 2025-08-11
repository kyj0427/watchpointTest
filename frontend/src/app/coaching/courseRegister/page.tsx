// app/mentor-menti/courseRegister/page.tsx

import CoachingBreadcrumb from "@/components/sections/mentor-menti/CoachingBreadcumb";
import CourseRegister from "@/components/sections/mentor-menti/CourseRegister";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/coaching", label: "강의" },
        { id: 2, url: "/coaching/mentor-menti/courseRegister", label: "강의등록" },
    ];

    const headerData: headerBannerType = {
        title: "강의등록",
        bgImgClasses: "",
        navLinks,
    };

    return (
        <main>
        <CoachingBreadcrumb breadcrumb={headerData} />
        <CourseRegister />
        </main>
    );
};





export default Page;