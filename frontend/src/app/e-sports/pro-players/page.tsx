
import AllTeams from "@/components/sections/teams/AllTeams";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";



const Page = () => {
    const navLinks: NavLinkProps[] = [
            { id: 1, url: "/", label: "Home" },
            { id: 2, url: "/e-sports", label: "E-sports" },
            { id: 3, url: "", label: "Pro players" },
        ];
    
    const headerData: headerBannerType = {
        title: "프로 선수 정보",
        navLinks,
        };

    return (
        <main>
            <Breadcrumb breadcrumb={headerData} />
            <AllTeams />
        </main>
    );
};

export default Page;
