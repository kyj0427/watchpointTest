import { tournaments } from "@public/data/tournaments";
import { IconUsersGroup } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const AllTournamests = () => {
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid 3xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p">
          {tournaments?.map((item, idx) => (
            <div
              key={idx}
              className="bg-b-neutral-3 rounded-12 group"
              data-aos="zoom-in"
            >
              <div className="relative px-20p pt-20p">
                <div className="overflow-hidden rounded-12">
                  <Image
                    className="w-full sm:h-[270px] h-[220px] group-hover:scale-110 object-cover transition-1"
                    src={item?.image}
                    alt="game"
                  />
                </div>
                <span className="absolute left-10 -bottom-6 uppercase badge badge-xl badge-outline-primary text-base font-medium">
                  {item?.game}
                </span>
              </div>
              <div className="md:pt-48p pt-9 pb-40p px-40p">
                <span className="text-m-regular text-w-neutral-1 mb-3">
                  Ends {item?.endDate}, {item?.endTime}
                </span>
                <Link
                  href={`/tournaments/${item?.id}`}
                  className="heading-3 text-w-neutral-2 line-clamp-1 link-1 mb-3 text-split-bottom"
                >
                  {item?.title}
                </Link>
                <p className="text-m-regular text-w-neutral-4 line-clamp-2">
                  {item?.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-16p flex-wrap px-40p pt-24p pb-32p rounded-b-12 bg-b-neutral-2/20 border-t border-w-neutral-4/10">
                <div className="flex-y gap-x-40p justify-between">
                  <div>
                    <span className="text-m-medium text-w-neutral-4 mb-3">
                      Prize Pool
                    </span>
                    <div className="flex items-center gap-3">
                      <i className="ti ti-badge-filled icon-24 text-secondary"></i>
                      <span className="text-xl-medium text-w-neutral-1">
                        ${item?.prizePool}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-m-medium text-w-neutral-4 mb-3">
                      Player Count
                    </span>
                    <div className="flex items-center gap-3">
                      <IconUsersGroup size={24} className="text-primary" />
                      <span className="text-xl-medium text-w-neutral-1">
                        ${item?.playerCount}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/tournaments/${item?.id}`}
                  className="btn-c btn-c-3xl btn-primary"
                >
                  <i className="ti ti-arrow-up-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full mt-48p">
          <Link href="#" className="pagination-item pagination-prev">
            <i className="ti ti-chevron-left"></i>
          </Link>
          <div className="pagination-list">
            <Link href="#" className="pagination-item pagination-circle active">
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
    </section>
  );
};

export default AllTournamests;
