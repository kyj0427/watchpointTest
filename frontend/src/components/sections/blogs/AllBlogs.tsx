"use client";

import { blogPosts } from "@public/data/blogPosts";
import { IconHeart, IconMessage } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type AllBlogsProps = {
  mode: "hot" | "recent";
};

const AllBlogs = ({ mode }: AllBlogsProps) => {
  const filteredPosts =
    mode === "hot"
      ? [...blogPosts].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
      : [...blogPosts].reverse(); // 최근 게시물이 앞에 오도록

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid 3xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
          {filteredPosts.map((item, idx) => (
            <div key={idx} className="bg-b-neutral-3 py-24p px-30p rounded-12 group">
              <div className="overflow-hidden rounded-12">
                <Image
                  className="w-full h-[202px] object-cover group-hover:scale-110 transition-1"
                  src={item.image}
                  alt={item.title}
                  width={328}
                  height={202}
                />
              </div>

              <div className="flex-y justify-between flex-wrap gap-20px py-3">
                <div className="flex-y gap-3">
                  <div className="flex-y gap-1">
                    <IconHeart size={20} className="text-danger" />
                    <span className="text-sm text-w-neutral-1">{item.likes}</span>
                  </div>
                  <div className="flex-y gap-1">
                    <IconMessage size={20} className="text-primary" />
                    <span className="text-sm text-w-neutral-1">{item.comments}</span>
                  </div>
                </div>
                <div className="flex-y gap-1">
                  <i className="ti ti-share-3 icon-20 text-w-neutral-4"></i>
                  <span>{item.share}</span>
                </div>
              </div>

              <div className="flex-y flex-wrap gap-3 mb-1">
                <span className="text-m-medium text-w-neutral-1">Collections</span>
                <p className="text-sm text-w-neutral-2">{item.date || "September 04, 2023"}</p>
              </div>

              <Link
                href={`/blog-details/${item.id || idx}`}
                className="heading-5 text-w-neutral-1 leading-[130%] line-clamp-2 link-1"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex-c mt-48p">
          <Link href="#" className="btn btn-xl py-3 btn-primary rounded-12">
            Load More...
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;
