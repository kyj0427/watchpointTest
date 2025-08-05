//page.test.tsx

import AllGames from "@/components/sections/games/AllGames";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Games" },
  ];

  const headerData: headerBannerType = {
    title: "Games",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <AllGames />
    </main>
  );
};

export default Page;
