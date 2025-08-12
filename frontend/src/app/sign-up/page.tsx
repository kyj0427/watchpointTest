import RegisterForm from "@/components/sections/register/RegisterForm";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "홈" },
    { id: 2, url: "", label: "회원가입" },
  ];

  const headerData: headerBannerType = {
    title: "회원가입",
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
