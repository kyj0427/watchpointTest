import FaqHeader from "@/components/sections/faq/FaqHeader";
import Notification from "@/components/sections/community/notification";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import Link from "next/link";
const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Notification" },
  ];

  const headerData: headerBannerType = {
    title: "Notification",
    navLinks,
  };

  
  return (
   <main>
  <Breadcrumb breadcrumb={headerData} />

  <Notification />

</main>
  );
};

export default Page;
