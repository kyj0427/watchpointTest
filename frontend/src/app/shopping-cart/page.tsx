import ShoppingCart from "@/components/sections/shoppingCart/ShoppingCart";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Shop Cart" },
  ];

  const headerData: headerBannerType = {
    title: "Shop Cart",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <ShoppingCart />
    </main>
  );
};

export default Page;
