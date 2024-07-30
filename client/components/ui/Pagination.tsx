"use client";

import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type Props = {
  totalPages: number;
  fetchData: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ totalPages, fetchData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage - halfVisible < 1) {
      endPage = Math.min(totalPages, endPage + (halfVisible - currentPage + 1));
    }

    if (currentPage + halfVisible > totalPages) {
      startPage = Math.max(
        1,
        startPage - (currentPage + halfVisible - totalPages)
      );
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className="px-4 py-2 rounded-md bg-gray-300 text-gray-700"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-4 py-2 border rounded-md">
            <BsThreeDots />
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-4 py-2 border rounded-md">
            <BsThreeDots />
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className="px-4 py-2 rounded-md bg-gray-300 text-gray-700"
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
      className="w-full flex justify-center items-center space-x-2 my-6"
    >
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md flex items-center space-x-1 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white"
        }`}
      >
        <MdArrowBackIosNew />
        <span>Prev</span>
      </button>
      <div className="flex space-x-1">{renderPageNumbers()}</div>
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md flex items-center space-x-1 ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white"
        }`}
      >
        <span>Next</span>
        <MdArrowForwardIos />
      </button>
    </section>
  );
};

export default Pagination;
