import AllTournamests from "@/components/sections/tournamests/AllTournamests";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "Home" },
        { id: 2, url: "", label: "E-sports" },
    ];

const headerData: headerBannerType = {
    title: "E-스포츠",
    navLinks,
    };

    return (
        <main>
            <Breadcrumb breadcrumb={headerData} />
            <AllTournamests />
        </main>
    );
};

export default Page;
