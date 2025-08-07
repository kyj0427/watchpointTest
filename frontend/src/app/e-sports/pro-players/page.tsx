
import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import AllTeams from "@/components/sections/teams/AllTeams";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";



const Page = () => {
    const navLinks: NavLinkProps[] = [
            { id: 1, url: "/e-sports", label: "E-스포츠" },
            { id: 2, url: "", label: "프로 선수 정보" },
            
        ];
    
    const headerData: headerBannerType = {
        title: "프로 선수 정보",
        navLinks,
        };

    return (
        <main>
            <ESportsBreadcrumb breadcrumb={headerData} />
            
        </main>
    );
};

export default Page;
