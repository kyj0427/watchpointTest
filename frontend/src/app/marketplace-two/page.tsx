import MarketplaceAll from "@/components/sections/marketplace/MarketplaceAll";
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
      <MarketplaceAll />
    </main>
  );
};

export default Page;
