"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://192.168.0.31:4000/api/patch", {
        cache: "no-store",
      });
      const data = await res.json();
      const raw = data.hits.hits.map((hit: any) => hit._source);
      setPatchnotes(raw);
    };
    fetchData();
  }, []);

  const getDateFromAnchorId = (anchorId: string) => {
    const match = anchorId.match(/(\d{4}-\d{2}-\d{2})/);
    return match ? new Date(match[1]).getTime() : 0;
  };

  const filtered = patchnotes.filter((p) => {
    const keyword = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(keyword) ||
      p.genericUpdates?.some((g) =>
        g.descriptionList?.some((d) => d.toLowerCase().includes(keyword))
      )
    );
  });

  const sorted = filtered.sort((a, b) => {
    const da = getDateFromAnchorId(a.anchor_id);
    const db = getDateFromAnchorId(b.anchor_id);
    return sortOrder === "newest" ? db - da : da - db;
  });

  const totalPages = Math.ceil(sorted.length / postsPerPage);
  const currentItems = sorted.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
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
          placeholder="검색어 입력 (제목/내용)"
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
        {currentItems.map((patch, index) => (
          <div
            key={`${patch.anchor_id}-${index}`}
            className="bg-gray-700 hover:bg-gray-600 transition p-4 rounded-lg flex items-center gap-4"
          >
            {(() => {
              const iconList = patch.heroUpdates?.flatMap((h) => h.heroIcon || []);
              const thumbnail = iconList.find((url) => url && url.startsWith("http"));
              return thumbnail ? (
                <img
                  src={thumbnail}
                  alt="챔피언 썸네일"
                  className="w-16 h-16 object-contain rounded bg-white p-1"
                  onError={(e) => {
                    e.currentTarget.src = "/images/fallback.png";
                  }}
                />
              ) : (
                <div className="w-16 h-16 bg-white rounded text-sm flex items-center justify-center text-black">
                  없음
                </div>
              );
            })()}

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{patch.title}</h2>
            </div>

            <Link
              href={`/gameinfo/patchnotes/${patch.anchor_id}`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              상세 보기
            </Link>
          </div>
        ))}
      </div>

      {/*페이지네이션 */}
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
  );
}
