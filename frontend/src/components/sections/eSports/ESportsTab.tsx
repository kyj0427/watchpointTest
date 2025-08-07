"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ESportTab = () => {
  const path = usePathname();

  const tabs = [
    {
      title: "홈",
      link: `/e-sports`,
    },
    {
      title: "대회일정",
      link: `/e-sports/tournaments`,
    },
    {
      title: "승부예측",
      link: `/e-sports/predictions`,
    },
    {
      title: "프로랭킹",
      link: `/e-sports/pro-ranks`,
    },
    {
      title: "프로선수정보",
      link: `/e-sports/pro-players`,
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

export default ESportTab;
