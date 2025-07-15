import GroupForum from "@/components/sections/groupDetails/GroupForum";
import { groupWorkout } from "@public/data/groupWorkout";
import Image from "next/image";
import Link from "next/link";
import user3 from "@public/images/users/user3.png";
import { groups } from "@public/data/groups";
import { IconCircleCheckFilled } from "@tabler/icons-react";

// Define page props interface that matches Next.js 15's expectations
interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static paths
export async function generateStaticParams() {
  return groups.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function GroupForumPage({ params }: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const singleGroupsForum = groups.find((item) => item.id.toString() === id);

  return (
    <div className="pt-8">
      <h4 className="heading-4 text-w-neutral-1 mb-30p">Drawing & Art</h4>
      <div className="flex-y flex-wrap gap-20p py-3 px-32p border border-accent-7 rounded-12 mb-30p">
        <p className="text-sm text-w-neutral-1">
          This forum has 10 topics, 4 replies, and was last updated 3 days, 6
          hours ago by
        </p>
        <div className="flex-y gap-3">
          <Image className="avatar size-8" src={user3} alt="user" />
          <Link href="/profile" className="text-sm text-w-neutral-1">
            Malan Layon
          </Link>
        </div>
      </div>
      <p className="text-m-medium text-w-neutral-1 mb-30p">
        Viewing 10 topics - 1 through 10 (of 10 total)
      </p>

      <div className="p-32p bg-b-neutral-3 rounded-12 overflow-x-auto scrollbar-sm mb-[30px]">
        <div className="grid grid-cols-1 divide-y divide-shap">
          {groupWorkout.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between gap-x-60p pb-32p ${
                idx !== 0 ? "pt-24p" : ""
              }`}
            >
              <div>
                <p className="text-xl-medium mb-16p whitespace-nowrap">
                  {item.title}
                </p>
                <div className="flex-y gap-3 min-w-[240px]">
                  <Image
                    className="shrink-0 avatar size-60p"
                    src={item?.person1.image}
                    alt="user"
                    width={60}
                    height={60}
                  />
                  <div className="flex-y gap-3.5">
                    <Link
                      href="/profile"
                      className="text-l-medium whitespace-nowrap line-clamp-1 link-1"
                    >
                      {item?.person2?.name}
                    </Link>
                    <IconCircleCheckFilled className="icon-24 text-secondary" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between 3xl:gap-x-[128px] gap-x-60p">
                <span className="text-l-medium">01</span>
                <span className="text-l-medium">02</span>
                <div>
                  <p className="text-l-medium whitespace-nowrap mb-16p">
                    7 months ago
                  </p>
                  <div className="flex-y gap-3 min-w-[240px]">
                    <Image
                      className="shrink-0 avatar size-60p"
                      src={item?.person2.image}
                      alt="user"
                      width={60}
                      height={60}
                    />
                    <div>
                      <div className="flex-y gap-3.5">
                        <Link
                          href="/profile"
                          className="text-l-medium whitespace-nowrap line-clamp-1 link-1"
                        >
                          {item?.person2?.name}
                        </Link>
                        <IconCircleCheckFilled className="icon-24 text-secondary" />
                      </div>
                      {item?.person2?.role && (
                        <span className="text-s-medium text-w-neutral-3">
                          {item?.person2?.role}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <GroupForum />
      </div>
    </div>
  );
}
