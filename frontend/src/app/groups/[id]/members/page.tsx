import { groupMembers } from "@public/data/groupMembers";
import { groups } from "@public/data/groups";
import { IconUserPlus } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

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

export default async function GroupMembersPage({ params }: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const singleGroupMember = groups.find((item) => item.id.toString() === id);

  return (
    <div className="pt-8">
      <div className="grid 4xl:grid-cols-3 xxl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-24p">
        {groupMembers?.map((item, idx) => (
          <div
            key={idx}
            className="bg-b-neutral-3 rounded-12 p-32p border border-transparent hover:border-accent-7 group transition-1"
          >
            <div className="flex items-start justify-between gap-24p mb-16p">
              <div className="flex-y flex-wrap gap-3">
                <Image
                  className="avatar size-60p"
                  src={item?.image}
                  alt="team"
                />
                <div>
                  <Link
                    href="/profile"
                    className="text-xl-medium text-w-neutral-1 link-1"
                  >
                    {item?.name}
                  </Link>
                  <span className="text-m-medium text-w-neutral-3">
                    {item?.joined}
                  </span>
                </div>
              </div>
              <button className="btn-c btn-c-md btn-c-outline-primary shrink-0">
                <IconUserPlus />
              </button>
            </div>

            <div className="flex-y flex-wrap justify-between gap-24p pt-16p border-t border-t-shap">
              <h5 className="text-xl-medium text-w-neutral-1">Friends</h5>
              <div className="flex items-center *:size-9 *:shrink-0 *:border *:border-white *:-ml-3 ml-3">
                {item?.friends?.map((item, idx) => (
                  <Image
                    key={idx}
                    className="avatar"
                    src={item?.avatar}
                    alt="user"
                  />
                ))}
                <span className="flex-c rounded-full bg-[#333333] text-xs text-w-neutral-1 z-[1] relative">
                  +{item?.friends?.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-c mt-48p">
        <Link href="#" className="btn btn-xl py-3 btn-primary rounded-12">
          Load More...
        </Link>
      </div>
    </div>
  );
}
