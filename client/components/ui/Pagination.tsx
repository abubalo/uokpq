import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type Props = {
  totalPages: number;
  fetchData: (page: number) => Promise<void>;
};

const Pagination: React.FC<Props> = ({ totalPages, fetchData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced fetch function to prevent multiple fetches on fast clicks
  useEffect(() => {
    const fetchPageData = async () => {
      setIsLoading(true);
      await fetchData(currentPage);
      setIsLoading(false);
    };

    fetchPageData();
  }, [currentPage, fetchData]);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
  
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
  
    // Adjust if current page is near the lower bounds
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }
    // Adjust if current page is near the upper bounds
    if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }
  
    // Render "1" and start ellipsis if necessary
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1 ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"
          }`}
          aria-label="Go to page 1"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span
            key="start-ellipsis"
            className="px-3 py-1 flex items-center"
            aria-hidden="true"
          >
            <BsThreeDots />
          </span>
        );
      }
    }
  
    // Render middle page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"
          }`}
          aria-label={`Go to page ${i}`}
        >
          {i}
        </button>
      );
    }
  
    // Render end ellipsis and last page number if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span
            key="end-ellipsis"
            className="px-3 py-1 flex items-center"
            aria-hidden="true"
          >
            <BsThreeDots />
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"
          }`}
          aria-label={`Go to page ${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }
  
    return pages;
  };
  
  return (
    <section
      id="pagination"
      aria-label="pagination"
      className="flex justify-center items-center space-x-2 my-6"
    >
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white"
        }`}
        aria-label="Previous page"
      >
        <MdArrowBackIosNew />
        <span>Prev</span>
      </button>

      <div className="flex space-x-1">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white"
        }`}
        aria-label="Next page"
      >
        <span>Next</span>
        <MdArrowForwardIos />
      </button>

      {/* Loading spinner or other feedback can be added here */}
      {isLoading && <span className="ml-2 text-gray-500">Loading...</span>}
    </section>
  );
};

export default Pagination;
