
"use client"

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Papers from "@/components/papers/Papers";
import Pagination from "@/components/ui/Pagination";

export default function Home() {

  const fetchData = async (page: number) =>{
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <main className="w-full min-h-dvh">
      <Header />
      <Papers />
      <Pagination
        totalPages={100}
        fetchData={fetchData}
      />
      <Footer />
    </main>
  );
}
