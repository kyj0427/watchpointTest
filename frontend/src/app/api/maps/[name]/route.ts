import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

/** 서버.js와 동일한 alias 표 */
const MAP_ALIASES: Record<string, string> = {
  "하나무라": "hanamura",
  "호라이즌 루나 콜로니": "horizon",
  "파리": "paris",
  "아누비스 신전": "anubis",
  "볼스카야 인더스트리": "volskaya",
  "아유타야": "ayutthaya",
  "부산": "busan",
  "네팔": "nepal",
  "일리오스": "ilios",
  "오아시스": "oasis",
  "리장 타워": "lijiang",
  "샤토 기야르": "chateau_guillard",
  "카네자카": "kanezaka",
  "말레벤토": "malevento",
  "페트라": "petra",
  "검은 숲": "black_forest",
  "카스티요": "castillo",
  "에코포인트: 남극": "ecopoint_antarctica",
  "네크로폴리스": "necropolis",
  "서킷 로얄": "circuit_royal",
  "도라도": "dorado",
  "루트 66": "route_66",
  "정크타운": "junkertown",
  "리알토": "rialto",
  "아바나": "havana",
  "감시기지: 지브롤터": "gibraltar",
  "샴발리 수도원": "shambali",
  "블리자드 월드": "blizzard_world",
  "눔바니": "numbani",
  "할리우드": "hollywood",
  "아이헨발데": "eichenwalde",
  "킹스 로우": "kings_row",
  "미드타운": "midtown",
  "파라이소": "paraiso",
  "콜로세오": "colosseo",
  "에스페란사": "esperanca",
  "뉴 퀸 스트리트": "new_queen_street",
  "남극 반도": "antarctic_peninsula",
  "뉴 정크 시티": "new_junk_city",
  "수라바사": "suravasa",
  "사모아": "samoa",
  "루나사피": "runasapi",
  "하나오카": "hanaoka",
  "아누비스의 왕좌": "throne_of_anubis",
  "고가도로": "gogadoro",
  "플라스 라크루아": "place_lacroix",
  "레드우드 댐": "redwood_dam",
  "아레나 빅토리아": "arena_victoriae",
  "연습장": "practice_range",
  "워크숍 챔버": "workshop_chamber",
  "워크숍 익스팬스": "workshop_expanse",
  "워크숍 그린 스크린": "workshop_green_screen",
  "워크숍 아일랜드": "workshop_island",
  "아틀리스": "aatlis",
};

// 영문 슬러그 생성 (폴백)
function slugify(s = "") {
  return String(s)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[:.'’]/g, "")
    .replace(/[^a-z0-9_]/g, "");
}

// 스크린샷 URL에서 파일명(확장자 제거) → slug 폴백
function slugFromScreenshot(url = "") {
  try {
    const u = new URL(url);
    const base = u.pathname.split("/").pop() || "";
    return base.replace(/\.[^.]+$/, "");
  } catch {
    const base = String(url).split("/").pop() || "";
    return base.replace(/\.[^.]+$/, "");
  }
}

export async function GET(_req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);

  // 1) ES 조회 (이름은 한글로 저장됨)
  const esRes = await fetch("http://192.168.0.31:9200/test_overwatch_maps/_search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("elastic:watchpoint1234!"),
    },
    body: JSON.stringify({
      query: { match_phrase: { name } },
      size: 1,
    }),
    cache: "no-store",
  });

  const data = await esRes.json();
  const hit = data?.hits?.hits?.[0]?._source;
  if (!hit) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  // 2) slug 결정: alias > 스크린샷 파일명 > slugify(name)
  const screenshotsRaw: string[] = Array.isArray(hit.screenshots)
    ? hit.screenshots
    : hit.screenshot
    ? [hit.screenshot]
    : [];

  const alias = MAP_ALIASES[name];
  const fallback = slugFromScreenshot(screenshotsRaw[0] || "");
  const folderSlug = alias || fallback || slugify(name);

  // 3) public 이미지 병합 (영문 슬러그 기반)
  const publicPath = path.join(process.cwd(), "public", "map", "img");
  let screenshots: string[] = [];

  try {
    const files = await fs.readdir(publicPath);
    const re = new RegExp(`^map_${folderSlug}(?:_\\d+)?\\.(png|jpg|jpeg|webp)$`, "i");
    const matching = files.filter((f) => re.test(f)).sort();
    screenshots = matching.map((f) => `/map/img/${f}`);
  } catch (e) {
    console.error("이미지 병합 오류:", e);
  }

  // 4) 마크다운(영문 슬러그 기반)
  const mdPath = path.join(process.cwd(), "public", "map", `map_${folderSlug}.md`);
  let description: string | null = null;
  try {
    if (existsSync(mdPath)) description = await fs.readFile(mdPath, "utf-8");
  } catch (e) {
    console.error("설명 불러오기 오류:", e);
  }

  // 5) 최종 응답(배열 보장 + 폴백)
  return new Response(
    JSON.stringify({
      name: hit.name, // 한글 유지
      gamemodes: hit.gamemodes || [],
      location: hit.location || "",
      country_code: hit.country_code ?? null,
      screenshots: screenshots.length ? screenshots : screenshotsRaw,
      description,
      slug: folderSlug,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
