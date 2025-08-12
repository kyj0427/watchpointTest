import SquadOrChat from "@/components/sections/community/SquadOrChat";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/community", label: "커뮤니티" },
    { id: 2, url: "", label: "듀오/스쿼드 탐색" },
  ];

  const headerData: headerBannerType = {
    title: "듀오/스쿼드 탐색",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <SquadOrChat />
    </main>
  );
};

export default Page;
