"use client";

import { useToggle } from "@/hooks";
//import { Listbox } from "@headlessui/react";
import SearchBar from "@/components/ui/SearchBar";
import { heroes } from "@public/data/heroes";
import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const heroCategory = ["all", "tank", "damage", , "support"];

const filterTypes = ["Popular", "tank", "damage", , "support"];

const HeroAll = () => {
  const [category, setCategory] = useState<string | unknown>("all");
  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const filteredhero = heroes?.filter(
    (item) => category === "all" || item?.role === category
  );

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        {/* <h2 className="heading-2 text-w-neutral-1 mb-40p">
          Browse Heroes
        </h2> */}
        <div>
          <div className="flex items-center justify-between flex-wrap gap-24p pb-30p border-b border-shap ">
            <div className="hidden lg:flex items-center sm:gap-3 gap-2 min-w-[300px] max-w-[670px] w-full px-20p py-16p bg-b-neutral-2 rounded-full">
              <span className="flex-c icon-20 text-white"><i className="ti ti-search"></i></span>
              <input className="bg-transparent w-full" type="text" id="searchHero" placeholder="영웅 검색..." name="search" />
            </div>

            {/* <Listbox
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
              <Listbox.Options className="dropdown-content left-0">
                {filterTypes?.map((item, idx) => (
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
            </Listbox> */}
            <div className="flex items-center max-sm:justify-center overflow-x-auto scrollbar-0 max-w-[680px] ">
              <div className="flex flex-wrap gap-2 text-base text-w-neutral-1 *:rounded-12 *:px-32p *:py-3 whitespace-nowrap">
                {heroCategory?.map((item, idx) => (
                  <button
                    onClick={() => setCategory(item)}
                    key={idx}
                    className={`${
                      category === item ? "bg-b-neutral-2" : "bg-b-neutral-3"
                    } capitalize`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p mt-60p"> */}
          <div className="grid 3xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-30p mt-60p">
            {filteredhero?.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full "
              >
                <Link
                    href={`/gameinfo/heroes/${item?.key}`}
                    className="heading-3 link-1 mb-2 line-clamp-1"
                  >
                <div className="overflow-hidden">
                  <span className="badge badge-neutral absolute top-3 left-3 z-[2]">
                    <span className="avatar avatar-primary size-3"></span>
                    <span className="text-s-regular text-w-neutral-1">
                      {item?.role}
                    </span>
                  </span>
                  <Image
                    src={`${item?.portrait}`} 
                    width={256}
                    height={256}
                    className="w-full 3xl:h-[310px] xl:h-[280px] lg:h-[260px] h-[240px] object-cover object-top group-hover:scale-110 group-hover:rotate-2 transition-1"
                    alt="Mind Over Matter"
                  />
                </div>
                <div className="p-28p">                  
                    {item?.name}   
                </div>
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
      </div>
    </section>
  );
};

export default HeroAll;
