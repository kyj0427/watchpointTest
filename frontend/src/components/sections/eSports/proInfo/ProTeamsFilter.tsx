"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

const ProTeamsFilter = () => {
  const filterTypes = ["랭킹순", "이름순", "최신순"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <form className="flex items-center sm:flex-row flex-col gap-28p shrink-0 sm:w-fit w-full">
      <div className="sm:w-[230px] w-full shrink-0 px-16p py-3 flex items-center justify-between sm:gap-3 gap-2 rounded-12 border border-shap">
        <input
          autoComplete="off"
          className="bg-transparent text-w-neutral-1 w-full"
          type="text"
          name="search"
          id="search"
          placeholder="팀 이름 검색..."
        />
        <button type="submit" className="flex-c icon-24 text-w-neutral-4">
          <i className="ti ti-search"></i>
        </button>
      </div>
      <div className="sm:w-full w-fit select-2 flex items-center gap-28p">
        <span className="text-m-medium text-w-neutral-1 shrink-0">필터 :</span>
        <Listbox
          ref={filterRef}
          value={selectedFilter}
          onChange={setSelectedFilter}
          as="div"
          className="dropdown group"
        >
          <Listbox.Button
            onClick={filterToggle}
            className="dropdown-toggle toggle-2"
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
      </div>
    </form>
  );
};

export default ProTeamsFilter;
