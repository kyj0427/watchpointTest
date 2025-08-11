import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
import { NavLinkProps, headerBannerType } from "@/config/types";
import Wrapper from "@/components/sections/gameinfo/mapDetails/Wrapper";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("http://192.168.0.31:4000/api/maps");
  const data = await res.json();

  return data.hits.hits.map((hit: any) => ({
    mapName: encodeURIComponent(hit._source.name),
  }));
}

export default async function MapDetailsPage({
  params,
}: {
  params: { mapName: string };
}) {
  const mapName = decodeURIComponent(params.mapName);

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/maps", label: "Maps" },
    { id: 3, url: `/maps/${mapName}`, label: mapName },
  ];

  const headerData: headerBannerType = {
    title: `${mapName} 상세 정보`,
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main className="min-h-screen">
      <GameBreadcrumb breadcrumb={headerData} />
      <Wrapper mapName={mapName} />
    </main>
  );
}
