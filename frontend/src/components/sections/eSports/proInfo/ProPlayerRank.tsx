"use client";

import Image from "next/image";
import { proplayerData } from "@public/data/proplayerData";
import { useMemo, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { proteamData } from "@public/data/proteamData";
import Link from "next/link";

const ProPlayerRank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 보여줄 아이템 수

  //프로선수 정보 / 팀정보 조인
  const joinedData = useMemo(() => {
    return proplayerData.map((player) => {
      const teamInfo = proteamData.find(
        (team) => team.team_id === player.team_id
      );
      return {
        ...player,
        team_name: teamInfo?.team_name || "UnKnown",
        team_logo: teamInfo?.logo,
      };
    });
  }, []);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(joinedData.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = joinedData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="section-pb pt-10p">
      <div className="container">
        <h2 className="heading-2 text-w-neutral-1 text-split-left mb-3">
          선수 랭킹
        </h2>
        <div className="overflow-x-auto scrollbar-sm" data-aos="zoom-in">
          <table className="text-l-medium font-poppins text-w-neutral-1 w-full whitespace-nowrap">
            <thead className="text-left">
              <tr className="bg-shap rounded-t-12">
                <th className="text-l-medium px-24p py-3 lg:min-w-[150px] min-w-25">
                  순위
                </th>
                <th className="px-24p py-3 min-w-[100px]">역할군</th>
                <th className="px-24p py-3 min-w-[120px]">주영웅</th>
                <th className="text-l-medium px-24p py-3 lg:min-w-[300px] min-w-[280px]">
                  플레이어
                </th>

                <th className="text-l-medium px-24p py-3 min-w-25">승률</th>
                <th className="text-l-medium px-24p py-3 min-w-25">
                  선수포인트
                </th>
                <th className="text-l-medium px-24p py-3 min-w-25">소속팀</th>
                <th className="text-l-medium px-24p py-3 min-w-25">지역</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3">
              {currentItems?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-24p py-3">
                    <div className="flex items-center gap-3">
                      <i className="ti ti-chevrons-up icon-24 text-danger" />
                      <span className="text-l-medium">{item?.player_rank}</span>
                    </div>
                  </td>

                  <td className="px-24p py-3">
                    <span className="text-l-medium">
                      {item?.player_position}
                    </span>
                  </td>

                  <td className="px-24p py-3">
                    <div className="flex items-center *:avatar *:size-10 *:border *:border-white *:-ml-3 ml-3">
                      {item?.signature_hero?.slice(0, 3)?.map((avatar, idx) => (
                        <Image key={idx} src={avatar} alt="heros" />
                      ))}
                    </div>
                  </td>

                  <td className="px-24p py-3">
                    <Link
                      href={`pro-players/${item.player_id}`}
                      className="btn px-16p py-2 btn-outline-secondary group-hover:bg-secondary group-hover:text-b-neutral-4"
                    >
                      {item?.player_name}
                    </Link>
                  </td>

                  <td className="px-24p py-3">{item?.win_rate}%</td>
                  <td className="px-24p py-3">{item?.player_ability}</td>
                  <td className="px-24p py-3">{item?.team_name}</td>
                  <td className="px-24p py-3">{item?.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징 컴포넌트 */}
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

export default ProPlayerRank;
