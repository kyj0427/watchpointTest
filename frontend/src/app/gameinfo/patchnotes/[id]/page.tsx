// src/app/patchnotes/[id]/page.tsx
export const dynamic = "force-dynamic";

import React from "react";
import { GenericUpdates, HeroUpdates } from "@/components/sections/gameinfo/patchnotesDetails";
import GameBreadcrumb from "@/components/sections/gameinfo/gameBreadcumb";

interface Patchnote {
  anchor_id: string;
  date: string;
  title: string;
  genericUpdates: {
    title: string;
    description?: string;
    descriptionList?: string[];
  }[];
  heroUpdates: {
    heroName: string;
    heroIcon?: string | string[];
    patchUpdateList: string[];
  }[];
}

export default async function PatchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 
  const headerData = {
    title: "PATCH NOTES",
    navLinks: [
      { id: 1, url: "/", label: "Home" },
      { id: 2, url: "/patchnotes", label: "Patch Notes" },
    ],
  };

  // 
  let patch: Patchnote | null = null;
  try {
    const res = await fetch(
      `http://192.168.0.31:4000/api/patch/${encodeURIComponent(params.id)}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      return (
        <>
          <GameBreadcrumb breadcrumb={headerData} />
          <div className="p-10 text-center text-red-500">
            패치노트를 찾을 수 없습니다.
          </div>
        </>
      );
    }
    patch = (await res.json()) as Patchnote;
  } catch (e) {
    console.error("패치노트 상세 불러오기 실패:", e);
    return (
      <>
        <GameBreadcrumb breadcrumb={headerData} />
        <div className="p-10 text-center text-red-500">
          패치노트를 불러오는 중 오류가 발생했습니다.
        </div>
      </>
    );
  }

  if (!patch) {
    return (
      <>
        <GameBreadcrumb breadcrumb={headerData} />
        <div className="p-10 text-center text-red-500">
          패치노트 데이터가 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <GameBreadcrumb breadcrumb={headerData} />
      <div className="max-w-4xl mx-auto px-6 py-12 pt-32 pb-40">
        <h1 className="text-3xl font-bold mb-2">{patch.title}</h1>
        {patch.date && (
          <p className="text-sm text-gray-400 mb-8">{patch.date}</p>
        )}

        {/* 공통 / 영웅 업데이트 섹션 */}
        {Array.isArray(patch.genericUpdates) && patch.genericUpdates.length > 0 && (
          <GenericUpdates updates={patch.genericUpdates} />
        )}
        {Array.isArray(patch.heroUpdates) && patch.heroUpdates.length > 0 && (
          <HeroUpdates updates={patch.heroUpdates} />
        )}
      </div>
    </>
  );
}
