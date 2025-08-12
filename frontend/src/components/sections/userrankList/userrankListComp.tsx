// src/components/sections/userrankList/UserrankListComp.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PlayerRow = {
  player_id: string;
  name: string;
  avatar?: string | null;
  last_updated_at?: number | null;
};

const API = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.31:4000";

export default function UserrankListComp({ initialQuery }: { initialQuery?: string }) {
  const q = useMemo(() => (initialQuery ?? "").trim(), [initialQuery]);
  const hasQuery = q.length > 0;

  const [loading, setLoading] = useState<boolean>(hasQuery);
  const [rows, setRows] = useState<PlayerRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();

    if (!hasQuery) {
      setLoading(false);
      setRows([]);
      setErr(null);
      return;
    }

    setLoading(true);
    setRows([]); // 쿼리 바뀔 때 이전 결과 지우기
    setErr(null);

    fetch(`${API}/api/players?name=${encodeURIComponent(q)}`, {
      cache: "no-store",
      signal: ac.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => setRows(d?.results ?? []))
      .catch((e) => {
        if (!ac.signal.aborted) setErr(e.message || "불러오기 실패");
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    return () => ac.abort();
  }, [q, hasQuery]);

  const showEmpty = hasQuery && !loading && rows.length === 0 && !err;

  const Breadcrumb = () => (
    <section >
      <div className="section-pt">
        <div className="relative bg-[url('/images/game_hero/hero_portrait_bg/Tracer_heroImage_3.jpg')] bg-cover bg-no-repeat rounded-24 overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]">
              <div className="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2 className="heading-2 text-w-neutral-1 mb-3">
                  전적검색
                </h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/home" className="breadcrumb-link">
                      홈
                    </Link>
                    <span className="breadcrumb-icon">
                      <i className="ti ti-chevrons-right"></i>
                    </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span className="breadcrumb-current">
                      검색결과{hasQuery ? `: "${q}"` : ""}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="overlay-11"></div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {/* 상단 배너 + 브레드크럼 (요청한 디자인) */}
      <Breadcrumb />

      {/* 리스트 섹션 */}
      <section className="section-pb pt-60p">
        <div className="container">
          {/* 상태 UI */}
          {hasQuery && loading && (
            <div className="py-10 text-center text-w-neutral-4">검색 중…</div>
          )}

          {showEmpty && (
            <div className="py-10 text-center text-w-neutral-4">
              검색결과가 없습니다{q ? `: ${q}` : ""}.
            </div>
          )}

          {err && <div className="py-10 text-center text-red-400">에러: {err}</div>}

          {/* 결과 테이블 */}
          {!loading && rows.length > 0 && (
            <div className="overflow-x-auto scrollbar-sm rounded-12 border border-shap bg-b-neutral-3">
              <table className="w-full text-l-medium font-poppins text-w-neutral-1 whitespace-nowrap">
                <thead className="text-left bg-shap">
                  <tr>
                    <th className="px-24p py-3 min-w-[80px]">#</th>
                    <th className="px-24p py-3 min-w-[120px]">아이콘</th>
                    <th className="px-24p py-3 min-w-[280px]">플레이어</th>
                    <th className="px-24p py-3 min-w-[220px]">최근 업데이트</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-solid divide-shap">
                  {rows.map((p, idx) => (
                    <tr key={p.player_id} className="hover:bg-white/5 transition">
                      <td className="px-24p py-3">{idx + 1}</td>
                      <td className="px-24p py-3">
                        {p.avatar ? (
                          <Image
                            src={p.avatar}
                            alt={p.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                            style={{ height: "auto" }}
                            referrerPolicy="no-referrer"
                            unoptimized
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-zinc-700" />
                        )}
                      </td>
                      <td className="px-24p py-3">
                        <Link
                          href={`/userrankList/user?q=${encodeURIComponent(p.name)}&uid=${encodeURIComponent(
                            p.player_id
                          )}`}
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
          )}
        </div>
      </section>
    </>
  );
}
