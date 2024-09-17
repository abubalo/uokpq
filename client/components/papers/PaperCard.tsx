"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import ToolTip from "../ui/Tooltip";

type Props = {
  src: string;
  alt?: string;
  title: string;
  lecturer: string;
  date: number | string;
  url: string;
  tags: string[];
  bookmarked: boolean;
};

const PaperCard: React.FC<Props> = ({
  src,
  alt = "",
  title,
  lecturer,
  date,
  url,
  tags,
  bookmarked,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const handleToggleBookmark = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setIsBookmarked(!isBookmarked);
  };
  return (
    <div className="relative p-4 border hover:bg-neutral-500/20 border-neutral-400 rounded-lg shadow-md backdrop-blur-md transition-colors dark:hover:bg-neutral-700/20 duration-200">
      <div className="relative w-full h-48">
        <Image src={src} alt={alt} fill className="rounded-t-lg object-cover hover:scale-75 duration-200" />
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="dark:text-gray-300">
            Taught by: <span className="font-semibold">{lecturer}</span>
          </p>
          <small className="dark:text-gray-400 font-semibold">
            Date Taken: {date}
          </small>
        </div>
        <div className="space-x-2">
          {tags.length > 0
            ? tags.map((tag) => (
                <span
                  key={tag}
                  className="p-2 bg-gray-400 border dark:border-gray-300/70 dark:bg-transparent rounded-md"
                >
                  {tag}
                </span>
              ))
            : null}
        </div>
        <div className="flex justify-end items-center">
          <ToolTip text={isBookmarked ? "unbookmark" : "bookmark"}>
            <button onClick={(e) => handleToggleBookmark(e)}>
              {isBookmarked ? (
                <FaBookmark className="text-yellow-500" />
              ) : (
                <FaRegBookmark />
              )}
            </button>
          </ToolTip>
        </div>
      </div>
      <Link href={`/paper/${url}`} className="absolute inset-0" />
    </div>
  );
};

export default PaperCard;
