// 화면에 띄워지는 userrankList 메인페이지

import UserrankListBreadcrumb from "@/components/sections/userrankList/userrankListBreadcumb";
import UserrankListComp from "@/components/sections/userrankList/userrankListComp";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/home", label: "홈" },
    { id: 2, url: "/userrankList", label: "전적검색" },
  ];

  const headerData: headerBannerType = {
    title: "전적검색",
    navLinks,
  };

  return (
    <main>
      <UserrankListBreadcrumb breadcrumb={headerData} />
      <UserrankListComp />
    </main>
  );
};
export default Page;
