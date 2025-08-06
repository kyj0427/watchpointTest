//페이지에 띄우는 페이지

import GameInfoDetailComp from "@/components/sections/gameinfoDetail/gameinfoDetailComp";
import Breadcrumb from "@/components/sections/gameinfoDetail/gameinfoBreadcumb";
import GameInfoSlide from "@/components/sections/gameinfoDetail/gameinfoSlide";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "게임정보" },
    { id: 2, url: "", label: "오버워치2 정보" },
  ];

  const headerData: headerBannerType = {
    title: "게임정보",
    bgImgClasses: "gameinfoDetail",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <GameInfoDetailComp />
      <GameInfoSlide className="section-pb" />
    </main>
  );
};

export default Page;
