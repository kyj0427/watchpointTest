import TermsConditions from "@/components/sections/termsConditions/TermsConditions";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Terms Conditions" },
  ];

  const headerData: headerBannerType = {
    title: "Terms Conditions",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <TermsConditions />
    </main>
  );
};

export default Page;
