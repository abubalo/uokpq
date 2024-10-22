"use client";

import React, { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface AutoSuggestInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onSelect"
  > {
  suggestions: string[];
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
}

const AutoSuggestInput = React.forwardRef<
  HTMLInputElement,
  AutoSuggestInputProps
>(({ className, suggestions, onSelect, onChange, ...props }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange?.(value);

    const filtered = value
      ? suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (event.key === "Enter" && activeIndex > -1) {
      handleSelect(filteredSuggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setShowSuggestions(false);
    onSelect?.(value);
    onChange?.(value);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Input
        {...props}
        ref={ref}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-background border rounded-md shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
              className={cn(
                "px-4 py-2 text-sm cursor-pointer hover:bg-background/80",
                activeIndex === index && "bg-background/90"
              )}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

AutoSuggestInput.displayName = "AutoSuggestInput";

export { Input, AutoSuggestInput };
