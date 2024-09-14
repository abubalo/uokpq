import Papers from "@/components/papers/Papers";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { useFetchBookmarks } from "@/hooks/usePaperQueries";
import { useAuth } from "@/stores/userStatore";
import React from "react";

const Bookmarks = async () => {
  const { user } = useAuth();

  
  const { data, isLoading, error } = useFetchBookmarks(user?.id);
  
  if (!user) {
    return <>Logged in</>;
  }

  if (error) {
    return <div>Error occured</div>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!data) {
    return <>No data</>;
  }

  return (
    <main>
      <Header />
      <Papers papers={data} />
      <Footer />
    </main>
  );
};

export default Bookmarks;
