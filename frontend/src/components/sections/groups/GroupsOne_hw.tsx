"use client";

import { groups } from "@public/data/groups";
import { IconWorld } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const GroupsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recent");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredGroups = groups.filter((group) => {
    const matchesCategory = category === "all" || group.category === category;
    const matchesSearch = group.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        {/* FILTERS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-2/3">
            <select
              className="form-select bg-b-neutral-3 text-white rounded px-6 py-5 min-w-[180px] text-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Groups</option>
              <option value="FPS">FPS</option>
              <option value="RPG">RPG</option>
              <option value="MOBA">MOBA</option>
            </select>
            <input
              type="text"
              placeholder="Search groups..."
              className="form-input bg-b-neutral-3 text-white rounded px-6 py-5 w-full text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-neutral-2 px-8 py-5 text-lg">Search</button>
          </div>

          <div className="flex gap-4 items-center flex-shrink-0">
            <button className="btn btn-neutral-3 px-8 py-5 text-lg">New Squad</button>
            <select
              className="form-select bg-b-neutral-3 text-white rounded px-6 py-5 text-lg"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="recent">Last Active</option>
              <option value="members">Most Members</option>
            </select>
          </div>
        </div>

        {/* GROUP CARDS */}
        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredGroups.map((item, idx) => (
            <div key={idx} className="bg-b-neutral-3 rounded-xl p-4">
              <Image
                src={item.image}
                alt={item.name}
                width={340}
                height={200}
                className="rounded-lg mb-4 object-cover w-full h-[200px]"
              />
              <h3 className="text-white text-lg font-semibold mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-w-neutral-3 mb-1 flex items-center gap-1">
                <IconWorld size={16} /> {item.category} Group
              </p>
              <div className="flex flex-wrap justify-between text-sm text-w-neutral-1 mb-2">
                <span>AVG: Diamond</span>
                <span>Region: {item.region || "Global"}</span>
                <span>Earnings: ${item.earnings || 0}</span>
              </div>
              <button className="btn btn-sm w-full btn-primary">View Team</button>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="flex justify-center mt-10">
          <button className="btn btn-neutral-3 bg-b-neutral-3 text-white rounded-lg px-6 py-2">
            Load More...
          </button>
        </div>
      </div>
    </section>
  );
};

export default GroupsPage;
