import React from "react";

const PaperCardSkeleton: React.FC = () => {
  return (
    <div className="relative p-4 border border-neutral-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-full h-48 bg-gray-300 animate-pulse rounded-t-lg"></div>
      <div className="py-4 pb-2 space-y-6">
        <div className="space-y-1">
          <div className="h-6 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
        </div>
        <div className="space-x-2">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-block p-2 bg-gray-300 animate-pulse rounded-md w-20"></span>
          ))}
        </div>
        <div className="flex justify-end items-center">
          <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PaperCardSkeleton;
