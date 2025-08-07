// 페이징 컴포넌트

// frontend/src/components/shared/Pagination.tsx
"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }
    
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }
    
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className={`pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full ${className}`}>
      <button 
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="pagination-item pagination-prev disabled:opacity-50"
      >
        <i className="ti ti-chevron-left" />
      </button>
      
      <div className="pagination-list">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="pagination-item pagination-circle">
                <span className="pagination-link pagination-more">...</span>
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`pagination-item pagination-circle ${
                  page === currentPage ? "active" : ""
                }`}
              >
                <span className="pagination-link">{page}</span>
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <button 
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="pagination-item pagination-next disabled:opacity-50"
      >
        <i className="ti ti-chevron-right" />
      </button>
    </div>
  );
};

export default Pagination;