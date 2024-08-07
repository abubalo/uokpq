import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { useFetchBookmarks } from "@/hooks/usePaperQueries";
import { useAuth } from "@/stores/userStatore";
import React from "react";
import Papers from "../paper/[paperUrl]/page";

const Bookmarks = async () => {
  const { user} = useAuth();

  if(!user){
    return <>Logged in</>
  }


  const { data, isLoading, error } = useFetchBookmarks(user?.id);

    const papers = [ {}]
  return (
    <main>
      <Header />
      <Papers papers={papers} />
      <Footer />
    </main>
  );
};

export default Bookmarks;
