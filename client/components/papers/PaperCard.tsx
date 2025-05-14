"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useAuth } from "@/stores/userStore";
import { toggleBookmark } from "@/utils/fetchPaperData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { urlForImage } from "@/lib/sanity";
import {formatDate} from "@/lib/utils"
import { SanityFile } from "@/types/sanity";

type Props = {
  id: string;
  src?: SanityFile;
  alt?: string;
  title: string;
  lecturer?: string;
  date: number | string;
  url: string;
  tags?: string[];
  bookmarked?: boolean;
};

const PaperCard: React.FC<Props> = ({
  id,
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
  const { user } = useAuth();
  const userId = String(user?.id);

  const handleToggleBookmark = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) return;

    setIsBookmarked((prev) => !prev);

    toggleBookmark({ userId, paperId: id });
  };

  return (
    <div className="relative p-4 border hover:bg-neutral-500/20 border-neutral-400 rounded-lg shadow-md backdrop-blur-md transition-colors dark:hover:bg-neutral-700/20 duration-200">
      <div className="relative w-full h-48">
        <Image
          src={src?.asset?.url || ""}
          alt={alt}
          fill
          className="rounded-t-lg object-cover hover:scale-75 duration-200"
        />
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="dark:text-gray-300">
            Taught by: <span className="font-semibold">{lecturer}</span>
          </p>
          <small className="dark:text-gray-400 font-semibold">
            Date Taken: {formatDate(date)}
          </small>
        </div>
        <div className="space-x-2">
          {tags && tags.length > 0
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
        <div className="flex justify-end items-center z-10 relative">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => handleToggleBookmark(e)}
                  className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
                >
                  {isBookmarked ? (
                    <FaBookmark className="text-yellow-500" />
                  ) : (
                    <FaRegBookmark />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isBookmarked ? "Remove bookmark" : "Add to bookmarks"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Link href={`/paper/${url}`} className="absolute inset-0 z-0" />
    </div>
  );
};

export default PaperCard;
