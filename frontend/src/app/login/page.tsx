import LoginForm from "@/components/sections/login/LoginForm";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "홈" },
    { id: 2, url: "", label: "로그인" },
  ];

  const headerData: headerBannerType = {
    title: "로그인",
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
