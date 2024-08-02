"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { SearchOptions } from "../../shared/Icons";
import ToolTip from "../Tooltip";
import { IoMenuSharp } from "react-icons/io5";
import Avatar from "@/components/profile/Avatar";

type SearchProps = {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onOpen: () => void;
};

const MobileSearch: React.FC<SearchProps> = ({
  searchQuery,
  onSearchChange,
  onOpen,
}) => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowAdvanceOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onSearchChange(e.target.value);
  };

  return (
    <div ref={containerRef} className="relative  w-full max-w-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search papers..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full py-3 pl-10 pr-12 text-sm font-semibold transition duration-150 ease-in-out bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder:text-gray-400 dark:bg-transparent dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus-within:bg-gray-800"
        />
        <button onClick={onOpen} className="absolute inset-y-0 left-0 text-gray-800 flex items-center pl-3 dark:text-gray-200">
          <IoMenuSharp size={24} />
        </button>
        <button
          aria-label="profile settings"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <Avatar
            src="https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            size="sm"
          />
        </button>
      </div>
    </div>
  );
};

export default MobileSearch;
