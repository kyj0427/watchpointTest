import AthenaDescription from "@/components/sections/athena/AthenaDescription";
import AthenaMain from "@/components/sections/athena/AthenaMain";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "Home" },
        { id: 2, url: "", label: "athena" },
    ];

    return (
        <main>
            <AthenaMain/>
            <AthenaDescription/>
        </main>
    );
};

export default Page;
