"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GameInfoTab = () => {
  const path = usePathname();

  const tabs = [
    {
      title: "홈",
      link: `/gameinfo`,
    },
    {
      title: "영웅정보",
      link: `/hero`,
    },
    {
      title: "영웅별유저통계",
      link: `/`,
    },
    {
      title: "맵정보",
      link: `/maps`,
    },
    {
      title: "유저랭킹",
      link: `/gameinfo/userrank`,
    },
    {
      title: "패치노트",
      link: `/patchnotes`,
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

export default GameInfoTab;
