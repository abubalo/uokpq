"use client";

import { useState, useEffect, useCallback } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Search from "./search/Search";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setDarkMode(savedMode === "true" || (savedMode === null && prefersDark));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  return (
    <header className="sticky top-0 bg-white/30 dark:bg-neutral-800/30 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              <Image
                src={"/uokpq.svg"}
                alt="uokpq logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          {/* Search Box */}
          <Search />

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FiSun className="text-yellow-400" size={30} />
              ) : (
                <FiMoon className="text-gray-600" size={30} />
              )}
            </button>
            <Link
              href="/login"
              className="hidden bg-blue-500/80  hover:bg-blue-600/80 text-white px-4 py-2 rounded-full transition-colors md:block"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
