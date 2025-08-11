import CoachingBreadcrumb from "@/components/sections/mentor-menti/CoachingBreadcumb";
import PopularMentors from "@/components/sections/mentor-menti/PopularMentors";
import RecommendedMentorings from "@/components/sections/mentor-menti/RecommendedMentorings";
import TrendingMentorings from "@/components/sections/mentor-menti/TrendingMentorings";import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "Home" },
        { id: 2, url: "", label: "강의" },
    ];

    const headerData: headerBannerType = {
        title: "강의",
        navLinks,
    };

    return (
        <main>
        <CoachingBreadcrumb breadcrumb={headerData} />
        <TrendingMentorings type="mentoring"/>
        <RecommendedMentorings type="mentoring"/>
        <PopularMentors type="mentor" />
        </main>
    );
};

export default Page;
