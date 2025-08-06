import MapList from "@/components/sections/maps/MapList";
import { HeaderBanner } from "@/components/shared";
import { NavLinkProps, headerBannerType } from "@/config/types";

const MapsPage = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/maps", label: "Maps Details" },
  ];

  const headerData: headerBannerType = {
    title: "Maps Details",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main className="min-h-screen">
      <HeaderBanner breadcrumb={headerData} />
      <MapList />
    </main>
  );
};

export default MapsPage;
