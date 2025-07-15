import LibraryDetails from "@/components/sections/libraryDetails/LibraryDetails";
import Breadcrumb from "@/components/shared/Breadcumb";
import RelatedLibrary from "@/components/shared/RelatedLibrary";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Library Details" },
  ];

  const headerData: headerBannerType = {
    title: "Library Details",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <LibraryDetails />
      <RelatedLibrary />
    </main>
  );
};

export default Page;
