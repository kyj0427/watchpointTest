import LiveGamePlay from "@/components/sections/liveStream/LiveGamePlay";
import TopTrendingGames from "@/components/sections/TopTrendingGames";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";

const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Live Stream" },
  ];

  const headerData: headerBannerType = {
    title: "Live Stream",
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <LiveGamePlay />
      <TopTrendingGames className="section-pb" />
    </main>
  );
};

export default Page;
