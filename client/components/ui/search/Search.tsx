"use client";

import { useEffect, useRef, useState } from "react";
import { SearchOptions } from "../../shared/Icons";
import ToolTip from "../Tooltip";
import AdvanceSearchOption from "./AdvanceSearchOption";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSearchStore } from "@/stores/searchStore";


const Search: React.FC = () => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { query, setQuery } = useSearchStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    setQuery(queryParam);
  }, [searchParams, setQuery]);

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

  const updateSearchParams = (
    term: string,
    searchParams: URLSearchParams,
    pathname: string,
    replace: (url: string) => void
  ) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSearch = (term: string) => {
    updateSearchParams(term, searchParams, pathname, replace);
  };

  return (
    <div
      ref={containerRef}
      className="relative hidden w-full md:max-w-md lg:max-w-2xl md:block"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search papers by name, lecturer, code..."
          value={query}
          onChange={handleInputChange}
          className="w-full py-3 pl-10 pr-12 text-sm transition duration-150 ease-in-out bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent placeholder:text-gray-400 dark:bg-transparent dark:border-gray-400 dark:text-white dark:placeholder:text-gray-500 dark:focus-within:bg-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ToolTip text="Show options">
            <button
              type="button"
              className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none"
              onClick={() => setShowAdvanceOptions(true)}
            >
              <SearchOptions className="w-5 h-5" />
            </button>
          </ToolTip>
        </div>
      </div>
      <AdvanceSearchOption showAdvanceOptions={showAdvanceOptions} />
    </div>
  );
};

export default Search;
