import Packages from "@/components/sections/pricing/Packages";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Saved" },
  ];

  const headerData: headerBannerType = {
    title: "Saved",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <Packages/>
    </main>
  );
};

export default Page;
