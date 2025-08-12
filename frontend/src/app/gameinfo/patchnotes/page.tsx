"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";

interface PatchnoteCard {
  anchor_id: string;
  title: string;
  date: string;
  file: string;
  genericUpdates: {
    title: string;
    descriptionList: string[];
  }[];
  heroUpdates: {
    heroIcon: string[];
    heroName: string;
    patchUpdateList: string[];
  }[];
}

type SortOrder = "newest" | "oldest";

export default function PatchnoteListPage() {
  const [patchnotes, setPatchnotes] = useState<PatchnoteCard[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // breadcrumb 데이터 정의
  const headerData = useMemo(
    () => ({
      title: "패치노트",
      navLinks: [
        { id: 1, url: "/gameinfo", label: "게임정보" },
        { id: 2, url: "", label: "패치노트" },
      ],
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.0.31:4000/api/patch", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const raw: PatchnoteCard[] = (data?.hits?.hits ?? []).map(
          (hit: any) => hit?._source
        );
        setPatchnotes(raw ?? []);
      } catch (err) {
        console.error("패치노트 불러오기 실패:", err);
        setPatchnotes([]);
      }
    };
    fetchData();
  }, []);

  const getDateFromAnchorId = (anchorId: string) => {
    const match = anchorId?.match?.(/(\d{4}-\d{2}-\d{2})/);
    return match ? new Date(match[1]).getTime() : 0;
  };

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();
    if (!keyword) return patchnotes;
    return patchnotes.filter((p) => {
      const inTitle = p.title?.toLowerCase?.().includes(keyword);
      const inGeneric = p.genericUpdates?.some((g) =>
        g?.descriptionList?.some((d) =>
          d?.toLowerCase?.().includes(keyword)
        )
      );
      const inHeroes =
        p.heroUpdates?.some(
          (h) =>
            h?.heroName?.toLowerCase?.().includes(keyword) ||
            h?.patchUpdateList?.some((t) =>
              t?.toLowerCase?.().includes(keyword)
            )
        ) ?? false;
      return Boolean(inTitle || inGeneric || inHeroes);
    });
  }, [patchnotes, search]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const da = getDateFromAnchorId(a.anchor_id);
      const db = getDateFromAnchorId(b.anchor_id);
      return sortOrder === "newest" ? db - da : da - db;
    });
    return copy;
  }, [filtered, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / postsPerPage));

  
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentItems = sorted.slice(start, end);

  return (
    <>
      <GameBreadcrumb breadcrumb={headerData} />

      <div className="max-w-4xl mx-auto px-6 py-12 pt-32 pb-52">
        <h2 className="text-4xl font-bold text-white mb-6 z-10 relative">
          PatchNotes List
        </h2>

        <div className="flex items-center justify-between mb-6 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="검색어 입력 (제목/내용/영웅)"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as SortOrder);
              setCurrentPage(1);
            }}
            className="border px-2 py-2 rounded bg-gray-800 text-white"
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {currentItems.map((patch, index) => {
            const iconList =
              patch.heroUpdates?.flatMap((h) => h?.heroIcon ?? []) ?? [];
            const thumbnail = iconList.find(
              (url) => typeof url === "string" && url.startsWith("http")
            );

            return (
              <div
                key={`${patch.anchor_id}-${index}`}
                className="bg-gray-700 hover:bg-gray-600 transition p-4 rounded-lg flex items-center gap-4"
              >
                {thumbnail ? (
                  // Next/Image를 안 쓰는 경우
                  <img
                    src={thumbnail}
                    alt="영웅 썸네일"
                    className="w-16 h-16 object-contain rounded bg-white p-1"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/images/fallback.png";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-white rounded text-sm flex items-center justify-center text-black">
                    없음
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {patch.title}
                  </h3>
                </div>

                <Link
                  href={`/gameinfo/patchnotes/${encodeURIComponent(
                    patch.anchor_id
                  )}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  상세 보기
                </Link>
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
