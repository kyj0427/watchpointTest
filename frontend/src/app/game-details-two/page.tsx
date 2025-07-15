import { headerBannerType, NavLinkProps } from "@/config/types";
import Breadcrumb from "@/components/shared/Breadcumb";
import GameDetailsTwoClient from "@/components/sections/gameDetailsTwo/GameDetailsTwoClient";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Games Details" },
  ];

  const headerData: headerBannerType = {
    title: "Games Details",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <GameDetailsTwoClient />
    </main>
  );
};

export default Page;
