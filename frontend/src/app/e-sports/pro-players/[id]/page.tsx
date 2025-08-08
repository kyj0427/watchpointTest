"use client";
import ProPlayerDetail from "@/components/sections/eSports/proInfo/ProPlayerDetail";
import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const player_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/e-sports", label: "E-스포츠" },
    { id: 2, url: "/e-sports/pro-players", label: "프로 선수 정보" },
    { id: 3, url: "", label: player_id ? `선수 정보` : "Loading..." },
  ];
  const headerData: headerBannerType = {
    title: "선수 정보",
    navLinks,
  };
  return (
    <main>
      <ESportsBreadcrumb breadcrumb={headerData} />
      {player_id ? (
        <ProPlayerDetail player_id={player_id} />
      ) : (
        <div className="container py-20 text-center">
          선수 정보를 찾는 중입니다...
        </div>
      )}
    </main>
  );
};

export default Page;
