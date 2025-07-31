import ContactUs from "@/components/sections/contact/ContactUs";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const ContactUsPage = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Contact Us" },
  ];

  const headerData: headerBannerType = {
    title: "Contact Us",
    navLinks,
  };

  return (
    <main className="min-h-screen">
      <Breadcrumb breadcrumb={headerData} />
      <ContactUs />
    </main>
  );
};

export default ContactUsPage;
