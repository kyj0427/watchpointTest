import LoginForm from "@/components/sections/login/LoginForm";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Login" },
  ];

  const headerData: headerBannerType = {
    title: "Login",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <LoginForm />
    </main>
  );
};

export default Page;
