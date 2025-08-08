"use client";

import Image from "next/image";
import Link from "next/link";
import clone from "@public/images/icons/clone.svg";
import { esportsmatchespast } from "@public/data/esportsmatchespast";
import { Modal } from "@/components/ui";
import { useState } from "react";
import { users } from "@public/data/users";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

const Maches = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);

  return (
    <>
      <section className="section-title">
        <div className="container">
          <div className="grid 4xl:grid-cols-12 grid-cols-1 gap-30p">
            <div className="4xl:col-start-2 4xl:col-end-12">
              <div className="flex-y justify-between flex-wrap gap-24p mb-30p">
                <h2 className="heading-2 text-w-neutral-1">
                  지난 경기 ({esportsmatchespast.length})
                </h2>
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
                {esportsmatchespast.map((item, idx) => (
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
                  Match {esportsmatchespast[openModal]?.id}
                </h3>
                <h6 className="heading-6 text-center">Best of 1 game</h6>
                <div className="mt-60p">
                  <div className="relative flex max-sm:flex-col items-center justify-center gap-y-30p gap-x-40p sm:pb-6 pb-5 mb-60p">
                    <div className="flex items-center gap-3 min- w-[180px]">
                      <div>
                        <Link
                          href="/profile"
                          className="text-m-medium text-w-neutral-1 line-clamp-1 link-1 mb-1"
                        >
                          {esportsmatchespast[openModal]?.leftPlayer?.name}
                        </Link>
                        <Link
                          href="/teams/1"
                          className="text-xs-medium text-secondary"
                        >
                          View Team
                        </Link>
                      </div>
                      <Image
                        className="avatar size-48p shrink-0"
                        src={esportsmatchespast[openModal]?.leftPlayer?.image}
                        width={48}
                        height={48}
                        alt="user"
                      />
                    </div>
                    <div className="flex items-center gap-16p">
                      <h5 className="text-xl text-white">
                        {esportsmatchespast[openModal]?.leftScore}
                      </h5>
                      <div className="flex-col-c">
                        <span className="badge badge-rounded px-3 py-2 badge-neutral-2 mb-16p">
                          Waiting
                        </span>
                        <Image src={clone} alt="clone" />
                      </div>
                      <h5 className="text-xl text-white">
                        {esportsmatchespast[openModal]?.rightScore}
                      </h5>
                    </div>
                    <div className="flex items-center gap-3 min- w-[180px]">
                      <div>
                        <Link
                          href="/profile"
                          className="text-m-medium text-w-neutral-1 line-clamp-1 link-1 mb-1"
                        >
                          {esportsmatchespast[openModal]?.rightPlayer?.name}
                        </Link>
                        <Link
                          href="#"
                          className="text-xs-medium text-secondary"
                        >
                          View Team
                        </Link>
                      </div>
                      <Image
                        className="avatar size-48p shrink-0"
                        width={48}
                        height={48}
                        src={esportsmatchespast[openModal]?.rightPlayer?.image}
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
                          Games
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
                          Lineups
                        </Tab>
                      </Tab.List>

                      {/* Tab Panels */}
                      <Tab.Panels className="pt-60p">
                        {/* Games Tab Content */}
                        <Tab.Panel>
                          <div className="flex-col-c">
                            <span className="icon-40 text-w-neutral-4">
                              <i className="ti ti-list"></i>
                            </span>
                            <h6 className="heading-6 text-base text-w-neutral-1 my-2.5">
                              No Games
                            </h6>
                            <p className="text-s-medium text-w-neutral-1">
                              This Match Does Not Have Any Games Yet.
                            </p>
                          </div>
                        </Tab.Panel>

                        {/* Lineups Tab Content */}
                        <Tab.Panel>
                          <div className="grid grid-cols-1 gap-3 *:flex *:items-center *:gap-3">
                            {users?.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3"
                              >
                                <Image
                                  className="avatar size-8 shrink-0"
                                  src={item?.avatar}
                                  width={32}
                                  height={32}
                                  alt="user"
                                />
                                <Link href="/profile" className="link-1">
                                  {item?.name}
                                </Link>
                              </div>
                            ))}
                          </div>
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
