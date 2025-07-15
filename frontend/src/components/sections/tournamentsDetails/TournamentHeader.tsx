"use client";

import Link from "next/link";
import TournamentCounter from "./TournamentCounter";
import TournamentsTab from "./TournamentsTab";
import { usePathname } from "next/navigation";
import { tournaments } from "@public/data/tournaments";

const TournamentHeader = () => {
  const path = usePathname();

  const tournament = tournaments?.find(
    (tournament) => tournament.id === path.split("/")[2]
  );

  return (
    <section className="pt-30p">
      <div className="section-pt">
        <div className="bg-[url('/images/photos/tournamentBanner.webp')] bg-cover bg-no-repeat rounded-24 overflow-hidden h-[416px]">
          <div className="container">
            <div className="grid grid-cols-12 gap-30p relative xl:py-[110px] md:py-30 sm:py-25 py-20 z-[2]">
              <div className="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2 className="heading-2 text-w-neutral-1 mb-3">
                  Tournament Details
                </h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="#" className="breadcrumb-link">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <span className="breadcrumb-icon">
                      <i className="ti ti-chevrons-right"></i>
                    </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span className="breadcrumb-current">
                      Tournament Details
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pb-30p overflow-visible relative grid 4xl:grid-cols-12 grid-cols-1 gap-30p lg:-mt-30 md:-mt-40 sm:-mt-48 -mt-56">
            <div className="4xl:col-start-2 4xl:col-end-12">
              <div
                className="relative z-10 grid 4xl:grid-cols-11 grid-cols-12 items-center gap-30p bg-b-neutral-3 shadow-4 p-40p rounded-24 xl:divide-x divide-shap/70"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <div className="3xl:col-span-4 col-span-12">
                  <div className="max-xl:flex-col-c max-xl:text-center">
                    <h3 className="heading-3 text-w-neutral-1 mb-20p">
                      {tournament?.title}
                    </h3>
                    <div className="flex-y flex-wrap max-xl:justify-center gap-16p">
                      <span className="badge badge-lg badge-primary">
                        {tournament?.startDate}, {tournament?.startTime}
                      </span>
                      <span className="badge badge-lg badge-secondary">
                        {tournament?.endDate}, {tournament?.endTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="3xl:col-span-4 xl:col-span-7 col-span-12 grid xl:grid-cols-2 grid-cols-1 gap-y-30p xl:divide-x divide-shap/70">
                  <div className="flex-col-c text-center">
                    <p className="text-m-medium text-w-neutral-1">
                      Tournament prize pool
                    </p>
                    <h3 className="py-3 heading-3 text-secondary text-center">
                      $ 750
                    </h3>
                    <span className="text-xl-medium text-center text-secondary">
                      VIEW PRIZES
                    </span>
                  </div>
                  <div className="flex-col-c text-center">
                    <p className="text-m-medium text-w-neutral-1">
                      Boosted prize pool
                    </p>
                    <h3 className="py-3 heading-3 text-center text-w-neutral-1">
                      $ 0
                    </h3>
                    <span className="text-xl-medium text-center text-primary">
                      VIEW PRIZES
                    </span>
                  </div>
                </div>
                <div className="3xl:col-span-3 xl:col-span-5 col-span-12">
                  <div className="flex xl:justify-end justify-center">
                    <div className="flex-col-c text-center">
                      <Link
                        href="#"
                        className="btn btn-md btn-primary rounded-12 mb-16p"
                      >
                        JOIN NOW !
                      </Link>
                      <TournamentCounter date={Date.now() + 570400000} />
                      <p className="text-s-medium text-w-neutral-4">
                        Registration ends on Feb 14 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <TournamentsTab />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentHeader;
