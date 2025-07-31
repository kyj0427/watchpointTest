import { games } from "@public/data/games";
import Image from "next/image";
import Link from "next/link";
import GameSidebar from "./GameSidebar";

const AllGames = () => {
  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10">
          <div className="xxl:col-span-9 xl:col-span-8 col-span-12 xl:order-1 order-2">
            <div className="grid xxl:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {games?.map((item, idx) => (
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
                      href="/game-details-one"
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
                <Link href="#" className="pagination-item pagination-circle">
                  <span className="pagination-link">2</span>
                </Link>
                <Link href="#" className="pagination-item pagination-circle">
                  <span className="pagination-link">3</span>
                </Link>
                <Link href="#" className="pagination-item pagination-circle">
                  <span className="pagination-link">4</span>
                </Link>
                <Link href="#" className="pagination-item pagination-circle">
                  <span className="pagination-link">5</span>
                </Link>
                <Link href="#" className="pagination-item pagination-circle">
                  <span className="pagination-link pagination-more">...</span>
                </Link>
                <Link href="#" className="pagination-item pagination-circle">
                  <span className="pagination-link">10</span>
                </Link>
              </div>
              <Link href="#" className="pagination-item pagination-next">
                <i className="ti ti-chevron-right"></i>
              </Link>
            </div>
          </div>
          <div className="xxl:col-span-3 xl:col-span-4 col-span-12 order-1 xl:order-2 relative">
            <GameSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllGames;
