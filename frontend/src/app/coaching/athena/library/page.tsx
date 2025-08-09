"use client";



import AthenaDashboard from "@/components/sections/athena/dashboard/AthenaDashboard";
import CoachingBreadcrumb from "@/components/sections/mentor-menti/CoachingBreadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

// 아테나 라이브러리 페이지 (로그인/비로그인 구분)

const Page = () => {

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/coaching", label: "강의" },
    { id: 2, url: "", label: "Athena" },
];

const headerData: headerBannerType = {
    title: "Athena",
    bgImgClasses: "",
    navLinks,
};

  return (
    <main>
      <CoachingBreadcrumb breadcrumb={headerData}/>
      <AthenaDashboard/>
    </main>
  )
}

export default Page;
