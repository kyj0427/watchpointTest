// 페이징 컴포넌트

// frontend/src/components/shared/Pagination.tsx
"use client";

import React from "react";


interface PaginationProps {
  currentPage: number; //현재페이지번호
  totalPages: number; //전체 페이지수
  onPageChange: (page: number) => void; // 페이지 변경 콜백 함수
  className?: string; //css 클래스
}

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) => {
  
  // 이전 페이지 핸들러
  const handlePrevPage = () => {
    if (currentPage > 1) { //첫페이지가 아닐 때만 작동
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지 핸들러
  const handleNextPage = () => { // 마지막 페이지가 아닐때만 작동
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 페이지 번호 생성 
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    //페이지가 5개 이하면 모든 페이지 번호 표시
    if (totalPages <= maxVisible) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }
    
    // 항상 첫번째 페이지 표시
    pages.push(1);
    
    // 페이지가 4페이지 이상이면 ... 표시
    if (currentPage > 3) {
      pages.push('...');
    }
    
    // 현재 페이지 주변 번호 계산 
    const start = Math.max(2, currentPage - 1); // 최소 2페이지부터
    const end = Math.min(totalPages - 1, currentPage + 1); //최대 마지막 -1 페이지까지
    
    // 현재 페이지 주변 번호 추가
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // 현재 페이지가 마지막 -2페이지 미만이면 ... 표시
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    // 마지막 페이지 표시 (2페이지 이상일때)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className={`pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full ${className}`}>
      {/* 이전 버튼 */}
      <button 
        onClick={handlePrevPage}
        disabled={currentPage === 1} // 첫 페이지에서 비활성화
        className="pagination-item pagination-prev disabled:opacity-50"
      >
        <i className="ti ti-chevron-left" />
      </button>
      
      {/* 페이지 번호 */}
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
      {/* 다음 버튼 */}
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