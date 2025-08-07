import { HeaderBanner } from "@/components/shared";
import { NavLinkProps, headerBannerType } from "@/config/types";
import Wrapper from "@/components/sections/mapDetails/Wrapper";

export function generateStaticParams() {
  return fetch("http://localhost:4000/api/maps")
    .then((res) => res.json())
    .then((data) =>
      data.hits.hits.map((hit: any) => ({
        mapName: encodeURIComponent(hit._source.name),
      }))
    );
}

export default function MapDetailsPage({
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
      <HeaderBanner breadcrumb={headerData} />
      <Wrapper mapName={mapName} />
    </main>
  );
}
