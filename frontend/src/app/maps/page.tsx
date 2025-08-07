import MapList from "@/components/sections/maps/MapList";
import { HeaderBanner } from "@/components/shared";
import { NavLinkProps, headerBannerType } from "@/config/types";

const MapsPage = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/maps", label: "Maps" },
  ];

  const headerData: headerBannerType = {
    title: "Overwatch 2 Maps",
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
