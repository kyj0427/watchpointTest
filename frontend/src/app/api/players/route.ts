import { NextResponse } from "next/server";

const OVERFAST = process.env.OVERFAST_BASE ?? "http://localhost:8082";

type OFPlayer = {
  player_id: string;
  name: string;
  avatar?: string | null;
  last_updated_at?: number | null;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = (searchParams.get("name") || "").trim();
  const platform = (searchParams.get("platform") || "pc").trim(); // 선택

  if (!raw) return NextResponse.json({ total: 0, results: [] });

  // 패턴 판별
  const full = raw.match(/^([A-Za-z0-9_]+)[-#](\d{3,6})$/); // Name-12345 or Name#12345
  const digitsOnly = raw.match(/^\d{3,6}$/);                // 12345

  try {
    // 1) 이름+배틀태그 => 정확 1명
    if (full) {
      const username = full[1];
      const tag = full[2];
      const btag = `${username}-${tag}`;

      // Overfast 단일 요약 조회
      const r = await fetch(
        `${OVERFAST}/players/${encodeURIComponent(btag)}/summary?${new URLSearchParams({ platform })}`,
        { cache: "no-store" }
      );

      if (r.ok) {
        const d = await r.json();
        const one: OFPlayer = {
          player_id: btag,
          name: d?.username || username,
          avatar: d?.avatar ?? null,
          last_updated_at: d?.last_updated_at ?? null,
        };
        return NextResponse.json({ total: 1, results: [one] });
      }

      // summary 로 못 찾으면 (예: 캐시 미스) 목록 검색 fallback 후 exact filter
      const list = await fetch(
        `${OVERFAST}/players?${new URLSearchParams({ name: username, platform })}`,
        { cache: "no-store" }
      );
      if (!list.ok) {
        return NextResponse.json(
          { total: 0, results: [], error: `overfast ${list.status}` },
          { status: 500 }
        );
      }
      const data = await list.json();
      const exact = (data?.results ?? []).find((x: any) => x?.player_id === btag);
      if (!exact) return NextResponse.json({ total: 0, results: [] });

      return NextResponse.json({
        total: 1,
        results: [{
          player_id: exact.player_id,
          name: exact.name,
          avatar: exact.avatar ?? null,
          last_updated_at: exact.last_updated_at ?? null,
        }],
      });
    }

    // 2) 배틀태그만(숫자) => 해당 태그로 끝나는 계정만
    if (digitsOnly) {
      const tag = digitsOnly[0];

      // Overfast는 name 파라미터가 필요하므로 tag로 검색 후 후처리
      const r = await fetch(
        `${OVERFAST}/players?${new URLSearchParams({ name: tag, platform })}`,
        { cache: "no-store" }
      );
      if (!r.ok) {
        return NextResponse.json(
          { total: 0, results: [], error: `overfast ${r.status}` },
          { status: 500 }
        );
      }
      const data = await r.json();
      const filtered: OFPlayer[] = (data?.results ?? [])
        .filter((x: any) => typeof x?.player_id === "string" && x.player_id.endsWith(`-${tag}`))
        .map((x: any) => ({
          player_id: x.player_id,
          name: x.name,
          avatar: x.avatar ?? null,
          last_updated_at: x.last_updated_at ?? null,
        }));

      return NextResponse.json({ total: filtered.length, results: filtered });
    }

    // 3) 이름만 => 동명이인 여러 명 (부분/유사 검색은 Overfast가 수행)
    const r = await fetch(
      `${OVERFAST}/players?${new URLSearchParams({ name: raw, platform })}`,
      { cache: "no-store" }
    );
    if (!r.ok) {
      return NextResponse.json(
        { total: 0, results: [], error: `overfast ${r.status}` },
        { status: 500 }
      );
    }
    const data = await r.json();
    const results: OFPlayer[] = (data?.results ?? []).map((x: any) => ({
      player_id: x.player_id,
      name: x.name,
      avatar: x.avatar ?? null,
      last_updated_at: x.last_updated_at ?? null,
    }));

    return NextResponse.json({ total: results.length, results });
  } catch (e: any) {
    return NextResponse.json(
      { total: 0, results: [], error: e?.message || "proxy failed" },
      { status: 500 }
    );
  }
}
