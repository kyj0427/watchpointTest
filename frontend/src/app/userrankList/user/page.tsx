// 전적검색 유저검색 - 검색결과 (동명이인 추출)

import UserBreadcrumb from "@/components/sections/userrankList/user/userBreadcumb";
import UserComp from "@/components/sections/userrankList/user/userComp";
import { headerBannerType, NavLinkProps } from "@/config/types";

type Search = { q?: string | string[]; uid?: string | string[] };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const qRaw = sp?.q ?? "";
  const uidRaw = sp?.uid ?? "";

  // string | string[] 대비
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;
  const uid = Array.isArray(uidRaw) ? uidRaw[0] : uidRaw;

  const navLinks = [
    { id: 1, url: "/", label: "홈" },
    { id: 2, url: `/userrankList/user?q=${encodeURIComponent(q)}`, label: "검색결과" },
    { id: 3, label: uid || q || "플레이어 상세" },
  ];

  const headerData = {
    title: "플레이어 상세",
    navLinks,
    header: {
      name: q || "Revolution",
      portraitUrl:
        "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71d29660fd426e7b2a78a9b896027c79fcbe03c5c63e19c5937078eb13f8f9a5.png",
      title: "'공격적인 플레이어'",
      lastUpdatedText: "최근 업데이트 : 32시간 전",
      bgUrl: "/images/game_hero/hero_portrait_bg/Tracer_heroImage_3.jpg",
    },
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <UserBreadcrumb breadcrumb={headerData} />
      <UserComp />
    </main>
  );
}
