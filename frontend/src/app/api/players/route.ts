import { NextResponse } from "next/server";

const OVERFAST = process.env.OVERFAST_BASE ?? "http://localhost:8082";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get("name") || "").trim();
  if (!name) return NextResponse.json({ total: 0, results: [] });

  // Overfast에 그대로 프록시
  const r = await fetch(`${OVERFAST}/players?${new URLSearchParams({ name })}`, { cache: "no-store" });
  if (!r.ok) {
    return NextResponse.json({ total: 0, results: [], error: `overfast ${r.status}` }, { status: 500 });
  }
  const data = await r.json();

  // 프론트에서 쓰는 최소 필드만 정리
  return NextResponse.json({
    total: data.total ?? 0,
    results: (data.results ?? []).map((x: any) => ({
      player_id: x.player_id,
      name: x.name,
      avatar: x.avatar,
      last_updated_at: x.last_updated_at,
    })),
  });
}
