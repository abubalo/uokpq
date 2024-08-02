"use client";

import { useState, useEffect, useCallback } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Search from "./search/Search";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../profile/Avatar";
import MobileSearch from "./search/MobileSearch";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearch = (query: string) => {};

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

  const user = true;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="container hidden mx-auto px-4 py-3 md:block">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Home">
              <Image
                src="/uokpq.svg"
                alt="uokpq logo"
                width={100}
                height={100}
                className="w-10 h-10"
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
                <FiSun className="text-yellow-400" size={24} />
              ) : (
                <FiMoon className="text-gray-600" size={24} />
              )}
            </button>
            {user ? (
              <Avatar
                src="https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User Avatar"
              />
            ) : (
              <Link
                href="/login"
                className="hidden border px-4 py-2 rounded-full transition-colors md:block hover:bg-blue-500/70"
                aria-label="Login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Navbar */}
      <div className="block sticky top-0 px-4 py-2 bg-neutral-800/70 border-b border-neutral-300/40 backdrop-blur-lg md:hidden">
        <MobileSearch
          onOpen={handleNavOpen}
          searchQuery=""
          onSearchChange={handleSearch}
        />
      </div>
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="container mx-auto flex flex-col md:hidden"
          >
            <div className="relative min-h-dvh font-semibold">
              <ul className="absolute inset-0 w-full p-4 space-y-4 z-50 bg-white dark:bg-gray-900">
                <li className="py-2 border-b">
                  <Link href="/bookmarks" aria-label="Bookmarks">Bookmarks</Link>
                </li>
                <li className="py-2 border-b">
                  <Link href="/profile" aria-label="Profile">Profile</Link>
                </li>
                <li className="py-2 border-b">
                  <Link href="/help" aria-label="Help">Help</Link>
                </li>
                <li className="py-2 border-b">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                    aria-label={
                      darkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                  >
                    {darkMode ? (
                      <FiSun className="text-yellow-400" size={20} />
                    ) : (
                      <FiMoon className="text-gray-600" size={20} />
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header