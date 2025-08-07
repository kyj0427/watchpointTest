import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import ProPlayerLeaderboards from "@/components/sections/eSports/ProPlayerLeaderboards";
import AllTournamests from "@/components/sections/tournamests/AllTournamests";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/e-sports", label: "E-스포츠" },
        { id: 2, url: "", label: "프로랭킹" },
    ];

const headerData: headerBannerType = {
    title: "프로랭킹",
    navLinks,
    };

    return (
        <main>
            <ESportsBreadcrumb breadcrumb={headerData} />
            <ProPlayerLeaderboards/>
        </main>
    );
};

export default Page;