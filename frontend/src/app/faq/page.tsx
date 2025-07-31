import { AllFaqs } from "@/components/shared";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Faq" },
  ];

  const headerData: headerBannerType = {
    title: "Faq",
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
