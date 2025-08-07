// /app/api/maps/[name]/route.ts
import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);

  // 🔹 Elasticsearch 요청
  const esRes = await fetch('http://192.168.0.31:9200/test_overwatch_maps/_search', {
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

  const data = await esRes.json();
  if (data.hits.hits.length === 0) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  const mapData = data.hits.hits[0]._source;

  // 🔸 폴더명 변환
  const normalize = (str: string) =>
    str.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['’":]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();

  const folderName = normalize(name);

 // 🔹 이미지 병합
const publicPath = path.join(process.cwd(), "public", "map", "img");
let screenshots: string[] = [];

try {
  const files = await fs.readdir(publicPath);
  const matchingFiles = files
    .filter((file) =>
      new RegExp(`^map_${folderName}(?:_\\d+)?\\.(png|jpg|jpeg|webp)$`, "i").test(file)
    )
    .sort();

  screenshots = matchingFiles.map((file) => `/map/img/${file}`);
} catch (e) {
  console.error("이미지 병합 오류:", e);
}

  // 🔹 설명 Markdown 읽기
  const mdPath = path.join(process.cwd(), "public", "map", `map_${folderName}.md`);
  let description = null;

  try {
    if (existsSync(mdPath)) {
      description = await fs.readFile(mdPath, "utf-8");
    }
  } catch (e) {
    console.error("설명 불러오기 오류:", e);
  }
  // 🔚 최종 응답
  return new Response(
    JSON.stringify({
      ...mapData,
      screenshots: screenshots.length > 0 ? screenshots : [mapData.screenshot],
      description,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
