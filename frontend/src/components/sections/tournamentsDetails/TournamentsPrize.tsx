"use client";

import { ordinal } from "@/utility/ordinal";
import { prize } from "@public/data/prize";
import Link from "next/link";
import { useState } from "react";

const TournamentsPrize = () => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(prize.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedData = prize.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="overflow-x-auto scrollbar-sm">
        <table className="min-w-full whitespace-nowrap">
          <thead className="text-xl font-borda bg-transparent text-w-neutral-1">
            <tr>
              <th className="px-32p pb-20p text-left">Placement</th>
              <th className="px-32p pb-20p text-left">Current Prize</th>
              <th className="px-32p pb-20p text-left">Potential Prize</th>
              <th className="px-32p pb-20p text-right"></th>
            </tr>
          </thead>
          <tbody className="text-base font-medium font-poppins text-w-neutral-3 divide-y-[12px] divide-b-neutral-4">
            {paginatedData?.map((item, index) => (
              <tr
                key={index}
                className="bg-b-neutral-3 hover:bg-b-neutral-2 text-w-neutral-3 transition-1"
              >
                <td
                  className={`${
                    item.placement === 1
                      ? "text-secondary"
                      : item.placement === 2
                      ? "text-primary"
                      : item.placement === 3
                      ? "text-accent-5"
                      : ""
                  } px-32p py-3`}
                >
                  {ordinal(item.placement)}
                </td>
                <td className="px-32p py-3">${item.currentPrize}</td>
                <td className="px-32p py-3">${item.potentialPrize}</td>
                <td className="px-32p py-3 cursor-pointer text-right flex-y justify-end">
                  <Link
                    href={item.detailsLink}
                    className="flex items-center gap-2.5 hover:text-primary transition-1"
                  >
                    View Details
                    <i className="ti ti-chevrons-right icon-24 text-primary"></i>
                  </Link>
                </td>
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

export default TournamentsPrize;
