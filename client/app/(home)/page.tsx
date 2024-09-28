"use client";

import Pagination from "@/components/ui/Pagination";
import { usePapers } from "@/hooks/usePaperQueries";
import Papers from "@/components/papers/Papers";
import Search from "@/components/ui/search/Search";
import { Suspense, useState } from "react";
import PaperCardSkeleton from "@/components/papers/PaperCardSkeleton";
import Image from "next/image";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePapers(page);

  const fetchData = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <PaperCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/assets/csc.png"
            alt="Cute sleeping cat"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
          <span className="text-lg font-semibold">
            Error loading papers. Please try again later.
          </span>
          <button
            onClick={() => fetchData(page)} // Add a retry functionality
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!data?.papers || data.papers.length === 0) {
      return (
        <div className="text-center">
          No papers found. Try adjusting your search.
        </div>
      );
    }

    return <Papers papers={data.papers} />;
  };

  return (
    <main className="w-full h-auto min-h-dvh">
      <section className="container mx-auto flex gap-4 items-center justify-center flex-col h-96">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Find the Past CAT and Exam Papers
        </h1>
        <p>Discover previous CAT and exam papers to help you prepare better.</p>
        <Suspense>
          <Search />
        </Suspense>
      </section>
      <div className="mb-8">{renderContent()}</div>
      {data && data.totalPage > 1 && (
        <Pagination
          totalPages={data.totalPage}
          currentPage={page}
          onPageChange={fetchData}
        />
      )}
    </main>
  );
}
