"use client";



import AthenaDashboard from "@/components/sections/athena/dashboard/AthenaDashboard";
import CoachingBreadcrumb from "@/components/sections/mentor-menti/CoachingBreadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

// 메인 분기 페이지

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
