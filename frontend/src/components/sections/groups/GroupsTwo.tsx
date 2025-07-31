"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { groups } from "@public/data/groups";
import {
  IconChevronDown,
  IconUser,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GroupsTwo = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="flex-y justify-between flex-wrap gap-24p mb-[30px]">
          <h5 className="heading-5 text-w-neutral-1">
            Viewing 1 - 9 of 9 groups
          </h5>
          <div className="flex items-center sm:justify-end max-sm:flex-wrap gap-24p">
            <div className="shrink-0 flex-y gap-28p">
              <span className="text-m-medium text-w-neutral-1">Order By:</span>

              <form className="shrink-0">
                <Listbox
                  ref={filterRef}
                  value={selectedFilter}
                  onChange={setSelectedFilter}
                  as="div"
                  className="dropdown group"
                >
                  <Listbox.Button
                    onClick={filterToggle}
                    className="dropdown-toggle toggle-1"
                  >
                    {selectedFilter}
                    <IconChevronDown
                      className={`${filterOpen && "rotate-180"} icon-24`}
                    />
                  </Listbox.Button>
                  <Listbox.Options className="dropdown-content">
                    {filterTypes.map((item, idx) => (
                      <Listbox.Option
                        className={`dropdown-item ${
                          selectedFilter === item && "active"
                        }`}
                        key={idx}
                        value={item}
                      >
                        {item}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </form>
            </div>
          </div>
        </div>

        <div className="grid xxl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
          {groups?.slice(8)?.map((item, idx) => (
            <div
              key={idx}
              className="bg-b-neutral-3 rounded-12 group"
              data-aos="zoom-in"
            >
              <div className="overflow-hidden relative rounded-12">
                <Image
                  className="w-full xxl:h-[216px] lg:h-[200px] h-[180px] object-cover group-hover:scale-110 transition-1"
                  src={item?.image}
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
                    src={item?.logo}
                    alt="group"
                  />
                  <Link
                    href={`/groups/${item?.id}`}
                    className="heading-4 text-w-neutral-1 line-clamp-1 link-1 mb-1 text-split-left"
                  >
                    {item?.name}
                  </Link>
                  <p className="text-sm text-w-neutral-3">{item?.posts}</p>
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
    </section>
  );
};

export default GroupsTwo;
