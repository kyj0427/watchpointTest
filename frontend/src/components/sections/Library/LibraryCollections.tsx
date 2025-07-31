"use client";

import { Menu } from "@headlessui/react";
import { library } from "@public/data/library";
import Image from "next/image";
import Link from "next/link";

const LibraryCollections = () => {
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p">
          {library?.map((item, idx) => (
            <div key={idx} className="library-card group" data-aos="fade-up">
              <div className="flex flex-col justify-between h-full relative z-[2]">
                <div className="flex-y justify-between flex-wrap gap-16p">
                  <span className="badge badge-compact badge-glass flex-y gap-1 text-w-neutral-1">
                    <i className="ti ti-star icon-24 text-primary"></i>
                    {item?.rating}
                  </span>
                  <Menu as="div" className="dropdown shrink-0">
                    <Menu.Button className="dropdown-toggle dropdown-toggle w-fit btn-c btn-c-md sm:size-10 size-9 btn-primary">
                      <i className="ti ti-dots-vertical icon-24"></i>
                    </Menu.Button>
                    <Menu.Items className="dropdown-content">
                      <Menu.Item as="button" className="dropdown-item">
                        Report
                      </Menu.Item>
                      <Menu.Item as="button" className="dropdown-item">
                        Hide
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div>
                  <Link
                    href="/library-details"
                    className="heading-4 text-w-neutral-1 line-clamp-1 mb-1 link-1"
                  >
                    {item?.title}
                  </Link>
                  <div className="flex-y gap-3 text-l-regular text-w-neutral-2">
                    <span>{item?.type}</span>
                    <span className="badge badge-circle badge-dot badge-light size-1"></span>
                    <span>{item?.publish}</span>
                  </div>
                </div>
              </div>
              <Image
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-1"
                width={260}
                height={260}
                src={item?.photo}
                alt="library"
              />
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

export default LibraryCollections;
