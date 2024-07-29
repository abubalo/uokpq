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
  text: string;
  lecturer: string;
  date: string;
  url: string;
  tags: string[];
  bookmarked: boolean;
};

const PaperCard: React.FC<Props> = ({
  src,
  alt = "",
  title,
  text,
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
    <div className="relative p-4 border border-neutral-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-full h-48">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="py-4 pb-2 space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="dark:text-gray-300">{text}</p>
          <p className="dark:text-gray-300">
            Taught by: <span className="font-semibold">{lecturer}</span>
          </p>
        </div>
        <small className="dark:text-gray-400 font-semibold">Date: {date}</small>
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
            <span onClick={(e) => handleToggleBookmark(e)}>
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </span>
          </ToolTip>
        </div>
      </div>
      <Link href={`/paper/${url}`} className="absolute inset-0" />
    </div>
  );
};

export default PaperCard;