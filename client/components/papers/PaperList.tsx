import { Paper } from "@/types/sanity";
import React from "react";
import PaperCard from "./PaperCard";
import { urlForImage } from "@/lib/sanity";

const PapersList: React.FC<{ papers: Paper[] }> = ({ papers }) => {
  return (
    <section className="container mx-auto h-full min-h-dvh flex flex-col">
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 md:p-0">
        {papers && papers.length === 0 ? (
          <p>No papers available</p>
        ) : (
          papers?.map((paper) => (
            <PaperCard
              key={paper._id}
              id={paper._id}
              src={paper.thumbnail}
              title={paper.moduleTitle}
              lecturer={paper.lecturer?.name}
              date={paper._createdAt}
              url={paper.pdfFile?.asset.url}
              tags={paper?.tags}
              bookmarked={true}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default PapersList;
