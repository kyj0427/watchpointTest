"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TournamentsTab = () => {
  const path = usePathname();
  const id = path.split("/")[2];

  const tabs = [
    {
      title: "Overview",
      link: `/tournaments/${id}`,
    },
    {
      title: "Prizes",
      link: `/tournaments/${id}/prizes`,
    },
    {
      title: "Participants",
      link: `/tournaments/${id}/participants`,
    },
    {
      title: "Matches",
      link: `/tournaments/${id}/matches`,
    },
    {
      title: "Brackets",
      link: `/tournaments/${id}/brackets`,
    },
  ];

  return (
    <div className="tab-navbar flex items-center flex-wrap gap-x-32p gap-y-24p sm:text-xl text-lg *:font-borda font-medium text-w-neutral-1 whitespace-nowrap pt-30p">
      {tabs?.map((item, idx) => (
        <Link
          className={`${item?.link === path && "active"}`}
          key={idx}
          href={`${item?.link}`}
        >
          {item?.title}
        </Link>
      ))}
    </div>
  );
};

export default TournamentsTab;
