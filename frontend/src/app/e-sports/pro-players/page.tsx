
import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import ProTeamList from "@/components/sections/eSports/proInfo/ProTeamList";
import { headerBannerType, NavLinkProps } from "@/config/types";



const Page = () => {
    const navLinks: NavLinkProps[] = [
            { id: 1, url: "/e-sports", label: "E-스포츠" },
            { id: 2, url: "", label: "프로선수정보" },
            
        ];
    
    const headerData: headerBannerType = {
        title: "프로선수정보",
        navLinks,
        };

    return (
        <main>
            <ESportsBreadcrumb breadcrumb={headerData} />
            <ProTeamList/>
        </main>
    );
};

export default Page;
