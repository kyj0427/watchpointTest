import Image from "next/image";
import TeamHeader from "./TeamHeader";
import Link from "next/link";
import RightAsideOne from "@/components/shared/RightAsideOne";
import { teamMembers } from "@public/data/teamMembers";
import { IconMessagePlus, IconUserPlus } from "@tabler/icons-react";
import TeamSearchHeader from "./TeamSearchHeader";

const TeamHome = () => {
  return (
    <section className="section-pb pt-30 overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10">
          <div className="4xl:col-span-9 xxl:col-span-8 col-span-12">
            <div>
              <TeamHeader />
              <div>
                <TeamSearchHeader searchName="Search Members..." />
                <p className="text-base text-w-neutral-1 mb-30p">
                  Viewing 1 - 5 of 5 active members
                </p>
                <div className="grid xxl+:grid-cols-3 xxl:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
                  {teamMembers?.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-b-neutral-3 rounded-12"
                      data-aos="zoom-in"
                    >
                      <div className="px-30p pt-30p pb-24p flex-col-c">
                        <Image
                          className="avatar size-120p mb-20p"
                          src={item?.image}
                          alt="user"
                        />
                        <Link
                          href="/profile"
                          className="heading-4 text-w-neutral-1 line-clamp-1 link-1"
                        >
                          {item?.name}
                        </Link>
                        <span className="text-base text-w-neutral-3">
                          {item?.timeAgo}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-shap border-t border-shap">
                        <button className="flex-y justify-start py-20p px-60p icon-24 text-w-neutral-1">
                          <IconUserPlus />
                        </button>
                        <button className="flex-y justify-end py-20p px-60p icon-24 text-w-neutral-1">
                          <IconMessagePlus />
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

export default TeamHome;
