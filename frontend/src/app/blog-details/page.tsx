import BlogDetails from "@/components/sections/blogDetails/BlogDetails";
import { HeaderBanner } from "@/components/shared";
import { NavLinkProps, headerBannerType } from "@/config/types";

const BlogsPage = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/blogs", label: "Blogs Details" },
  ];

  const headerData: headerBannerType = {
    title: "Blogs Details",
    bgImgClasses: "",
    navLinks,
  };
  return (
    <main className="min-h-screen">
      <HeaderBanner breadcrumb={headerData} />
      <BlogDetails />
    </main>
  );
};

export default BlogsPage;
