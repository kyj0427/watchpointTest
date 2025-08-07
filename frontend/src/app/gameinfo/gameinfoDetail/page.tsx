//게임정보 상세페이지에 띄우는 페이지

import GameInfoDetailComp from "@/components/sections/gameinfo/gameinfoDetail/gameinfoDetailComp";
import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
import GameInfoSlide from "@/components/sections/gameinfo/gameinfoDetail/gameinfoSlide";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "게임정보" },
    { id: 2, url: "/gameinfo", label: "오버워치2 정보" },
  ];

  const headerData: headerBannerType = {
    title: "게임정보",
    bgImgClasses: "gameinfoDetail",
    navLinks,
  };

  return (
    <main>
      <GameBreadcrumb breadcrumb={headerData} />
      <GameInfoDetailComp />
      <GameInfoSlide className="section-pb" />
    </main>
  );
};

export default Page;
