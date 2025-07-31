import Image from "next/image";
import TeamHeader from "./TeamHeader";
import Link from "next/link";
import RightAsideOne from "@/components/shared/RightAsideOne";
import { games } from "@public/data/games";
import TeamSearchHeader from "./TeamSearchHeader";

const TeamGames = () => {
  return (
    <section className="section-pb pt-30 overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10">
          <div className="4xl:col-span-9 xxl:col-span-8 col-span-12">
            <div>
              <TeamHeader />
              <div>
                <TeamSearchHeader searchName="Search Games..." />
                <p className="text-base text-w-neutral-1 mb-30p">
                  Viewing 1 - 5 of 5 active members
                </p>

                <div className="grid 3xl:grid-cols-3 xxl:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
                  {games?.slice(12, 18)?.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-b-neutral-3 px-20p pt-20p pb-32p rounded-12"
                      data-aos="zoom-in"
                    >
                      <div className="glitch-effect rounded-12 overflow-hidden mb-24p">
                        <div className="glitch-thumb">
                          <Image
                            className="w-full md:h-[228px] h-[200px] object-cover"
                            src={item?.photo}
                            width={400}
                            height={228}
                            alt="Power Play"
                          />
                        </div>
                        <div className="glitch-thumb">
                          <Image
                            className="w-full md:h-[228px] h-[200px] object-cover"
                            src={item?.photo}
                            width={400}
                            height={228}
                            alt="Power Play"
                          />
                        </div>
                      </div>
                      <div>
                        <Link
                          href="/game-one-details"
                          className="heading-4 text-w-neutral-1 link-1 line-clamp-1 text-split-left"
                        >
                          {item?.title}
                        </Link>
                        <p className="text-l-regular text-w-neutral-2">
                          {item?.subtitle}
                        </p>
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

export default TeamGames;
