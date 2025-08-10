// 전적검색 유저검색 - 검색결과 (동명이인 추출)

import UserComp from "@/components/sections/userrankList/user/userComp";

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

  const headerData = {
    header: {
      name: q || "Revolution",
      portraitUrl:
        "/images/users/player_icon1.png",
      title: "공격적인 플레이어",
      lastUpdatedText: "최근 업데이트 : 32시간 전",
      bgUrl: "/images/game_hero/hero_portrait_bg/Tracer_heroImage_3.jpg",
    },
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <UserComp />
    </main>
  );
}
