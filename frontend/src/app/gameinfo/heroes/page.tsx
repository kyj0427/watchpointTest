import HeroAll from "@/components/sections/gameinfo/heroes/HeroAll";
import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
//import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  //breadcrumb
  const navLinks: NavLinkProps[] = [  
    { id: 1, url: "/gameinfo", label: "게임정보" },
    { id: 2, url: "", label: "영웅정보" },
  ];

  //비주얼 타이틀
  const headerData: headerBannerType = {
    title: "영웅정보",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main>
      <GameBreadcrumb breadcrumb={headerData} />
      
      <HeroAll />
    </main>
  );
};

export default Page;
