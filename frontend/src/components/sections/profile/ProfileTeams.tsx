import { teams } from "@public/data/teams";
import { IconCheck, IconUserPlus } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const ProfileTeams = () => {
  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid 4xl:grid-cols-4 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24p">
          {teams?.map((item, idx) => (
            <div
              key={idx}
              className="bg-b-neutral-3 rounded-12 p-32p border border-transparent hover:border-accent-7 group transition-1"
              data-aos="zoom-in"
            >
              <div className="flex items-start justify-between gap-24p mb-24p">
                <div className="flex-y flex-wrap gap-3">
                  <Image
                    className="avatar size-60p"
                    src={item?.avatar}
                    alt={item?.name}
                  />
                  <div>
                    <Link
                      href="/team-home"
                      className="text-xl-medium text-w-neutral-1 link-1"
                    >
                      {item?.name}
                    </Link>
                    <span className="text-m-medium text-w-neutral-3">
                      {item?.subteam}
                    </span>
                  </div>
                </div>
                <button className="btn-c btn-c-lg btn-c-light-outline shrink-0">
                  {item?.status ? <IconUserPlus /> : <IconCheck />}
                </button>
              </div>
              <div className="flex-y flex-wrap gap-20p whitespace-nowrap mb-32p">
                <div>
                  <span className="text-m-medium text-w-neutral-4 mb-1">
                    AVG Rank
                  </span>
                  <div className="flex-y gap-2 text-l-medium text-w-neutral-1">
                    <i className="ti ti-diamond icon-24"></i>
                    <span>{item?.avgRank}</span>
                  </div>
                </div>
                <div>
                  <span className="text-m-medium text-w-neutral-4 mb-1">
                    RECION
                  </span>
                  <div className="text-l-medium text-w-neutral-1">
                    {item?.region}
                  </div>
                </div>
                <div>
                  <span className="text-m-medium text-w-neutral-4 mb-1">
                    EARNINGS
                  </span>
                  <span className="text-l-medium text-w-neutral-1">
                    ${item?.earnings} USD
                  </span>
                </div>
              </div>
              <div className="flex-y flex-wrap justify-between gap-24p pt-32p border-t border-t-shap">
                <div className="flex items-center *:size-40p *:shrink-0 *:size-40p *:border *:border-white *:-ml-3 ml-3">
                  {item?.members?.slice(0, 4)?.map((item, idx) => (
                    <Image
                      key={idx}
                      className="avatar"
                      src={item?.avatar}
                      alt="user"
                    />
                  ))}
                  <span className="flex-c rounded-full bg-[#333333] text-s-medium text-w-neutral-1">
                    +{item?.members?.length - 4}
                  </span>
                </div>
                <Link
                  href="/team-home"
                  className="btn px-16p py-2 btn-outline-secondary group-hover:bg-secondary group-hover:text-b-neutral-4"
                >
                  View Team
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

export default ProfileTeams;
