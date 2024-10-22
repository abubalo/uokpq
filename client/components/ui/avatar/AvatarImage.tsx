import Image from "next/image";
import React from "react";

type Props = {
  size: "sm" | "md" | "lg";
  src: string;
  alt?: string;
};
const AvatarImage: React.FC<Props> = ({ size = "md", src, alt = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      className={`${sizeClasses[size]} rounded-full object-cover border-2 bg-green-500 border-white shadow-sm`}
    />
  );
};

export default AvatarImage;