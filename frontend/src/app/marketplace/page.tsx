import MarketplaceListings from "@/components/sections/marketplace/MarketplaceListings";
import OurStore from "@/components/sections/OurStore";
import PopularGamesOne from "@/components/sections/PopularGamesOne";
import TopTrendingGames from "@/components/sections/TopTrendingGames";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Marketplace listings" },
  ];

  const headerData: headerBannerType = {
    title: "Marketplace listings",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <MarketplaceListings />
      <TopTrendingGames />
      <OurStore />
      <PopularGamesOne />
    </main>
  );
};

export default Page;
