"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";
import { Listbox } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useToggle } from "@/hooks";

interface MapInfo {
  name: string;
  screenshot: string;
  gamemodes: string[];
  location: string;
  country_code: string | null;
}

const MapList = () => {
  const [maps, setMaps] = useState<MapInfo[]>([]);
  const [filteredMaps, setFilteredMaps] = useState<MapInfo[]>([]);
  

  const [selectedGamemode, setSelectedGamemode] = useState<string>("전체");
  const [sortBy, setSortBy] = useState<string>("오름차순");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); //페이지당 아이템수

  const filterTypes = ["오름차순", "내림차순"];
  

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const res = await fetch("http://192.168.0.31:4000/api/maps");
        const data = await res.json();
        setMaps(data.hits.hits.map((hit: any) => hit._source));
      } catch (err) {
        console.error("맵 불러오기 실패:", err);
      }
    };

    fetchMaps();
  }, []);

  useEffect(() => {
    let result = [...maps];

    if (selectedGamemode !== "전체") {
      result = result.filter((map) =>
        map.gamemodes.includes(selectedGamemode)
      );
    }

    if (searchKeyword.trim() !== "") {
      const keyword = searchKeyword.trim().toLowerCase();
      result = result.filter((map) =>
        map.name.toLowerCase().includes(keyword)
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

  const gamemodes = [
    "전체",
    ...Array.from(new Set(maps.flatMap((map) => map.gamemodes))),
  ];

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(maps.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = maps.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  
  
  // 맵 필터용 훅
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

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        {/* 검색 + 필터 + 정렬 */}
        <div className="flex items-center justify-between flex-wrap gap-24p pb-30p border-b border-shap">
          
            {/* 검색바 */}
            <div className="hidden lg:flex items-center sm:gap-3 gap-2 min-w-[300px] max-w-[670px] w-full px-20p py-16p bg-b-neutral-2 rounded-full">
              <span className="flex-c icon-20 text-white"><i className="ti ti-search"></i></span>
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
                필터:
              </span>
              {/* 맵 필터 */}
              <div className="relative">
                <Listbox
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
              <div>
                <Listbox
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
                    {filterTypes.map((item, idx) => (
                      <Listbox.Option
                        className={`dropdown-item ${
                          sortBy === item && "active"
                        }`}
                        key={idx}
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
          {currentItems.map((map, idx) => (
            <div
              key={idx}
              className="bg-b-neutral-3 py-24p px-30p rounded-12 group"
            >
              <div className="overflow-hidden rounded-12">
                <Image
                  className="w-full h-[202px] object-cover group-hover:scale-110 transition-1"
                  src={map.screenshot}
                  alt={map.name}
                  width={320}
                  height={202}
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg text-white font-semibold">{map.name}</h3>
                <p className="text-sm text-w-neutral-2">{map.location}</p>
                <p className="text-sm text-w-neutral-4 mt-1">
                  🎮 {map.gamemodes.join(", ")}
                </p>
              </div>
              <Link
                href={`/gameinfo/maps/${encodeURIComponent(map.name)}`}
                className="btn btn-sm btn-primary rounded-10 mt-3 inline-block"
              >
                상세 보기
              </Link>
            </div>
          ))}
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
