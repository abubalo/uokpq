"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Pagination from "@/components/ui/Pagination";
import { usePapers } from "@/hooks/usePaperQueries";
import Papers from "@/components/papers/Papers";
import Search from "@/components/ui/search/Search";
import { useState } from "react";

export default function Home() {
  const { data, error, isLoading } = usePapers();
  const [onSearchFocus, setOnsearchFocus] = useState(false);

  // if (error) {
  //   return <div>Error occured</div>;
  // }

  // if (isLoading) {
  //   return <>Loading...</>;
  // }

  const fetchData = async (page: number) => {
    try {
    } catch (error) {}
  };

  const handleSearch = (query: string) => {};

  const handleSearchFocus = (isFocused?: boolean) => {
    setOnsearchFocus(true || isFocused);
  };
  const handleSearchBlur = () => {
    setOnsearchFocus(false);
  };

  return (
    <main className="w-full h-auto min-h-dvh">
      <Header />
      <section className="container mx-auto flex gap-4 items-center justify-center flex-col h-96">
        <h1 className="text-3xl font-semibold md:text-5xl ">
          Find the Past CAT and Exam Papers
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
          debitis voluptatibus ipsam tempora, incidunt illum laudantium.
        </p>
        <Search />
      </section>
      <Papers papers={data} />
      <Pagination totalPages={100} fetchData={fetchData} />
      <Footer />
    </main>
  );
}
