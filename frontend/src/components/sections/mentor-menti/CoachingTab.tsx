"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CoachingTab = () => {
  const path = usePathname();

  const tabs = [
    {
      title: "홈",
      link: `/coaching`,
    },
    {
      title: "Athena",
      link: `/coaching/athena/analysis`,
    },
    {
      title: "강의 등록",
      link: `/coaching/mentor-menti/courseRegister`,
    },
    {
      title: "내 강의",
      link: `/profile/teams`,
    },
    {
      title: "Groups",
      link: `/profile/groups`,
    },
    {
      title: "Forum",
      link: `/profile/forums`,
    },
    {
      title: "Videos",
      link: `/profile/videos`,
    },
    {
      title: "Achievements",
      link: `/profile/achievements`,
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

export default CoachingTab;
