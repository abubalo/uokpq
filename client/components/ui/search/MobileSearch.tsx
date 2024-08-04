"use client";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/components/profile/Avatar";
import { AnimatePresence } from "framer-motion";
import HamburgerToBackArrow from "../HamburgerToBackArrow";

type SearchProps = {
  searchQuery?: string;
  onSearchChange: (query: string) => void;
  isFocused: boolean;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onOpen: () => void;
};

const MobileSearch: React.FC<SearchProps> = ({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  isFocused,
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
    onSearchChange(e.target.value);
  };

  const handleArrowClick = () => {
    if (isFocused) {
      onSearchChange(""); // Clear the search query
      onSearchBlur(); // Defocus the search input
    } else {
      onOpen(); // Open the mobile navigation
    }
  };

  return (
    <div ref={containerRef} className=" w-full max-w-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search papers..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          className="w-full py-3 pl-10 pr-12 text-sm font-semibold transition duration-150 ease-in-out bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder:text-gray-400 dark:bg-transparent dark:border-gray-500 dark:text-white dark:placeholder:text-gray-500 dark:focus-within:bg-gray-800"
        />
        <button
          type="button"
          className="absolute inset-y-0 left-0 text-gray-800 flex items-center pl-3 dark:text-gray-200"
        >
          <AnimatePresence>
            <HamburgerToBackArrow
              isFocused={isFocused}
              onArrowClick={handleArrowClick}
            />
          </AnimatePresence>
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
