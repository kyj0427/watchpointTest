import HeroAll from "@/components/sections/hero/HeroAll";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  //breadcrumb
  const navLinks: NavLinkProps[] = [  
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Heroes" },
  ];

  //비주얼 타이틀
  const headerData: headerBannerType = {
    title: "Heroes",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <HeroAll />
    </main>
  );
};

export default Page;
