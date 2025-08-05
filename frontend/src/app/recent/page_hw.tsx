import AllBlogs from "@/components/sections/blogs/AllBlogs";
import { HeaderBanner } from "@/components/shared";
import { NavLinkProps, headerBannerType } from "@/config/types";

const RecentPage = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/recent", label: "recent" },
  ];

  const headerData: headerBannerType = {
    title: "RECENT TOPICS",
    bgImgClasses: "",
    navLinks,
  };
  return (
    <main className="min-h-screen">
      <HeaderBanner breadcrumb={headerData} />
      <AllBlogs />
    </main>
  );
};

export default RecentPage;
