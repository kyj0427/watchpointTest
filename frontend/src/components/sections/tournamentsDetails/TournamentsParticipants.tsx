"use client";

import { participants } from "@public/data/participants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TournamentsParticipants = () => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(participants.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const participantsData = participants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex-y justify-between flex-wrap gap-24p mb-30p">
        <h3 className="heading-3 text-w-neutral-1">
          Total Participants ( {participants?.length} )
        </h3>
        <form className="bg-b-neutral-3 px-24p py-16p max-w-[390px] flex items-center sm:gap-3 gap-2 min-w-[300px] rounded-12">
          <span className="flex-c icon-24 text-white">
            <i className="ti ti-search"></i>
          </span>
          <input
            autoComplete="off"
            className="bg-transparent w-full text-base text-w-neutral-1 placeholder:text-w-neutral-1"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </form>
      </div>

      <div className="overflow-x-auto scrollbar-sm">
        <table className="min-w-full">
          <thead className="text-xl font-borda bg-transparent text-w-neutral-1 whitespace-nowrap">
            <tr>
              <th className="px-32p pb-20p text-left">Name</th>
              <th className="px-32p pb-20p text-left">Status</th>
              <th className="px-32p pb-20p text-left">Team Leader</th>
              <th className="px-32p pb-20p text-left">Game ID</th>
            </tr>
          </thead>
          <tbody className="text-base font-medium font-poppins text-w-neutral-1 divide-y-[12px] divide-b-neutral-4">
            {participantsData?.map((teamMember, index) => (
              <tr
                key={index}
                className="bg-b-neutral-3 hover:bg-b-neutral-2 transition-1 *:min-w-[220px]"
              >
                <td className="px-32p py-3">
                  <div className="flex items-center gap-2.5">
                    <Image
                      className="avatar size-8 shrink-0"
                      src={teamMember.image}
                      alt={teamMember.name}
                    />
                    <Link href="/profile" className="link-1">
                      {teamMember.name}
                    </Link>
                  </div>
                </td>
                <td className="px-32p py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`badge badge-circle badge-dot size-3 ${
                        teamMember.status === "Accepted"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    ></span>
                    <span>{teamMember.status}</span>
                  </div>
                </td>
                <td className="px-32p py-3">{teamMember.teamLeader}</td>
                <td className="px-32p py-3">{teamMember.gameId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full mt-48p">
        <button
          className={`pagination-item pagination-prev ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <i className="ti ti-chevron-left"></i>
        </button>
        <div className="pagination-list">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`pagination-item pagination-circle ${
                  currentPage === pageNumber ? "active" : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                <span className="pagination-link">{pageNumber}</span>
              </button>
            );
          })}
        </div>
        <button
          className={`pagination-item pagination-next ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <i className="ti ti-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default TournamentsParticipants;
