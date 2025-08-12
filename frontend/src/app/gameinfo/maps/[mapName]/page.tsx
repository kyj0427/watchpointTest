// app/gameinfo/maps/[mapName]/page.tsx
import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";
import { NavLinkProps, headerBannerType } from "@/config/types";
import Wrapper from "@/components/sections/gameinfo/mapDetails/Wrapper";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("http://192.168.0.31:4000/api/maps", { cache: "no-store" });
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map((m: any) => ({ mapName: m.name }));
}

export default async function MapDetailsPage({
  params,
}: {
  params: Promise<{ mapName: string }>;
}) {
  const { mapName: raw } = await params;         
  const displayName = decodeURIComponent(raw);   

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/gameinfo/maps", label: "Maps" },
    // URL은 인코딩 유지
    { id: 3, url: `/gameinfo/maps/${encodeURIComponent(raw)}`, label: displayName },
  ];

  const headerData: headerBannerType = {
    title: `${displayName} 상세 정보`,  
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main className="min-h-screen">
      <GameBreadcrumb breadcrumb={headerData} />
      {/* 내부 컴포넌트는 fetch 시 자체 인코딩하므로 디코딩된 이름을 넘김 */}
      <Wrapper mapName={displayName} />
    </main>
  );
}
