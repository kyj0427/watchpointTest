// src/app/api/patch/[id]/route.ts
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const patchId = decodeURIComponent(params.id);

  const result = await fetch("http://192.168.0.31:9200/test_patchnotes_live/_search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from("elastic:watchpoint1234!").toString("base64"),
    },
    body: JSON.stringify({
      query: { match: { anchor_id: patchId } },
      size: 1,
    }),
    cache: "no-store",
  });

  const data = await result.json();
  const hit = data.hits?.hits?.[0]?._source;

  if (!hit) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(hit), {
    headers: { "Content-Type": "application/json" },
  });
}
