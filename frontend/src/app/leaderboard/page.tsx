import Leaderboards from "@/components/sections/leaderboard/Leaderboards";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Leaderboard" },
  ];

  const headerData: headerBannerType = {
    title: "Leaderboard",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <Leaderboards />
    </main>
  );
};

export default Page;
