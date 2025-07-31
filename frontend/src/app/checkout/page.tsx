import Checkout from "@/components/sections/checkout/Checkout";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Checkout" },
  ];

  const headerData: headerBannerType = {
    title: "Checkout",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <Checkout />
    </main>
  );
};

export default Page;
