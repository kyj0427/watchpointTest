import AllBlogs from "@/components/sections/blogs/AllBlogs";
import { HeaderBanner } from "@/components/shared";
import { NavLinkProps, headerBannerType } from "@/config/types";

const BlogsPage = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/blogs", label: "Blogs" },
  ];

  const headerData: headerBannerType = {
    title: "Blogs",
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

export default BlogsPage;
