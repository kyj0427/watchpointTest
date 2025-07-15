import TrendingGames from "@/components/sections/trending/TrendingGames";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Trending" },
  ];

  const headerData: headerBannerType = {
    title: "Trending",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <TrendingGames />
    </main>
  );
};

export default Page;
