import Image from "next/image";
import TeamHeader from "./TeamHeader";
import Link from "next/link";
import RightAsideOne from "@/components/shared/RightAsideOne";
import { teamPlayerRanks } from "@public/data/teamPlayerRanks";

const TeamRanks = () => {
  return (
    <section className="section-pb pt-30 overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10">
          <div className="4xl:col-span-9 xxl:col-span-8 col-span-12">
            <div>
              <TeamHeader />
              <div>
                <div className="bg-b-neutral-3 p-40p rounded-12">
                  <div className="overflow-x-auto scrollbar-sm text-left">
                    <table className="w-full ">
                      <thead className="bg-b-neutral-4/40 text-base">
                        <tr>
                          <th className="py-3 px-40p font-normal min-w-30 w-[268px]">
                            #
                          </th>
                          <th className="p-3 font-normal min-w-[232px] w-[294px]">
                            Player
                          </th>
                          <th className="p-3 font-normal min-w-[180px] w-[294px]">
                            Profit
                          </th>
                          <th className="p-3 font-normal min-w-[180px] w-[294px]">
                            wagered
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-b-neutral-4 divide-y divide-solid divide-shap border-y border-shap text-m-regular text-w-neutral-1">
                        {teamPlayerRanks.map((player, idx) => (
                          <tr key={idx} className={player.textColorClass || ""}>
                            <td className="py-3 px-40p">
                              {player.rank ? (
                                <Image
                                  className="w-[30px]"
                                  src={player.rank}
                                  alt="rank"
                                  width={30}
                                  height={30}
                                />
                              ) : (
                                player.id
                              )}
                            </td>
                            <td className="p-3">
                              <div className="flex-y gap-2.5">
                                <Image
                                  className="rounded-full size-8"
                                  src={player.image}
                                  alt={player.name}
                                  width={32}
                                  height={32}
                                />
                                <Link href="/profile">{player.name}</Link>
                              </div>
                            </td>
                            <td className="p-3">
                              {player.primaryScore.toFixed(10)}
                            </td>
                            <td className="p-3">
                              {player.secondaryScore.toFixed(10)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full mt-48p">
                  <Link href="#" className="pagination-item pagination-prev">
                    <i className="ti ti-chevron-left"></i>
                  </Link>
                  <div className="pagination-list">
                    <Link
                      href="#"
                      className="pagination-item pagination-circle active"
                    >
                      <span className="pagination-link">1</span>
                    </Link>
                    <Link
                      href="#"
                      className="pagination-item pagination-circle"
                    >
                      <span className="pagination-link">2</span>
                    </Link>
                    <Link
                      href="#"
                      className="pagination-item pagination-circle"
                    >
                      <span className="pagination-link">3</span>
                    </Link>
                    <Link
                      href="#"
                      className="pagination-item pagination-circle"
                    >
                      <span className="pagination-link">4</span>
                    </Link>
                    <Link
                      href="#"
                      className="pagination-item pagination-circle"
                    >
                      <span className="pagination-link">5</span>
                    </Link>
                    <Link
                      href="#"
                      className="pagination-item pagination-circle"
                    >
                      <span className="pagination-link pagination-more">
                        ...
                      </span>
                    </Link>
                    <Link
                      href="#"
                      className="pagination-item pagination-circle"
                    >
                      <span className="pagination-link">10</span>
                    </Link>
                  </div>
                  <Link href="#" className="pagination-item pagination-next">
                    <i className="ti ti-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="4xl:col-span-3 xxl:col-span-4 col-span-12 relative">
            <div className="xxl:sticky xxl:top-30">
              <RightAsideOne />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamRanks;
