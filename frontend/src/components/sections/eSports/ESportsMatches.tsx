"use client";

import Image from "next/image";
import Link from "next/link";
import clone from "@public/images/icons/clone.svg";
import { esportsmatches } from "@public/data/esportsmatches";
import { Modal } from "@/components/ui";
import { useState } from "react";
import { users } from "@public/data/users";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Pagination from "@/components/shared/Pagination";
import VotePanel from "./VotePanel";

const Maches = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 페이지당 보여줄 아이템 수

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(esportsmatches.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = esportsmatches.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="section-title">
        <div className="container">
          <div className="grid 4xl:grid-cols-12 grid-cols-1 gap-30p">
            <div className="4xl:col-start-2 4xl:col-end-12">
              <div className="flex-y justify-between flex-wrap gap-24p mb-30p">
                <h2 className="heading-2 text-w-neutral-1">예정된 경기</h2>
                <form className="px-20p py-16p max-w-[390px] flex items-center sm:gap-3 gap-2 min-w-[300px] bg-b-neutral-3 rounded-12">
                  <span className="flex-c icon-20 text-white">
                    <i className="ti ti-search"></i>
                  </span>
                  <input
                    autoComplete="off"
                    className="bg-transparent w-full"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search..."
                  />
                </form>
              </div>

              <div className="grid xl:grid-cols-1 md:grid-cols-2 grid-cols-1 justify-center max-xl:gap-x-30p divide-y divide-shap/70 4xl:px-[140px] px-80p px-120p py-80p bg-b-neutral-3">
                {currentItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center justify-between gap-4 w-full sm:py-6 py-5"
                  >
                    <div className="flex items-center justify-end gap-4 w-1/3 flex-1">
                      <Link
                        href={`/profile/${idx}`}
                        className="text-m-medium text-w-neutral-1 text-right line-clamp-1 link-1"
                      >
                        {item.leftPlayer.name}
                      </Link>
                      <Image
                        className="avatar size-48p shrink-0 object-contain"
                        width={40}
                        height={40}
                        src={item.leftPlayer.image}
                        alt={item.leftPlayer.name}
                      />
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <h5 className="text-xl text-white">{item.leftScore}</h5>
                      <div className="flex-col-c text-center">
                        <span className="badge badge-rounded px-3 py-2 badge-neutral-2 mb-2">
                          {item.status}
                        </span>
                        <Image src={clone} alt="clone" className="w-6 h-6" />{" "}
                      </div>
                      <h5 className="text-xl text-white">{item.rightScore}</h5>
                    </div>

                    <div className="flex items-center justify-start gap-4 w-1/3 flex-1">
                      <Image
                        className="avatar size-48p shrink-0 object-contain"
                        width={48}
                        height={48}
                        src={item.rightPlayer.image}
                        alt={item.rightPlayer.name}
                      />
                      <Link
                        href={`/profile/${idx}`}
                        className="text-m-medium text-w-neutral-1 text-left line-clamp-1 link-1"
                      >
                        {item.rightPlayer.name}
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenModal(idx)}
                      className="absolute right-0 icon-32 text-primary"
                    >
                      <i className="ti ti-chevrons-right"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-48p"
          />
        </div>
      </section>

      {/* Modal */}
      {openModal !== null && (
        <Modal open={openModal !== null} onClick={() => setOpenModal(null)}>
          <div className="relative bg-b-neutral-3 py-40p px-32p md:w-[680px] sm:w-[500px] xsm:w-[360px] w-[280px] rounded-20 overflow-hidden">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-3 right-3 flex items-center justify-center icon-32 bg-b-neutral-3 text-w-neutral-2 hover:text-primary transition-1 icon-24"
            >
              <i className="ti ti-circle-x"></i>
            </button>
            <div className="sm:h-[528px] h-[400px] overflow-y-auto scrollbar-sm">
              <div className="pr-2">
                <h3 className="heading-3 text-white mb-3 text-center">
                  Match {esportsmatches[openModal]?.id}
                </h3>
                <h6 className="heading-6 text-center">Best of 5 game</h6>
                <div className="mt-60p">
                  <div className="relative flex max-sm:flex-col items-center justify-center gap-y-30p gap-x-40p sm:pb-6 pb-5 mb-60p">
                    <div className="flex items-center gap-3 min- w-[180px]">
                      <div>
                        <Link
                          href="/profile"
                          className="text-m-medium text-w-neutral-1 line-clamp-1 link-1 mb-1"
                        >
                          {esportsmatches[openModal]?.leftPlayer?.name}
                        </Link>
                        <Link
                          href="/teams/1"
                          className="text-xs-medium text-secondary"
                        >
                          View Team
                        </Link>
                      </div>
                      <Image
                        className="avatar size-48p shrink-0 object-contain"
                        src={esportsmatches[openModal]?.leftPlayer?.image}
                        width={48}
                        height={48}
                        alt="user"
                      />
                    </div>
                    <div className="flex items-center gap-16p">
                      <h5 className="text-xl text-white">
                        {esportsmatches[openModal]?.leftScore}
                      </h5>
                      <div className="flex-col-c">
                        <span className="badge badge-rounded px-3 py-2 badge-neutral-2 mb-16p">
                          Waiting
                        </span>
                        <Image src={clone} alt="clone" />
                      </div>
                      <h5 className="text-xl text-white">
                        {esportsmatches[openModal]?.rightScore}
                      </h5>
                    </div>
                    <div className="flex items-center gap-3 min- w-[180px]">
                      <div>
                        <Link
                          href="/profile"
                          className="text-m-medium text-w-neutral-1 line-clamp-1 link-1 mb-1"
                        >
                          {esportsmatches[openModal]?.rightPlayer?.name}
                        </Link>
                        <Link
                          href="#"
                          className="text-xs-medium text-secondary"
                        >
                          View Team
                        </Link>
                      </div>
                      <Image
                        className="avatar size-48p shrink-0 object-contain"
                        width={48}
                        height={48}
                        src={esportsmatches[openModal]?.rightPlayer?.image}
                        alt="user"
                      />
                    </div>
                  </div>
                  <div>
                    <Tab.Group>
                      <Tab.List className="flex gap-x-32p text-base font-borda border-b border-secondary/30">
                        <Tab
                          className={({ selected }) =>
                            clsx(
                              "pb-4 border-b",
                              selected
                                ? "text-w-neutral-1 border-secondary"
                                : "text-w-neutral-4 border-transparent"
                            )
                          }
                        >
                          승부예측
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            clsx(
                              "pb-4 border-b",
                              selected
                                ? "text-w-neutral-1 border-secondary"
                                : "text-w-neutral-4 border-transparent"
                            )
                          }
                        >
                          투표
                        </Tab>
                      </Tab.List>

                      {/* Tab Panels */}
                      <Tab.Panels className="pt-60p">
                        {/* ======================================= */}
                        {/*          승부 예측 탭 패널             */}
                        {/* ======================================= */}
                        <Tab.Panel className="flex flex-col items-center gap-6">
                          <h4 className="text-xl font-bold text-white">
                            아테나의 승부 예측
                          </h4>

                          {/* --- 승리 확률 바 --- */}
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-white">
                                {esportsmatches[openModal]?.leftPlayer?.name}
                              </span>
                              <span className="font-semibold text-white">
                                {esportsmatches[openModal]?.rightPlayer?.name}
                              </span>
                            </div>
                            <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden">
                              {/* 예측 확률 (예시: 65%) */}
                              <div
                                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: "65%" }}
                              ></div>
                              <div className="absolute inset-0 flex justify-between items-center px-4 text-white font-bold">
                                <span>65%</span>
                                <span>35%</span>
                              </div>
                            </div>
                          </div>

                          {/* --- 분석 신뢰도 및 핵심 근거 --- */}
                          <div className="w-full p-4 bg-b-neutral-2 rounded-lg text-center">
                            <p className="text-sm text-gray-400">분석 신뢰도</p>
                            <p className="text-2xl font-bold text-white">85%</p>
                          </div>

                          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                            <div className="p-3 bg-b-neutral-2 rounded-lg">
                              <i className="ti ti-trending-up text-primary text-2xl"></i>
                              <p className="text-sm mt-1 text-white">
                                최근 경기 승률 우세
                              </p>
                            </div>
                            <div className="p-3 bg-b-neutral-2 rounded-lg">
                              <i className="ti ti-shield-check text-primary text-2xl"></i>
                              <p className="text-sm mt-1 text-white">
                                조합 상성 유리
                              </p>
                            </div>
                            <div className="p-3 bg-b-neutral-2 rounded-lg">
                              <i className="ti ti-target-arrow text-primary text-2xl"></i>
                              <p className="text-sm mt-1 text-white">
                                주요 딜러 KDA 압도
                              </p>
                            </div>
                          </div>
                        </Tab.Panel>

                        {/* Lineups Tab Content */}
                        {/* 투표 탭 패널 */}
                        <Tab.Panel>
                          {/* 2. VotePanel을 호출할 때, 필요한 선수 정보를 props로 전달합니다. */}
                          <VotePanel
                            leftPlayer={esportsmatches[openModal]?.leftPlayer}
                            rightPlayer={esportsmatches[openModal]?.rightPlayer}
                          />
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Maches;
