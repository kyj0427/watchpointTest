"use client";

import teamCover1 from "@public/images/teams/teamCover1.png";
import team22 from "@public/images/teams/team22.webp";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TeamHeader = () => {
  const pathname = usePathname();

  const tabs = [
    { name: "Members", href: "/team-home" },
    { name: "Games", href: "/team-games" },
    { name: "Ranks", href: "/team-ranks" },
    { name: "Tournament", href: "/team-tournament" },
  ];

  return (
    <div className="bg-b-neutral-3 mb-30p">
      <div className="glitch-effect rounded-t-12 overflow-hidden">
        <div className="glitch-thumb">
          <Image
            className="w-full 3xl:h-[428px] lg:h-[400px] md:h-[340px] sm:h-[280px] h-[240px] object-cover"
            src={teamCover1}
            alt="image"
          />
        </div>
        <div className="glitch-thumb">
          <Image
            className="w-full 3xl:h-[428px] lg:h-[400px] md:h-[340px] sm:h-[280px] h-[240px] object-cover"
            src={teamCover1}
            alt="image"
          />
        </div>
      </div>
      <div className="px-40p xl:py-[26px] py-24p z-[5]">
        <div className="flex md:flex-row flex-col md:items-end items-center  md:text-left text-center gap-3 py-4 xxl:-mt-30 xl:-mt-15 max-md:-mt-20 relative z-[2]">
          <Image
            className="avatar xxl:size-[160px] xl:size-[140px] size-[120px] border-2 border-secondary"
            src={team22}
            alt="group profile"
          />
          <div>
            <h4 className="heading-4 text-w-neutral-1 mb-2">Quantum Blaze</h4>
            <p className="text-sm text-w-neutral-3">Team Wolves</p>
          </div>
        </div>
        <div className="tab-navbar flex items-center flex-wrap gap-x-32p gap-y-24p sm:text-xl text-lg *:font-borda  font-medium text-w-neutral-1 whitespace-nowrap pt-16p border-t border-shap">
          {tabs?.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`${
                pathname === tab.href ? "active" : ""
              } transition-all`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
