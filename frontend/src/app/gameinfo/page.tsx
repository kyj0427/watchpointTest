//게임정보 메인페이지에 띄우는 페이지

import GameInfoComp from "@/components/sections/gameinfo/gameinfoComp";
import GameInfoTab from "@/components/sections/gameinfo/gameinfoTab";
import { headerBannerType, NavLinkProps } from "@/config/types";
import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";

const Page = () => {
  const navLinks = [
    { id: 1, url: "/", label: "홈" },
    { id: 2, url: "", label: "게임정보" },
  ];

  const headerData: headerBannerType = {
    title: "게임정보",
    bgImgClasses: "gameinfo",
    navLinks,
  };

  return (
    <main>
      <GameBreadcrumb breadcrumb={headerData} />
      <GameInfoComp />
    </main>
  );
};

export default Page;