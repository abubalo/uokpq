"use client"
import React from "react";
import Papers from "@/components/papers/Papers";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { useFetchBookmarks } from "@/hooks/usePaperQueries";
import { useAuth } from "@/stores/userStore";

const BookmarksContent: React.FC<{userId: string}> = ({ userId }) => {
  const { data, isLoading, error } = useFetchBookmarks(userId);
  
  if (error) {
    return <div>Error occurred</div>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!data) {
    return <>No data</>;
  }

  return <Papers papers={data} />;
};

const Bookmarks = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view bookmarks</div>;
  }

  return (
    <main>
      <Header />
      <BookmarksContent userId={user.id} />
      <Footer />
    </main>
  );
};

export default Bookmarks;