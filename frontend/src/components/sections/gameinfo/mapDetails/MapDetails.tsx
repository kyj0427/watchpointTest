"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import {
  IconMapPin,
  IconFlag,
  IconDeviceGamepad2,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

type MapData = {
  name: string;
  screenshots: string[];
  gamemodes: string[];
  location: string;
  country_code: string | null;
  description?: string;
};

export default function MapDetails({ mapName }: { mapName: string }) {
  const [map, setMap] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggleDescription = () => {
  if (!map?.description || map.description.trim() === "") {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
    return;
  }
  setShowDescription((prev) => !prev);
};

  useEffect(() => {
    fetch(`/api/maps/${encodeURIComponent(mapName)}`)
      .then((res) => res.json())
      .then((data) => {
        setMap(data);
        setLoading(false);
        setSelectedIndex(0);
      })
      .catch((err) => {
        console.error("맵 불러오기 실패:", err);
        setLoading(false);
      });
  }, [mapName]);

  const markdownHTML = map?.description ? marked(map.description) : "";

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white" />
      </div>
    );

  if (!map)
    return (
      <div className="text-center mt-20 text-white">
        맵 정보를 불러오지 못했습니다.
      </div>
    );

  const flagUrl = map.country_code
    ? `https://flagcdn.com/w80/${map.country_code.toLowerCase()}.png`
    : null;

  const thumbnailsPerPage = 4;
  const currentSliceStart = Math.floor(selectedIndex / thumbnailsPerPage) * thumbnailsPerPage;

  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={map.screenshots?.[selectedIndex] || ""}
          alt="background"
          fill
          style={{ objectFit: "cover" }}
          className="blur-[6px] brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 본문 */}
      <div className="pt-40 pb-20 max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-stretch gap-10 relative">
        {/* 왼쪽 썸네일 + 메인 이미지 */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{map.name}</h1>

          <Image
            src={map.screenshots?.[selectedIndex] || ""}
            alt={`${map.name} 스크린샷`}
            width={800}
            height={450}
            className="rounded-xl object-cover shadow-lg w-full"
          />

          {/* 썸네일 슬라이더 */}
          <div className="relative mt-4">
            <button
              onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
              disabled={selectedIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full disabled:opacity-30"
            >
              <IconChevronLeft size={24} />
            </button>

            <div className="flex gap-3 overflow-hidden mx-10">
              {map.screenshots
                ?.slice(currentSliceStart, currentSliceStart + thumbnailsPerPage)
                .map((src, i) => {
                  const absoluteIndex = currentSliceStart + i;
                  return (
                    <Image
                      key={absoluteIndex}
                      src={src}
                      alt={`${map.name} 썸네일 ${absoluteIndex + 1}`}
                      width={90}
                      height={90}
                      onClick={() => setSelectedIndex(absoluteIndex)}
                      className={`cursor-pointer rounded-md object-cover border-2 transition ${
                        selectedIndex === absoluteIndex
                          ? "border-yellow-400"
                          : "border-transparent"
                      }`}
                    />
                  );
                })}
            </div>

            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  Math.min(prev + 1, map.screenshots.length - 1)
                )
              }
              disabled={selectedIndex >= map.screenshots.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full disabled:opacity-30"
            >
              <IconChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* 오른쪽 정보 카드 */}
        <div className="w-full lg:w-80 flex flex-col justify-between bg-zinc-900 rounded-lg shadow-lg text-sm p-6">
          <div className="flex flex-col items-center gap-3 text-center">
            {map.gamemodes?.length > 0 && (
              <div className="flex items-center gap-2">
                <IconDeviceGamepad2 size={20} />
                <span>{map.gamemodes.join(", ")}</span>
              </div>
            )}
            {map.location && (
              <div className="flex items-center gap-2">
                <IconMapPin size={20} />
                <span>{map.location}</span>
              </div>
            )}
            {flagUrl && (
              <div className="flex items-center gap-2">
                <IconFlag size={20} />
                <Image
                  src={flagUrl}
                  alt="국기"
                  width={28}
                  height={18}
                  className="rounded-sm"
                />
                <span>{map.country_code?.toUpperCase()}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <button
              onClick={handleToggleDescription}
              className="btn btn-outline w-full"
            >
              {showDescription ? "맵 정보 닫기" : "맵 정보 보기"}
            </button>
            <Link href="/gameinfo/maps" className="btn btn-primary w-full">
              전체 맵 보기
            </Link>
          </div>
        </div>
      </div>

      {/* 마크다운 설명 */}
      <section className="relative">
        {/* Toast Message */}
        {showToast && (
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-red-600/90 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
                맵 설명이 없습니다.
              </div>
            )}
        {/* Markdown Description */}
        {showDescription && (
          <div className="w-full mt-16 px-4 lg:px-8 flex justify-center">
            <div
              className="w-full max-w-6xl bg-zinc-900/80 rounded-xl shadow-xl overflow-y-auto max-h-[650px] p-8
                scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-zinc-800"
            >
              <div
                className="prose prose-invert max-w-none
                  prose-h1:text-yellow-400 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
                  prose-h2:text-yellow-300 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4
                  prose-p:text-white prose-p:leading-relaxed prose-p:my-2
                  prose-li:marker:text-yellow-400 prose-li:ml-6 prose-li:text-white
                  prose-strong:text-white prose-strong:font-bold
                  prose-em:italic prose-code:text-green-400
                  prose-table:border prose-th:border prose-td:border"
                dangerouslySetInnerHTML={{ __html: markdownHTML }}
              />
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
