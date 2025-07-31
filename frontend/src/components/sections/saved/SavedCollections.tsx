"use client";

import { savedGames } from "@public/data/saved";
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const SavedCollections = () => {
  return (
    <section className="section-pb pt-60p relative overflow-visible">
      <div className="container">
        <div className="grid 3xl:grid-cols-2 xxl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-24p">
          {savedGames?.map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-b-neutral-3 p-24p rounded-24 grid 3xl:grid-cols-2 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 items-center gap-30p group"
            >
              <div className="overflow-hidden w-full xl:h-[260px] md:h-[240px] sm:h-[220px] h-[200px] rounded-24">
                <Image
                  className="w-full xl:h-[260px] md:h-[240px] sm:h-[220px] h-[200px] object-cover group-hover:scale-110 transition-1"
                  width={260}
                  height={260}
                  src={item?.photo}
                  alt="img"
                />
              </div>
              <div>
                <Link
                  href="./game-details-two"
                  className="heading-3 text-w-neutral-1 4xl:line-clamp-2 line-clamp-2 link-1 text-split-left"
                >
                  {item?.title}
                </Link>
                <div className="flex-y flex-wrap py-20p gap-3">
                  <Image
                    className="avatar size-60p shrink-0"
                    width={60}
                    height={60}
                    src={item?.author?.avatar}
                    alt="user"
                  />
                  <span className="text-l-medium text-w-neutral-1">
                    {item?.genres[0]}
                  </span>
                </div>
                <div className="flex-y flex-wrap gap-2">
                  <span className="badge badge-smm badge-primary py-2.5 font-normal">
                    Collection
                  </span>
                  <button className="badge badge-neutral-2 px-16p py-1.5 font-normal">
                    <i className="ti ti-share-3 icon-24"></i>
                    Share
                  </button>
                  <Menu as="div" className="dropdown">
                    <MenuButton className="dropdown-toggle w-fit badge badge-neutral-2 px-16p py-1.5">
                      <i className="ti ti-dots-vertical icon-24"></i>
                    </MenuButton>
                    <MenuItems className="dropdown-content">
                      <MenuItem as="button" className="dropdown-item">
                        Unsaved
                      </MenuItem>
                      <MenuItem as="button" className="dropdown-item">
                        Report
                      </MenuItem>
                      <MenuItem as="button" className="dropdown-item">
                        Block
                      </MenuItem>
                      <MenuItem as="button" className="dropdown-item">
                        Delete
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-c mt-48p">
          <Link href="#" className="btn btn-xl py-3 btn-neutral-3 rounded-12">
            Load More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SavedCollections;
