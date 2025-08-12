"use client";

import { useToggle } from "@/hooks";
//import { Listbox } from "@headlessui/react";
import SearchBar from "@/components/ui/SearchBar";
//import { heroes } from "@public/data/heroes";
import { heroUserStat } from "@public/data/heroUserStat";
import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const heroCategory = ["all", "tank", "damage", "support"];
const filterTypes = ["Popular", "tank", "damage", "support"];
const categoryLabels: Record<string, string> = {
  all: "전체",
  tank: "탱커",
  damage: "딜러",
  support: "서포터",
};

const HeroUserStatAll = () => {
  const [category, setCategory] = useState<string | unknown>("all");
  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredhero = heroUserStat?.filter(
    (item) => {
      const matchesCategory = category === "all" || item?.role === category;
      const searchTarget = `${item.name} ${categoryLabels[item.role]}`;
      const matchesSearch = searchTarget.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }
  );

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="overflow-x-auto w-full">
          <table className="w-full overflow-hidden">
            <thead className="border-b border-divider">
              <tr>
                <th
                  className="px-6 py-2 text-left text-xs tablet:text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    Hero<span className="text-mute"></span>
                  </div>
                </th>
                <th
                  className="px-6 py-2 text-left text-xs tablet:text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    픽률
                    {/* <span className="text-mute"
                      >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-arrow-down w-4 h-4"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14"></path>
                        <path d="m19 12-7 7-7-7"></path>
                      </svg>
                    </span> */}
                  </div>
                </th>
                <th
                  className="px-6 py-2 text-left text-xs tablet:text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    승률<span className="text-mute"></span>
                  </div>
                </th>
                <th
                  className="px-6 py-2 text-left text-xs tablet:text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    밴률<span className="text-mute"></span>
                  </div>
                </th>
                <th
                  className="px-6 py-2 text-left text-xs tablet:text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    KDA<span className="text-mute"></span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {filteredhero?.map((item, idx) => (
                <tr>
                  <td>
                      <div
                        key={idx}
                        className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full "
                      >
                      <Link
                        href={`/gameinfo/heroes/${item?.key}`}
                        className="heading-4 link-1 mt-2 mb-2 line-clamp-1"
                      >
                        <div className="flex gap-4 items-center">
                           <div className="overflow-hidden w-10 h-10">
                            <Image
                              src={`${item?.portrait}`} 
                              width={64}
                              height={64}
                              className="w-full object-cover object-top group-hover:scale-110 group-hover:rotate-2 transition-1"
                              alt={item?.name}
                            />
                          </div>
                          <div>
                            <span className="text-s-regular text-w-neutral-1">        
                               {categoryLabels[item?.role] || item?.role}                    
                              {/* {item?.role} */}
                            </span>
                            <div className="">                  
                                {item?.name}   
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-foreground"> {item?.stats?.pickRate}</div>
                      <div className="relative">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-300 ease-out bg-green-500 dark:bg-green-400" style={{
                            width: `calc(${item?.stats?.pickRate} / 0.1)`
                          }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-foreground">{item?.stats?.winRate}</div>
                      <div className="relative">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-300 ease-out bg-blue-500 dark:bg-blue-400" style={{width:item?.stats?.winRate}}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-foreground">{item?.stats?.banRate}</div>
                      <div className="relative">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-300 ease-out bg-red-500 dark:bg-red-400" style={{                           
                            width: `calc(${item?.stats?.banRate} / 0.1)`
                            }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-foreground">{item?.stats?.kda}</div>
                      <div className="relative">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-300 ease-out bg-purple-500 dark:bg-purple-400" style={{
                            width: `calc(${item?.stats?.kda}% / 0.1)`                           
                            }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>   
  )
};
export default HeroUserStatAll;