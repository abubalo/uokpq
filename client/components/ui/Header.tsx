"use client";

import { useState, useEffect, useCallback } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../profile/Avatar";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/stores/userStore";
import HamburgerToCancel from "./HamburgerToCancel";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { user } = useAuth();

  const handleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

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

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);

  return (
    <header className="w-full sticky top-0 z-40">
      <nav className="hidden px-4 py-3 md:block bg-neutral-800/70 backdrop-blur-md border-b border-gray-200/30">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="website logo" className="flex-shrink-0">
            <Image src="/uokpq.svg" alt="uokpq logo" width={80} height={80} />
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="text-yellow-400" size={24} /> : <FiMoon className="text-gray-600" size={24} />}
            </button>
            {user ? (
              <Avatar
                src="https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User Avatar"
                size="sm"
              />
            ) : (
              <Link href="/login" className="hidden border px-4 py-2 rounded-full transition-colors md:block hover:bg-blue-500/70" aria-label="Login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="flex justify-between items-center top-0 px-4 py-3 bg-neutral-800/70 border-b border-neutral-300/40 backdrop-blur-lg md:hidden">
        <HamburgerToCancel isOpen={isNavOpen} onOpen={handleNavOpen} />
        <button
          aria-label="profile settings"
          className="flex items-center pr-3"
        >
          <Avatar
            src="https://plus.unsplash.com/premium_photo-1683140618951-6232339fdb97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            size="sm"
          />
        </button>
      </div>

      <AnimatePresence>
        {isNavOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-0 bg-black z-20 cursor-pointer"
              aria-label="background overlay"
              onClick={handleNavOpen}
            />
            {/* Navigation Panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full z-30 flex flex-col md:hidden w-[300px]"
            >
              <div className="relative min-h-dvh font-semibold">
                <ul className="absolute left-0 top-0 bottom-0 w-full p-4 z-30 space-y-4 bg-white dark:bg-neutral-900">
                  <li className="py-2 border-b">
                    <Link href="/bookmarks" aria-label="Bookmarks">
                      Bookmarks
                    </Link>
                  </li>
                  <li className="py-2 border-b">
                    <Link href="/profile" aria-label="Profile">
                      Profile
                    </Link>
                  </li>
                  <li className="py-2 border-b">
                    <Link href="/help" aria-label="Help">
                      Help
                    </Link>
                  </li>
                  <li className="py-2 border-b">
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                      {darkMode ? <FiSun className="text-yellow-400" size={20} /> : <FiMoon className="text-gray-600" size={20} />}
                    </button>
                  </li>
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
