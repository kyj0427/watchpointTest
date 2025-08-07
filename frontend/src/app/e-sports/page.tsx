import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import AllTournamests from "@/components/sections/tournamests/AllTournamests";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "홈" },
        { id: 2, url: "", label: "E-스포츠" },
    ];

const headerData: headerBannerType = {
    title: "E-스포츠",
    navLinks,
    };

    return (
        <main>
            <ESportsBreadcrumb breadcrumb={headerData} />
            <AllTournamests />
        </main>
    );
};

export default Page;
