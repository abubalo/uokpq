import { Paper } from "@/types";
import React from "react";
import PaperCard from "./PaperCard";

const Papers: React.FC<{ papers: Paper[] }> = ({ papers }) => {
  return (
    <section className="container mx-auto h-full min-h-dvh flex flex-col">
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 md:p-0">
        {papers && papers.length === 0 ? (
          <p>No papers available</p>
        ) : (
          papers?.map((paper) => (
            <PaperCard
              key={paper.id}
              id={paper.id}
              src={paper.thumbnail}
              title={paper.title}
              lecturer={paper.lecturerName}
              date={paper.updatedAt}
              url={paper.filePath}
              tags={paper.tags}
              bookmarked={paper.isBookmarked}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Papers;
