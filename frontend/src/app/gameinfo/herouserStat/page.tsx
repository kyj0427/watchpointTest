// 화면에 띄워지는 게임정보>영웅별통계 페이지

import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
import HeroUserStatAll from "@/components/sections/gameinfo/heroUserStat/HeroUserStatAll";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/gameinfo", label: "게임정보" },
    { id: 2, url: "", label: "영웅별통계" },
  ];

  const headerData: headerBannerType = {
    title: "영웅별통계",
    navLinks,
  };

  return (
    <main>
      <GameBreadcrumb breadcrumb={headerData} />
      <HeroUserStatAll />
    </main>
  );
};
export default Page;
