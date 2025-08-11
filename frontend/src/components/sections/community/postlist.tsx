"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Postcard from "@/components/sections/community/postcard";
import { HeaderBanner } from "@/components/shared";

const PostListPage = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as "hot" | "recent" | null;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 상단 배너 */}
      <HeaderBanner
        breadcrumb={{
          title: mode === "recent" ? "RECENT TOPICS" : "HOT TOPICS",
          navLinks: [
            { id: 1, url: "/", label: "Home" },
            { id: 2, url: "/postlist?mode=hot", label: "Hot" },
            { id: 3, url: "/postlist?mode=recent", label: "Recent" },
          ].filter((link) => {
            if (mode === "hot" && link.label === "Recent") return false;
            if (mode === "recent" && link.label === "Hot") return false;
            return true;
          }),
        }}
      />

      {/* 검색 + 필터 바 */}
      <div className="px-6 md:px-20 py-6 bg-black mt-10">
        <div className="max-w-3xl mx-auto w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          {/* 검색창 */}
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* 드롭다운 */}
          <div className="w-full sm:w-44">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 text-white"
            >
              <option value="all">전체 카테고리</option>
              <option value="hot">Hot</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📄 블로그 카드 목록 */}
      <Postcard mode={mode || "hot"} search={search} filter={filter} />
    </main>
  );
};

export default PostListPage;
