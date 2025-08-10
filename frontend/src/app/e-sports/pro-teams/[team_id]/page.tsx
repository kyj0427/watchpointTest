// frontend/src/app/teams/[teamId]/page.tsx

"use client";

import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import ProTeamDetail from "@/components/sections/eSports/proInfo/ProTeamDetail";
import { headerBannerType, NavLinkProps } from "@/config/types";
import { useParams } from "next/navigation";

export default function TeamDetailPage() {
  const params = useParams();
  const team_id = Array.isArray(params.team_id)
    ? params.team_id[0]
    : params.team_id;
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/e-sports", label: "E-스포츠" },
    { id: 2, url: "/e-sports/pro-players", label: "프로 선수 정보" },
    { id: 3, url: "", label: team_id ? `팀 정보` : "Loading..." },
  ];
  const headerData: headerBannerType = {
    title: "팀 정보",
    navLinks,
  };

  return (
    <main>
      <ESportsBreadcrumb breadcrumb={headerData} />
      {team_id ? (
        <ProTeamDetail team_id={team_id} />
      ) : (
        <div>팀 ID를 찾을 수 없습니다.</div>
      )}
    </main>
  );
}
