import GroupsOne from "@/components/sections/groups/GroupsOne";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Groups" },
  ];

  const headerData: headerBannerType = {
    title: "Groups",
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
