import React from "react";

const PaperCardSkeleton: React.FC = () => {
  return (
    <>
      <div className="relative p-4 border border-neutral-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        {/* Skeleton image */}
        <div className="relative w-full h-48 bg-gray-300 rounded-t-lg skeleton-loading"></div>
        <div className="py-4 pb-2 space-y-6">
          {/* Skeleton text */}
          <div className="space-y-1">
            <div className="h-6 bg-gray-300 rounded skeleton-loading"></div>
            <div className="h-4 bg-gray-300 rounded skeleton-loading"></div>
            <div className="h-4 bg-gray-300 rounded skeleton-loading"></div>
          </div>
          {/* Skeleton buttons */}
          <div className="space-x-2">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="inline-block p-2 bg-gray-300 rounded-md w-20 skeleton-loading"
              ></span>
            ))}
          </div>
          {/* Skeleton avatar */}
          <div className="flex justify-end items-center">
            <div className="h-6 w-6 bg-gray-300 rounded-full skeleton-loading"></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .skeleton-loading {
          background: linear-gradient(
            90deg,
            #cecdcd 25%,
            #f0f0f0 50%,
            #cecdcd 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
};

export default PaperCardSkeleton;
