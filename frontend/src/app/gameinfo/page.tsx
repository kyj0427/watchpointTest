//페이지에 띄우는 페이지

import GameInfoComp from "@/components/sections/gameinfo/gameinfoComp";
import Breadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

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
      <Breadcrumb breadcrumb={headerData} />
      <GameInfoComp />
    </main>
  );
};

export default Page;