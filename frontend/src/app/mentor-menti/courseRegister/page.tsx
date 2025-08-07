// app/mentor-menti/courseRegister/page.tsx

import CourseRegister from "@/components/sections/mentor-menti/CourseRegister";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "Home" },
        { id: 2, url: "", label: "Mentor-menti" },
        { id: 3, url: "", label: "강의 등록" },
    ];

    const headerData: headerBannerType = {
        title: "강의등록",
        bgImgClasses: "",
        navLinks,
    };

    return (
        <main>
        <Breadcrumb breadcrumb={headerData} />
        <CourseRegister />
        </main>
    );
};





export default Page;