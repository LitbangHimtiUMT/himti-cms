import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;

    const range = {
      start: Math.max(2, currentPage - delta),
      end: Math.min(totalPages - 1, currentPage + delta),
    };

    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={
          currentPage === 1
            ? "w-9 h-9 rounded-lg bg-primary-600 text-white font-medium shadow-soft transition-all duration-200"
            : "w-9 h-9 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 font-medium transition-all duration-200"
        }
      >
        1
      </button>
    );

    if (range.start > 2) {
      pageNumbers.push(
        <span key="start-ellipsis" className="text-gray-400 px-1">
          ...
        </span>
      );
    }

    for (let i = range.start; i <= range.end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            i === currentPage
              ? "w-9 h-9 rounded-lg bg-primary-600 text-white font-medium shadow-soft transition-all duration-200"
              : "w-9 h-9 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 font-medium transition-all duration-200"
          }
        >
          {i}
        </button>
      );
    }

    if (range.end < totalPages - 1) {
      pageNumbers.push(
        <span key="end-ellipsis" className="text-gray-400 px-1">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={
            currentPage === totalPages
              ? "w-9 h-9 rounded-lg bg-primary-600 text-white font-medium shadow-soft transition-all duration-200"
              : "w-9 h-9 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 font-medium transition-all duration-200"
          }
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-2 my-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm
          transition-all duration-200
          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700"
          }
        `}
      >
        <FiChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-1.5">{renderPageNumbers()}</div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm
          transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700"
          }
        `}
      >
        Next
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
