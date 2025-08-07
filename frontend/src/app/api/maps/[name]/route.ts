// /app/api/maps/[name]/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  // Elasticsearch 등에서 해당 이름으로 검색
  const result = await fetch('http://192.168.0.31:9200/test_overwatch_maps/_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('elastic:watchpoint1234!')
    },
    body: JSON.stringify({
      query: { match: { name } },
      size: 1
    })
  });

  const data = await result.json();
  if (data.hits.hits.length === 0) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(data.hits.hits[0]._source), {
    headers: { "Content-Type": "application/json" },
  });
}
