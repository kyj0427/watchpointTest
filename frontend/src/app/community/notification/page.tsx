import FaqHeader from "@/components/sections/faq/FaqHeader";
import Notification from "@/components/sections/community/notification";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import Link from "next/link";
const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/community", label: "커뮤니티" },
    { id: 2, url: "", label: "공지" },
  ];

  const headerData: headerBannerType = {
    title: "공지",
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
