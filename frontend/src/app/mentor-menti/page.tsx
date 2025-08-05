import PopularMentors from "@/components/sections/mentor-menti/PopularMentors";
import RecommendedMentorings from "@/components/sections/mentor-menti/RecommendedMentorings";
import TrendingMentorings from "@/components/sections/mentor-menti/TrendingMentorings";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "Home" },
        { id: 2, url: "", label: "Mentor-menti" },
    ];

    const headerData: headerBannerType = {
        title: "멘토/멘티 찾기",
        bgImgClasses: "",
        navLinks,
    };

    return (
        <main>
        <Breadcrumb breadcrumb={headerData} />
        <TrendingMentorings />
        <RecommendedMentorings />
        <PopularMentors />
        </main>
    );
};

export default Page;
