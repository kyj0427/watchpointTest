import Image from "next/image";
import Link from "next/link";
import groupLogo13 from "@public/images/groups/groupLogo13.png";
import groupDetails from "@public/images/groups/group1.1.png";
import users1 from "@public/images/users/user1.png";
import GroupTab from "./GroupTab";
import { IconWorld } from "@tabler/icons-react";

const GroupHeader = () => {
  return (
    <div className="bg-b-neutral-3">
      <div className="glitch-effect rounded-t-12 overflow-hidden">
        <div className="glitch-thumb">
          <Image
            className="w-full 3xl:h-[428px] lg:h-[400px] md:h-[340px] sm:h-[280px] h-[240px] object-cover"
            src={groupDetails}
            width={1920}
            height={428}
            alt="image"
          />
        </div>
        <div className="glitch-thumb">
          <Image
            className="w-full 3xl:h-[428px] lg:h-[400px] md:h-[340px] sm:h-[280px] h-[240px] object-cover"
            src={groupDetails}
            width={1920}
            height={428}
            alt="image"
          />
        </div>
      </div>
      <div className="px-40p">
        <div className="flex md:flex-row flex-col md:items-end items-center justify-center md:text-left text-center  gap-3 py-4 xxl:-mt-[90px] xl:-mt-15 max-md:-mt-20 relative z-[2]">
          <Image
            className="avatar xxl:size-[160px] xl:size-[140px] size-[120px] border-2 border-secondary"
            src={groupLogo13}
            width={160}
            height={160}
            alt="group profile"
          />
          <div className="flex items-center md:justify-between justify-center flex-wrap gap-24p w-full">
            <div>
              <h4 className="heading-4 text-w-neutral-1 mb-2">Design & Art</h4>
              <div className="flex-y gap-3">
                <div className="flex-y gap-1 text-white">
                  <IconWorld size={20} />
                  <span className="text-sm">Public</span>
                </div>
                <p className="text-sm text-w-neutral-3">3 months ago</p>
              </div>
            </div>
            <div className="flex-y gap-3">
              <span className="text-m-medium text-w-neutral-3">
                Group Admins
              </span>
              <Image
                className="avatar size-48p border border-secondary"
                src={users1}
                alt="user"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center sm:justify-between justify-center flex-wrap gap-24p py-20p border-t border-shap">
          <GroupTab />
          <button className="btn btn-md btn-secondary text-sm rounded-12">
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
