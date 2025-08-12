"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";
import { Listbox } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useToggle } from "@/hooks";
// import dynamic from "next/dynamic"; // ← 클라이언트 전용 전환 시 사용

/* ----------------------------- types ----------------------------- */
interface MapInfo {
  name: string;
  slug?: string;
  screenshots?: string[];  // 새 포맷
  screenshot?: string;     // 구 포맷
  gamemodes: string[];
  location: string;
  country_code: string | null;
}

/* ---------------------- mount gate (hydration fix) ---------------------- */
function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* -------------------------------- comp --------------------------------- */
const MapList = () => {
  const mounted = useHasMounted(); // 마운트 전에는 아무것도 렌더하지 않음(SSR/CSR 초기 DOM 동일)

  const [maps, setMaps] = useState<MapInfo[]>([]);
  const [filteredMaps, setFilteredMaps] = useState<MapInfo[]>([]);

  const [selectedGamemode, setSelectedGamemode] = useState<string>("전체");
  const [sortBy, setSortBy] = useState<string>("오름차순");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 페이지당 아이템 수

  const filterTypes = ["오름차순", "내림차순"];

  // 맵 필터용 훅 (외부 클릭 닫힘 등)
  const {
    open: mapFilterOpen,
    handleToggle: mapFilterToggle,
    ref: mapFilterRef,
  } = useToggle();

  // 정렬 필터용 훅
  const {
    open: sortFilterOpen,
    handleToggle: sortFilterToggle,
    ref: sortFilterRef,
  } = useToggle();

  /* ----------------------- fetch + normalize ----------------------- */
  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const res = await fetch("http://192.168.0.31:4000/api/maps", {
          cache: "no-store",
        });
        const data = await res.json();

        const arr: MapInfo[] = Array.isArray(data)
          ? data
          : data?.hits?.hits
          ? data.hits.hits.map((hit: any) => hit?._source ?? {})
          : [];

        const normalized = arr
          .filter((m) => !!m && typeof m.name === "string") // 안전가드
          .map((m) => ({
            ...m,
            screenshots: Array.isArray(m.screenshots)
              ? m.screenshots
              : m.screenshot
              ? [m.screenshot]
              : [],
          }));

        setMaps(normalized);
      } catch (err) {
        console.error("맵 불러오기 실패:", err);
        setMaps([]); // 실패 시 빈 배열로 고정
      }
    };

    fetchMaps();
  }, []);

  /* -------------------- filter / search / sort --------------------- */
  useEffect(() => {
    let result = [...maps];

    if (selectedGamemode !== "전체") {
      result = result.filter((map) =>
        (map.gamemodes || []).includes(selectedGamemode)
      );
    }

    if (searchKeyword.trim() !== "") {
      const keyword = searchKeyword.trim().toLowerCase();
      result = result.filter((map) =>
        (map.name || "").toLowerCase().includes(keyword)
      );
    }

    if (sortBy === "오름차순") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "내림차순") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredMaps(result);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
  }, [maps, selectedGamemode, sortBy, searchKeyword]);

  /* ------------------------- derived values ------------------------ */
  const gamemodes = [
    "전체",
    ...Array.from(new Set(maps.flatMap((map) => map.gamemodes || []))),
  ];

  const totalPages = Math.ceil(filteredMaps.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaps.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /* ------------------------- mount gate view ------------------------ */
  if (!mounted) {
    // 서버와 클라 초기 DOM을 동일하게 유지하기 위해 null 반환 (필요시 스켈레톤도 가능)
    return null;
  }

  /* ------------------------------ view ----------------------------- */
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        {/* 검색 + 필터 + 정렬 */}
        <div className="flex items-center justify-between flex-wrap gap-24p pb-30p border-b border-shap">
          {/* 검색바 */}
          <div className="hidden lg:flex items-center sm:gap-3 gap-2 min-w-[300px] max-w-[670px] w-full px-20p py-16p bg-b-neutral-2 rounded-full">
            <span className="flex-c icon-20 text-white">
              <i className="ti ti-search"></i>
            </span>
            <input
              type="text"
              placeholder="맵 이름으로 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="bg-transparent w-full"
              name="search"
              id="searchMap"
            />
          </div>

          <div className="flex items-center max-sm:justify-center w-fit select-2 gap-28p max-w-[680px]">
            <span className="text-m-medium text-w-neutral-1 shrink-0">
              
            </span>

            {/* 맵 필터 */}
            <div className="relative">
              <Listbox
                // @ts-ignore: 외부 클릭 핸들용 ref 타입 경고 무시
                ref={mapFilterRef}
                value={selectedGamemode}
                onChange={setSelectedGamemode}
                as="div"
                className="dropdown group"
              >
                <Listbox.Button
                  onClick={mapFilterToggle}
                  className="dropdown-toggle toggle-2"
                >
                  {selectedGamemode}
                  <IconChevronDown
                    className={`${mapFilterOpen && "rotate-180"} icon-24`}
                  />
                </Listbox.Button>
                <Listbox.Options className="dropdown-content">
                  {gamemodes.map((mode) => (
                    <Listbox.Option
                      className={`dropdown-item ${
                        selectedGamemode === mode && "active"
                      }`}
                      key={mode}
                      value={mode}
                    >
                      {mode}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            {/* 정렬 필터 */}
            <div className="relative">
              <Listbox
                // @ts-ignore: 외부 클릭 핸들용 ref 타입 경고 무시
                ref={sortFilterRef}
                value={sortBy}
                onChange={setSortBy}
                as="div"
                className="dropdown group"
              >
                <Listbox.Button
                  onClick={sortFilterToggle}
                  className="dropdown-toggle toggle-2"
                >
                  {sortBy}
                  <IconChevronDown
                    className={`${sortFilterOpen && "rotate-180"} icon-24`}
                  />
                </Listbox.Button>
                <Listbox.Options className="dropdown-content">
                  {filterTypes.map((item) => (
                    <Listbox.Option
                      className={`dropdown-item ${
                        sortBy === item && "active"
                      }`}
                      key={item}
                      value={item}
                    >
                      {item}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>

        {/* 맵 카드 리스트 */}
        <div className="grid 3xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p mt-10">
          {currentItems.map((map, idx) => {
            const thumb =
              (map.screenshots && map.screenshots[0]) ||
              map.screenshot ||
              "/images/placeholder-16x9.png";

            return (
              <div
                key={map.slug ?? map.name ?? idx} // 안정 키
                className="bg-b-neutral-3 py-24p px-30p rounded-12 group"
              >
                <div className="overflow-hidden rounded-12">
                  <Image
                    className="w-full h-[202px] object-cover group-hover:scale-110 transition-1"
                    src={thumb}
                    alt={map.name}
                    width={320}
                    height={202}
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg text-white font-semibold">
                    {map.name}
                  </h3>
                  <p className="text-sm text-w-neutral-2">{map.location}</p>
                  <p className="text-sm text-w-neutral-4 mt-1">
                    🎮 {(map.gamemodes || []).join(", ")}
                  </p>
                </div>
                <Link
                  href={`/gameinfo/maps/${encodeURIComponent(map.name)}`}
                  className="btn btn-sm btn-primary rounded-10 mt-3 inline-block"
                >
                  상세 보기
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-48p"
      />
    </section>
  );
};

export default MapList;

/* ---------------- (옵션) SSR 완전 비활성화해서 클라 전용으로 ----------------
export default dynamic(() => Promise.resolve(MapList), { ssr: false });
------------------------------------------------------------------------- */
