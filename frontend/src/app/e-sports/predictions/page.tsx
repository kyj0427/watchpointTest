import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import AllTournamests from "@/components/sections/tournamests/AllTournamests";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/e-sports", label: "E-스포츠" },
        { id: 2, url: "", label: "승부예측" },
    ];

const headerData: headerBannerType = {
    title: "승부예측",
    navLinks,
    };

    return (
        <main>
            <ESportsBreadcrumb breadcrumb={headerData} />
            
        </main>
    );
};

export default Page;