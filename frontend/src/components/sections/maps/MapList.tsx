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
  const [sortBy, setSortBy] = useState<string>("이름 오름차순");

  // Fetch map data
  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/maps");
        const data = await res.json();
        setMaps(data.hits.hits.map((hit: any) => hit._source));
      } catch (err) {
        console.error("맵 불러오기 실패:", err);
      }
    };

    fetchMaps();
  }, []);

  // Filter + Sort
  useEffect(() => {
    let result = [...maps];

    if (selectedGamemode !== "전체") {
      result = result.filter((map) =>
        map.gamemodes.includes(selectedGamemode)
      );
    }

    if (sortBy === "오름차순") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "내림차순") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredMaps(result);
  }, [maps, selectedGamemode, sortBy]);

  const gamemodes = [
  "전체",
  ...Array.from(new Set(maps.flatMap((map) => map.gamemodes))),
];

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        {/* 필터 & 정렬 */}
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div>
            <label className="text-sm text-white mr-2">필터:</label>
            <select
              value={selectedGamemode}
              onChange={(e) => setSelectedGamemode(e.target.value)}
              className="bg-b-neutral-2 text-white px-4 py-2 rounded-md"
            >
              {gamemodes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-white mr-2">정렬:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-b-neutral-2 text-white px-4 py-2 rounded-md"
            >
              <option>오름차순</option>
              <option>내림차순</option>
            </select>
          </div>
        </div>

        {/* 맵 목록 */}
        <div className="grid 3xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
          {filteredMaps.map((map, idx) => (
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
                <h3 className="text-lg text-white font-semibold">
                  {map.name}
                </h3>
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
      </div>
    </section>
  );
};

export default MapList;
