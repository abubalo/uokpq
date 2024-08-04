
"use client"

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Pagination from "@/components/ui/Pagination";
import PaperCard from "@/components/papers/PaperCard";

export default function Home() {

  const fetchData = async (page: number) =>{
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <main className="w-full min-h-dvh">
      <Header />
      <section className="container mx-auto h-full min-h-dvh flex flex-col">
        <div className="grid grid-cols-1 p-4 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-6 md:p-0">
          <PaperCard
            src="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Introduction to Computer"
            text="computer science"
            lecturer="Turimukuza Maurice"
            date="17th July 2024"
            url="066daa3096def8afb1ea91adc77d1f"
            tags={["Computer sci.", "BBIT", "BIT"]}
            bookmarked={true}
          />
          <PaperCard
            src="https://images.unsplash.com/photo-1570929057588-6952f7dd2305?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Calculus"
            text="BIT & computer science"
            lecturer="Merci Nyankundi"
            date="13th June 2024"
            url="c3c7c86871ada5c3d464d983034440"
            tags={["Mathematics", "Computer Sci.", "BIT"]}
            bookmarked={true}
          />
          <PaperCard
            src="https://images.unsplash.com/photo-1547316020-d4d41ac8e283?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Entreprenuership"
            text="General"
            lecturer="Temitoyo"
            date="2nd Fed 2024"
            url="29152d9029e88a9a68afb1f26d86b0"
            tags={["General", "Computer sci", "BIT", "BBIT"]}
            bookmarked={false}
          />
          <PaperCard
            src="https://images.unsplash.com/photo-1547316020-1cdfa292ce63?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Comnunication Skills"
            text="General"
            lecturer="Valens"
            date="09th March 2024"
            url="51e325e6e72e54b84b9972172398f4"
            tags={["General", "Computer sci", "BIT", "BBIT"]}
            bookmarked={false}
          />
          <PaperCard
            src="https://images.unsplash.com/photo-1532153354457-5fbe1a3bb0b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Object Oriented programming"
            text="Computer science & BIT"
            lecturer="Valens"
            date="09th March 2024"
            url="51e325e6e72e54b84b9972172398f4"
            tags={["Computer sci", "BIT"]}
            bookmarked={true}
          />
          <PaperCard
            src="https://images.unsplash.com/photo-1627923267579-b3ab60ce20a5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Linear Algebra"
            text="Computer science"
            lecturer="Valens"
            date="09th March 2024"
            url="51e325e6e72e54b84b9972172398f4"
            tags={["Mathematics", "Computer sci", "BIT"]}
            bookmarked={false}
          />
        </div>
      </section>
      <Pagination
        totalPages={10}
        fetchData={fetchData}
      />
      <Footer />
    </main>
  );
}
