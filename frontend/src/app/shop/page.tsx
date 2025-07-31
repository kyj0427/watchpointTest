import Products from "@/components/sections/shop/Products";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Shop" },
  ];

  const headerData: headerBannerType = {
    title: "Shop",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <Products />
    </main>
  );
};

export default Page;
