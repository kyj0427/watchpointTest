import GroupsOne from "@/components/sections/groups/GroupsOne_hw";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Squad" },
  ];

  const headerData: headerBannerType = {
    title: "Squad",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <GroupsOne />
    </main>
  );
};

export default Page;
