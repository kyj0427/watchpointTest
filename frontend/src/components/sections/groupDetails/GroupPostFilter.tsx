"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

const GroupPostFilter = () => {
  const filterTypes = [
    "Everything",
    "For Your",
    "Follow Groups",
    "Trending",
    "Recent",
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
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
              className={`dropdown-item ${selectedFilter === item && "active"}`}
              key={idx}
              value={item}
            >
              {item}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </form>
  );
};

export default GroupPostFilter;
