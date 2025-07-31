import Image from "next/image";
import TeamHeader from "./TeamHeader";
import Link from "next/link";
import RightAsideOne from "@/components/shared/RightAsideOne";
import { teamTournament } from "@public/data/teamTournament";

const TeamTournament = () => {
  return (
    <section className="section-pb pt-30 overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10">
          <div className="4xl:col-span-9 xxl:col-span-8 col-span-12">
            <div>
              <TeamHeader />
              <div>
                <div className="grid 4xl:grid-cols-1 3xl:grid-cols-3 xxl:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-20p">
                  {teamTournament?.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid 4xl:grid-cols-11 grid-cols-1 gap-y-24p 4xl:divide-x divide-shap bg-b-neutral-3 p-40p rounded-12 4xl:text-left text-center"
                    >
                      <div className="4xl:col-span-3">
                        <div className="flex-y max-4xl:justify-center gap-3">
                          <Image
                            className="avatar size-60p"
                            src={item?.image}
                            alt="team"
                          />
                          <Link
                            href={`/tournaments/${item?.id}`}
                            className="text-xl-medium text-w-neutral-1 line-clamp-1 link-1"
                          >
                            {item?.teamName}
                          </Link>
                        </div>
                      </div>
                      <div className="4xl:col-span-2 flex-col-c">
                        <div>
                          <span className="text-xl-medium text-w-neutral-1 mb-1">
                            {item?.player}
                          </span>
                          <span className="text-base text-w-neutral-1">
                            {item?.status}
                          </span>
                        </div>
                      </div>
                      <div className="4xl:col-span-2 flex-col-c">
                        <div>
                          <span className="text-xl-medium text-w-neutral-1 mb-1">
                            Prize
                          </span>
                          <div className="flex-y gap-2 text-secondary">
                            <i className="ti ti-trophy icon-24"></i>
                            <span className="text-base">{item?.prize}</span>
                          </div>
                        </div>
                      </div>
                      <div className="4xl:col-span-4 flex items-center 4xl:justify-between justify-center max-4xl:flex-col gap-y-24p">
                        <div className="4xl:ml-[70px]">
                          <span className="text-xl-medium text-w-neutral-1 mb-1">
                            Time
                          </span>
                          <div className="flex-y gap-2 text-secondary">
                            <i className="ti ti-clock-hour-3 icon-24"></i>
                            <span className="text-base">{item?.time}</span>
                          </div>
                        </div>
                        <button
                          className="modal-open-btn btn btn-md btn-neutral-4 rounded-12"
                          data-video-url={item?.videoUrl}
                        >
                          Live Now
                          <i className="ti ti-player-play icon-24"></i>
                        </button>
                      </div>
                    </div>
                  ))}
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

export default TeamTournament;
