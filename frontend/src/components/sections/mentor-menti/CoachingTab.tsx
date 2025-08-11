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
      link: `/athena/library`,
    },
    // {
    //   title: "강의",
    //   link: `/coaching/mentoring-lists`,
    // },
    {
      title: "내 강의",
      link: `/coaching/mypage`,
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
