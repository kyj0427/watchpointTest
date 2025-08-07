import FaqHeader from "@/components/sections/faq/FaqHeader";
import { AllFaqs } from "@/components/shared";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import Link from "next/link";
const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Noticification" },
  ];

  const headerData: headerBannerType = {
    title: "Noticification",
    navLinks,
  };

  
  return (
   <main>
  <Breadcrumb breadcrumb={headerData} />

  <AllFaqs />

</main>
  );
};

export default Page;
