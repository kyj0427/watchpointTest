// src/app/patchnotes/[id]/page.tsx
export const dynamic = "force-dynamic";

import React from "react";
import { GenericUpdates, HeroUpdates } from "@/components/sections/gameinfo/patchnotesDetails";

interface Patchnote {
  anchor_id: string;
  date: string;
  title: string;
  genericUpdates: {
    title: string;
    description: string;
    descriptionList: string[];
  }[];
  heroUpdates: {
    heroName: string;
    heroIcon: string;
    patchUpdateList: string[];
  }[];
}

export default async function PatchDetailPage({ params }: { params: { id: string } }) {
  
  const res = await fetch(`http://192.168.0.31:4000/api/patch/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-10 text-center text-red-500">패치노트를 찾을 수 없습니다.</div>;
  }

  const patch: Patchnote = await res.json();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">{patch.title}</h1>
     
      <GenericUpdates updates={patch.genericUpdates} />
      <HeroUpdates updates={patch.heroUpdates} />
    </div>
  );
}
