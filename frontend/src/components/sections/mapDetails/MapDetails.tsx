"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconMapPin,
  IconFlag,
  IconDeviceGamepad2,
} from "@tabler/icons-react";

type MapData = {
  name: string;
  screenshot: string;
  gamemodes: string[];
  location: string;
  country_code: string | null;
};

export default function MapDetails({ mapName }: { mapName: string }) {
  const [map, setMap] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/maps/${encodeURIComponent(mapName)}`)
      .then((res) => res.json())
      .then((data) => {
        setMap(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(" 맵 불러오기 실패:", err);
        setLoading(false);
      });
  }, [mapName]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white" />
      </div>
    );

  if (!map) return <div className="text-center mt-20 text-white">맵 정보를 불러오지 못했습니다.</div>;

  const flagUrl = map.country_code
    ? `https://flagcdn.com/w80/${map.country_code.toLowerCase()}.png`
    : null;

  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* 🔹 Background Blur Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={map.screenshot}
          alt="background"
          layout="fill"
          objectFit="cover"
          className="blur-[6px] brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="pt-60p pb-40p container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{map.name}</h1>

        <Image
          src={map.screenshot}
          alt={map.name}
          width={800}
          height={450}
          className="rounded-xl mx-auto object-cover shadow-lg"
        />

        <div className="mt-10 space-y-4 text-lg">
          {/* 게임 모드 */}
          {map.gamemodes && map.gamemodes.length > 0 && (
            <div className="flex items-center gap-2">
              <IconDeviceGamepad2 size={22} />
              <span>{map.gamemodes.join(", ")}</span>
            </div>
          )}

          {/* 위치 */}
          {map.location && (
            <div className="flex items-center gap-2">
              <IconMapPin size={22} />
              <span>{map.location}</span>
            </div>
          )}

          {/* 국기 */}
          {flagUrl && (
            <div className="flex items-center gap-2">
              <IconFlag size={22} />
              <Image
                src={flagUrl}
                alt="국기"
                width={32}
                height={20}
                className="rounded-sm"
              />
              <span>{map.country_code}</span>
            </div>
          )}
        </div>

        <div className="mt-10">
          <Link href="/maps" className="btn btn-primary">
            전체 맵 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
