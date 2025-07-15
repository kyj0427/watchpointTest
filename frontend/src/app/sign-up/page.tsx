import RegisterForm from "@/components/sections/register/RegisterForm";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Sign Up" },
  ];

  const headerData: headerBannerType = {
    title: "Sign Up",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <RegisterForm />
    </main>
  );
};

export default Page;
