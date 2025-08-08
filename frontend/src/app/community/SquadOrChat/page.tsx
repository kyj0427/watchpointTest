import SquadOrChat from "@/components/sections/community/SquadOrChat";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Squad/Chat" },
  ];

  const headerData: headerBannerType = {
    title: "Squad/Chat",
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
