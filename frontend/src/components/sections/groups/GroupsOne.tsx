import { groups } from "@public/data/groups";
import { IconWorld } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const GroupsOne = () => {
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid 4xl:grid-cols-2 xxl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-30p">
          {groups?.slice(0, 8)?.map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-b-neutral-3 grid 4xl:grid-cols-2 grid-cols-1 items-center rounded-24 overflow-hidden group"
              data-aos="zoom-in"
            >
              <div className="overflow-hidden">
                <Image
                  className="w-full 4xl:h-[370px] 3xl:h-[340px] xl:h-[320px] sm:h-[280px] h-[240px] object-cover object-top group-hover:scale-110 transition-1"
                  src={item?.image}
                  alt="Season of The Witch"
                />
              </div>
              <div className="px-30p py-16p">
                <Link
                  href={`/groups/${item?.id}`}
                  className="heading-3 text-w-neutral-1 link-1 line-clamp-1 mb-16p text-split-bottom"
                >
                  {item?.name}
                </Link>
                <span className="badge badge-neutral-2 group-hover:badge-secondary mb-24p">
                  <IconWorld size={24} />
                  {item?.category} Group
                </span>
                <div className="flex-y flex-wrap gap-x-60p gap-y-24p mb-20p">
                  <div>
                    <span className="text-lead-medium text-w-neutral-1 mb-1">
                      {item?.category}
                    </span>
                    <span className="text-base text-w-neutral-3">Posts</span>
                  </div>
                  <div>
                    <span className="text-lead-medium text-w-neutral-1 mb-1">
                      {item?.members}
                    </span>
                    <span className="text-base text-w-neutral-3">Members</span>
                  </div>
                </div>
                <div className="flex-y gap-2 pt-20p mb-24p border-t border-w-neutral-4/20">
                  <i className="ti ti-alert-circle icon-20 text-w-neutral-3"></i>
                  <p className="text-base text-w-neutral-3">
                    Latest active {item?.lastActive}
                  </p>
                </div>
                <Link
                  href={`/groups/${item?.id}`}
                  className="btn btn-sm flex btn-neutral-2 group-hover:btn-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-c mt-48p">
          <Link
            href="#"
            className="btn btn-xl py-3 btn-neutral-3 bg-b-neutral-3 text-w-neutral-1 rounded-12 outline-none"
          >
            Load More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GroupsOne;
