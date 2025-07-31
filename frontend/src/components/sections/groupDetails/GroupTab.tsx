"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GroupTab = () => {
  const path = usePathname();
  const id = path.split("/")[2];

  const tabs = [
    {
      title: "Home",
      link: `/groups/${id}`,
    },
    {
      title: "Groups",
      link: `/groups/${id}/related-groups`,
    },
    {
      title: "Forum",
      link: `/groups/${id}/forum`,
    },
    {
      title: "Members",
      link: `/groups/${id}/members`,
    },
    {
      title: "Media",
      link: `/groups/${id}/media`,
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

export default GroupTab;
