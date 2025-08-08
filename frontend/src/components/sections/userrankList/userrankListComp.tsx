"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

// ⚠️ 팀 규칙: public/data 에 TS로 두기로 했으니 그대로 import
import { userListData } from "@/../public/data/userrankListData";

type UserListItem = {
  id: string;                // 고유 ID (예: 배틀태그 해시)
  name: string;              // 표시 이름
  battletag?: string;        // 배틀태그 (ex: nickname#1234)
  platform?: string;         // PC/Console 등
  rating?: number;           // 티어/점수 등
  avatar?: string;           // "/images/user/xxx.png"
};

export default function UsrrankListComp() {
  const params = useSearchParams();
  const q = (params.get("search") || "").trim().toLowerCase();

  const list: UserListItem[] = userListData ?? [];

  const filtered = useMemo(() => {
    if (!q) return list;
    return list.filter(item => {
      const hay = `${item.name} ${item.battletag ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [q, list]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-white">검색 결과</h1>

      {!filtered.length ? (
        <p className="text-w-neutral-4">검색 결과가 없습니다.</p>
      ) : (
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-16p">
          {filtered.map((u) => (
            <li key={u.id} className="bg-b-neutral-3 rounded-16 p-16p flex items-center gap-12p">
              <Image
                src={u.avatar || "/images/user/default-avatar.png"}
                alt={`${u.name} avatar`}
                width={56}
                height={56}
                className="rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-w-neutral-1 text-lg font-semibold truncate">{u.name}</p>
                <p className="text-w-neutral-4 text-sm truncate">{u.battletag ?? ""}</p>
                <p className="text-w-neutral-4 text-sm">
                  {u.platform ?? ""}{u.platform && u.rating ? " · " : ""}{u.rating ? `${u.rating} SR` : ""}
                </p>
              </div>

              {/* 유저 상세로 이동: /user?id=... */}
              <Link
                href={`/user?id=${encodeURIComponent(u.id)}`}
                className="btn-c btn-c-sm bg-primary hover:bg-primary/80 text-b-neutral-4 rounded-full"
              >
                보기
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
