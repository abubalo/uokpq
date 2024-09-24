"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Pagination from "@/components/ui/Pagination";
import { usePapers } from "@/hooks/usePaperQueries";
import Papers from "@/components/papers/Papers";
import Search from "@/components/ui/search/Search";
import { useState } from "react";
import PaperCardSkeleton from "@/components/papers/PaperCardSkeleton";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePapers(page);

  const fetchData = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const renderContent = () => {
    if (error) {
      console.log(error);
      return <div>Error loading papers</div>;
    }

    if (!data) {
      return <div>No papers found!</div>;
    }

    return (
      <>
        {isLoading ? (
          <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-0">
            {[...Array(6)].map((_, i) => (
              <PaperCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Papers papers={data.papers} />
        )}
      </>
    );
  };

  return (
    <main className="w-full h-auto min-h-dvh">
      <Header />
      <section className="container mx-auto flex gap-4 items-center justify-center flex-col h-96">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Find the Past CAT and Exam Papers
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
          debitis voluptatibus ipsam tempora, incidunt illum laudantium.
        </p>
        <Search />
      </section>
      {renderContent()}
      {data && data.papers.length > 0 && (
        <Pagination
          totalPages={data.totalPage}
          currentPage={page}
          onPageChange={fetchData}
        />
      )}
      <Footer />
    </main>
  );
}
