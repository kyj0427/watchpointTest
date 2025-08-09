// 아테나 동영상 목록 페이지

import CoachingBreadcrumb from "@/components/sections/mentor-menti/CoachingBreadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/coaching/athena/analysis", label: "Athena" },
    { id: 2, url: "", label: "Athena 라이브러리" },
];

const headerData: headerBannerType = {
    title: "Athena AI",
    bgImgClasses: "",
    navLinks,
};
  return (
    <main>
      <CoachingBreadcrumb breadcrumb={headerData}/>
    </main>
  )
}

export default Page;
