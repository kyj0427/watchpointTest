// 전적검색 유저검색 - 검색결과 (동명이인 추출)

// app/userrankList/page.tsx 라우트
import Link from "next/link";

import UsrrankListComp from "@/components/sections/userrankList/userrankListComp";

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-6">
      <UsrrankListComp />
    </main>
  );
}