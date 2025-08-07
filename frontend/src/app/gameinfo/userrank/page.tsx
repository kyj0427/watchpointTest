// 화면에 띄워지는 userrank 페이지

import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
import UserRankComp from "@/components/sections/gameinfo/userrank/userrankComp";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "게임정보" },
    { id: 2, url: "", label: "유저랭킹" },
  ];

  const headerData: headerBannerType = {
    title: "유저랭킹",
    navLinks,
  };

  return (
    <main>
      <GameBreadcrumb breadcrumb={headerData} />
      <UserRankComp />
    </main>
  );
};

export default Page;
