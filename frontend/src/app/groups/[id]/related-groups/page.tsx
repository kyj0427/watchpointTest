import RelatedGroupFilter from "@/components/sections/groupDetails/RelatedGroupFilter";
import { groups } from "@public/data/groups";
import { IconUsers, IconWorld } from "@tabler/icons-react";
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

export default async function RelatedGroupPage({ params }: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const relatedGroups = groups.find((item) => item.id.toString() === id);

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between flex-wrap gap-3 bg-b-neutral-3 rounded-12 px-30p py-20p mb-30p">
        <span className="text-m-medium text-w-neutral-1">Memberships</span>
        <RelatedGroupFilter />
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
        {groups?.slice(6, 12)?.map((item, idx) => (
          <div
            key={idx}
            className="bg-b-neutral-3 rounded-12 group"
            data-aos="zoom-in"
          >
            <div className="overflow-hidden relative rounded-12">
              <Image
                className="w-full xxl:h-[216px] lg:h-[200px] h-[180px] object-cover group-hover:scale-110 transition-1"
                src={item?.image}
                width={380}
                height={216}
                alt="img"
              />
              <button className="absolute top-3 left-3 badge badge-sm badge-secondary font-poppins">
                Leave Group
              </button>
            </div>
            <div className="p-24p">
              <div className="flex-col-c text-center pb-16p lg:-mt-15 md:-mt-12 -mt-10">
                <Image
                  className="avatar size-15 border-2 border-secondary mb-3"
                  src={item?.image}
                  alt="group"
                />
                <Link
                  href={`/groups/${item?.id}`}
                  className="heading-4 text-w-neutral-1 line-clamp-1 link-1 mb-1 text-split-left"
                >
                  {item?.name}
                </Link>
                <p className="text-sm text-w-neutral-3">{item?.lastActive}</p>
              </div>
              <div className="flex-y flex-wrap justify-between gap-24p pt-16p border-t border-shap">
                <div className="flex-y gap-1">
                  <IconWorld size={24} className="text-w-neutral-1" />
                  <span className="text-sm text-w-neutral-1">
                    {item?.category}
                  </span>
                </div>
                <div className="px-3 py-2 inline-flex items-center gap-1 badge-bage badge-neutral-2 rounded-full">
                  <IconUsers size={16} className="text-w-neutral-4" />
                  <span className="text-sm text-w-neutral-1">
                    {item?.members}
                  </span>
                </div>
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
