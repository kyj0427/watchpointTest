"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface MapInfo {
  name: string;
  screenshot: string;
  gamemodes: string[];
  location: string;
  country_code: string | null;
}

const MapList = () => {
  const [maps, setMaps] = useState<MapInfo[]>([]);
  const [filteredMaps, setFilteredMaps] = useState<MapInfo[]>([]);

  const [selectedGamemode, setSelectedGamemode] = useState<string>("전체");
  const [sortBy, setSortBy] = useState<string>("오름차순");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const mapsPerPage = 12;

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const res = await fetch("http://192.168.0.31:4000/api/maps");
        const data = await res.json();
        setMaps(data.hits.hits.map((hit: any) => hit._source));
      } catch (err) {
        console.error("맵 불러오기 실패:", err);
      }
    };

    fetchMaps();
  }, []);

  useEffect(() => {
    let result = [...maps];

    if (selectedGamemode !== "전체") {
      result = result.filter((map) =>
        map.gamemodes.includes(selectedGamemode)
      );
    }

    if (searchKeyword.trim() !== "") {
      const keyword = searchKeyword.trim().toLowerCase();
      result = result.filter((map) =>
        map.name.toLowerCase().includes(keyword)
      );
    }

    if (sortBy === "오름차순") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "내림차순") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredMaps(result);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
  }, [maps, selectedGamemode, sortBy, searchKeyword]);

  const gamemodes = [
    "전체",
    ...Array.from(new Set(maps.flatMap((map) => map.gamemodes))),
  ];

  const totalPages = Math.ceil(filteredMaps.length / mapsPerPage);
  const paginatedMaps = filteredMaps.slice(
    (currentPage - 1) * mapsPerPage,
    currentPage * mapsPerPage
  );

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        {/* 검색 + 필터 + 정렬 */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="맵 이름으로 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full bg-b-neutral-2 text-white text-base font-medium px-5 py-3 rounded-lg"
            />
          </div>

          <div className="min-w-[180px]">
            <select
              value={selectedGamemode}
              onChange={(e) => setSelectedGamemode(e.target.value)}
              className="w-full bg-b-neutral-2 text-white text-base px-5 py-3 rounded-lg"
            >
              {gamemodes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[180px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-b-neutral-2 text-white text-base px-5 py-3 rounded-lg"
            >
              <option>오름차순</option>
              <option>내림차순</option>
            </select>
          </div>
        </div>

        {/* 맵 카드 리스트 */}
        <div className="grid 3xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
          {paginatedMaps.map((map, idx) => (
            <div
              key={idx}
              className="bg-b-neutral-3 py-24p px-30p rounded-12 group"
            >
              <div className="overflow-hidden rounded-12">
                <Image
                  className="w-full h-[202px] object-cover group-hover:scale-110 transition-1"
                  src={map.screenshot}
                  alt={map.name}
                  width={320}
                  height={202}
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg text-white font-semibold">{map.name}</h3>
                <p className="text-sm text-w-neutral-2">{map.location}</p>
                <p className="text-sm text-w-neutral-4 mt-1">
                  🎮 {map.gamemodes.join(", ")}
                </p>
              </div>
              <Link
                href={`/maps/${encodeURIComponent(map.name)}`}
                className="btn btn-sm btn-primary rounded-10 mt-3 inline-block"
              >
                상세 보기
              </Link>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md font-medium border text-white transition-all ${
                  currentPage === i + 1
                    ? "bg-yellow-500 border-yellow-500"
                    : "bg-b-neutral-2 border-b-neutral-3 hover:bg-b-neutral-1"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MapList;
