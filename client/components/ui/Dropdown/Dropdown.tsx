import React, { useState, useRef, useEffect, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownItem {
  label: string | ReactNode;
  onClick: () => void;
}

interface DropdownMenuProps {
  label: string | ReactNode;
  items: DropdownItem[];
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
      );
    } else if (event.key === "Enter" && activeIndex !== -1) {
      items[activeIndex].onClick();
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && activeIndex !== -1) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  return (
    <div
      className={twMerge("relative inline-block text-left", className)}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        ref={buttonRef}
      >
        {label}
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onKeyDown={handleKeyDown}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={twMerge(
                  "block w-full text-left px-4 py-2 text-sm",
                  "hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 focus:outline-none",
                  index === activeIndex && "bg-gray-100 dark:bg-gray-800"
                )}
                role="menuitem"
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
