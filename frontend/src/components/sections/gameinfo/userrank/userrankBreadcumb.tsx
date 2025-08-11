// src/components/sections/userrankList/UserrankListComp.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type PlayerRow = { player_id: string; name: string; avatar?: string; last_updated_at?: number };

export default function UserrankListComp({ initialQuery }: { initialQuery?: string }) {
  const q = (initialQuery || "").trim();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<PlayerRow[]>([]);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    fetch(`http://192.168.0.31:4000/api/players?name=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(d => setRows(d?.results ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [q]);

  if (!q) return <div className="py-6 text-center text-w-neutral-4">검색어가 비었습니다.</div>;
  if (loading) return <div className="py-6 text-center text-w-neutral-4">검색 중…</div>;
  if (rows.length === 0) return <div className="py-6 text-center text-w-neutral-4">결과가 없습니다: {q}</div>;

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="overflow-x-auto scrollbar-sm">
          <table className="w-full text-l-medium">
            <thead>
              <tr className="bg-shap">
                <th className="px-24p py-3">#</th>
                <th className="px-24p py-3">아이콘</th>
                <th className="px-24p py-3">플레이어</th>
                <th className="px-24p py-3">최근 업데이트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solid divide-shap bg-b-neutral-3">
              {rows.map((p, i) => (
                <tr key={p.player_id}>
                  <td className="px-24p py-3">{i + 1}</td>
                  <td className="px-24p py-3">
                    {p.avatar
                      ? <Image src={p.avatar} alt={p.name} width={40} height={40} className="rounded-full" />
                      : <div className="w-10 h-10 bg-zinc-700 rounded-full" />}
                  </td>
                  <td className="px-24p py-3">
                    {/* 반드시 uid 붙여서 상세로 이동 */}
                    <Link
                      href={`/userrankList/user?q=${encodeURIComponent(p.name)}&uid=${encodeURIComponent(p.player_id)}`}
                      className="text-primary hover:underline"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-24p py-3">
                    {p.last_updated_at ? new Date(p.last_updated_at * 1000).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
