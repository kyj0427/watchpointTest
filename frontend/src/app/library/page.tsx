import LibraryCollections from "@/components/sections/Library/LibraryCollections";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Library" },
  ];

  const headerData: headerBannerType = {
    title: "Library",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <LibraryCollections />
    </main>
  );
};

export default Page;
