'use client';

import { blogPosts } from "@public/data/blogPosts";
import Image from "next/image";
import Link from "next/link";
import PostCreate from "../community/PostCreate";
import Posts from "../community/post";
import { useState } from "react";

const Squad = [
  { name: "Jake", avatar: "/images/users/avatar1.png" },
  { name: "Jane", avatar: "/avatars/jane.jpg" },
  { name: "Mark", avatar: "/avatars/mark.jpg" },
  { name: "Paul", avatar: "/avatars/paul.jpg" },
];

const Community = () => {
  return (
    <section className="section-py overflow-visible">
      <div className="container pt-[30px]">
        <div className="grid grid-cols-12 gap-30p">

          {/* 🔹 Left Sidebar (공지 + Squad) */}
          <div className="col-span-3 hidden xl:block">
            <div className="flex flex-col gap-30p sticky top-30 h-screen overflow-y-auto pb-40 scrollbar-0">

              {/* 공지 */}
              <div className="bg-b-neutral-3 p-32p rounded-12">
                <div className="flex justify-between items-center mb-24p">
                  <h4 className="heading-4 text-w-neutral-1">Notification</h4>
                  <Link href="/community/noticification" className="text-s-medium link-1 text-w-neutral-1">View All →</Link>
                </div>
                <div className="flex flex-col gap-20p">
                  {blogPosts.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <Image src={item.author.avatar} alt="avatar" width={60} height={60} className="rounded-full" />
                      <div>
                        <p className="text-sm text-w-neutral-1 font-medium line-clamp-2">{item.title}</p>
                        <span className="text-xs text-w-neutral-4">by {item.author.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Squad */}
              <div className="bg-b-neutral-3 p-32p rounded-12">
                <div className="flex justify-between items-center mb-24p">
                  <h4 className="heading-4 text-w-neutral-1">Squad</h4>
                  <Link href="/community/SquadOrChat" className="text-s-medium link-1 text-w-neutral-1">View All →</Link>
                </div>
                <div className="flex flex-col gap-20p">
                  {Squad.map((user, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Image src={user.avatar} alt={user.name} width={60} height={60} className="rounded-full bg-w-neutral-4" />
                      <span className="text-w-neutral-1">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* 🔹 Center Content */}
          <div className="col-span-12 xl:col-span-6">
            <div className="flex flex-col gap-30p">
              <PostCreate />
              <Posts />
              <div className="text-center mt-30p">
                <button className="btn btn-lg btn-neutral-3 rounded-12">Load more...</button>
              </div>
            </div>
          </div>

          {/* 🔹 Right Sidebar (Hot + Recent Topics) */}
          <div className="col-span-3 hidden xl:block">
            <div className="flex flex-col gap-30p sticky top-30 h-screen overflow-y-auto pb-40 scrollbar-0">

              {/* Hot Topics */}
              <div className="bg-b-neutral-3 p-32p rounded-12">
                <div className="flex justify-between items-center mb-24p">
                  <h4 className="heading-4 text-w-neutral-1">Hot Topics</h4>
                  <Link href="/community/postlist?mode=hot" className="text-s-medium link-1 text-w-neutral-1">View All →</Link>
                </div>
                <div className="flex flex-col gap-20p">
                  {blogPosts.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <Image src={item.author.avatar} alt="avatar" width={60} height={60} className="rounded-full" />
                      <div>
                        <p className="text-sm text-w-neutral-1 font-medium line-clamp-2">{item.title}</p>
                        <span className="text-xs text-w-neutral-4">by {item.author.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Topics */}
              <div className="bg-b-neutral-3 p-32p rounded-12">
                <div className="flex justify-between items-center mb-24p">
                  <h4 className="heading-4 text-w-neutral-1">Recent Topics</h4>
                  <Link href="/community/postlist?mode=recent" className="text-s-medium link-1 text-w-neutral-1">View All →</Link>
                </div>
                <div className="flex flex-col gap-20p">
                  {blogPosts.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <Image src={item.author.avatar} alt="avatar" width={60} height={60} className="rounded-full" />
                      <div>
                        <p className="text-sm text-w-neutral-1 font-medium line-clamp-2">{item.title}</p>
                        <span className="text-xs text-w-neutral-4">by {item.author.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Community;
