"use client";
import Image from "next/image";
import Link from "next/link";
import { IconCheck, IconUserPlus } from "@tabler/icons-react";
import ProTeamsFilter from "./ProTeamsFilter";
import { proteamData } from "@public/data/proteamData";
import { proplayerData } from "@public/data/proplayerData";
import { useState } from "react";
import Pagination from "@/components/shared/Pagination";

const ProTeamList = () => {
  // 팀별 선수 필터링
  const getTeamPlayers = (teamId: number) => {
    return proplayerData.filter((player) => player.team_id === teamId);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // 페이지당 보여줄 아이템 수

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(proteamData.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = proteamData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="section-title">
      <div className="container">
        <h2 className="heading-2 text-w-neutral-1 mb-3">프로팀</h2>
        <div className="flex items-center justify-between flex-wrap gap-24p mb-30p">
          <h5 className="heading-5 text-w-neutral-1">
            Viewing 1 - {proteamData?.length} of {proteamData?.length} 팀
          </h5>
          <ProTeamsFilter />
        </div>
        <div className="grid 4xl:grid-cols-4 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p">
          {currentItems?.map((item, idx) => (
            <div
              key={item.team_id}
              className="bg-b-neutral-3 rounded-12 p-32p border border-transparent hover:border-accent-7 group transition-1"
              data-aos="zoom-in"
            >
              <div className="flex items-start justify-between gap-24p mb-24p">
                <div className="flex-y flex-wrap gap-3">
                  <Image
                    className="avatar size-60p object-contain"
                    src={item?.logo}
                    alt={item?.team_name}
                  />
                  <div>
                    <Link
                      href={`pro-teams/${item.team_id}`}
                      className="text-xl-medium text-w-neutral-1 link-1"
                    >
                      {item?.team_name}
                    </Link>
                    {/* <span className="text-m-medium text-w-neutral-3">
                      {item?.team_name}
                    </span> */}
                  </div>
                </div>
                {/* <button className="btn-c btn-c-lg btn-c-light-outline shrink-0">
                  {item?.players ? <IconUserPlus /> : <IconCheck />}
                </button> */}
              </div>
              <div className="grid grid-cols-2 gap-16p mb-30p">
                <div>
                  <span className="text-m-medium text-w-neutral-4 mb-1 block">
                    승률
                  </span>
                  <div className="flex items-center gap-2 text-l-medium text-w-neutral-1">
                    <i className="ti ti-trophy icon-24 flex-shrink-0"></i>
                    <span className="truncate">{item?.win_rate}</span>
                  </div>
                </div>
                <div>
                  <span className="text-m-medium text-w-neutral-4 mb-1 block">
                    지역
                  </span>
                  <div className="text-l-medium text-w-neutral-1 truncate">
                    {item?.region}
                  </div>
                </div>
                {/* <div>
                  <span className="text-m-medium text-w-neutral-4 mb-1">
                    EARNINGS
                  </span>
                  <span className="text-l-medium text-w-neutral-1">
                    ${item?.earnings} USD
                  </span>
                </div> */}
              </div>

              <div className="flex-y flex-wrap justify-between gap-24p pt-32p border-t border-t-shap">
                <div className="flex items-center *:size-40p *:shrink-0 *:size-40p *:border *:border-white *:-ml-3 ml-3">
                  {getTeamPlayers(item.team_id)
                    ?.slice(0, 5)
                    ?.map((player, idx) => (
                      <Image
                        key={player.player_id}
                        className="avatar"
                        src={player.player_img_url}
                        alt={player.player_name}
                      />
                    ))}
                  {/* <span className="flex-c rounded-full bg-[#333333] text-s-medium text-w-neutral-1">
                    +{item?.players?.length - 4}
                  </span> */}
                </div>
                <Link
                  href={`pro-teams/${item.team_id}`}
                  className="btn px-16p py-2 btn-outline-secondary group-hover:bg-secondary group-hover:text-b-neutral-4"
                >
                  팀 상세 정보
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-48p"
        />
      </div>
    </section>
  );
};

export default ProTeamList;
