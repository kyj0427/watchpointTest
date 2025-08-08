import MapList from "@/components/sections/gameinfo/maps/MapList";
import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
import { HeaderBanner } from "@/components/shared";
import { NavLinkProps, headerBannerType } from "@/config/types";

const MapsPage = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/gameinfo", label: "게임정보" },
    { id: 2, url: "/gameinfo/maps", label: "맵정보" },
  ];

  const headerData: headerBannerType = {
    title: "오버워치2 맵 정보",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main className="min-h-screen">
      <GameBreadcrumb breadcrumb={headerData} />
      <MapList />
    </main>
  );
};

export default MapsPage;
