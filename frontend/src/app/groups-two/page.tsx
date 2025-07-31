import GroupsTwo from "@/components/sections/groups/GroupsTwo";
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
      <GroupsTwo />
    </main>
  );
};

export default Page;
