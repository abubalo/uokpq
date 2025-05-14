"use client";
import React from "react";
import Papers from "@/components/papers/PaperList";
import { useFetchBookmarks } from "@/hooks/usePaperQueries";
import { useAuth } from "@/stores/userStore";
import PaperCardSkeleton from "@/components/papers/PaperCardSkeleton";
import Login from "../(auth)/login/page";

const BookmarksContent: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, error } = useFetchBookmarks(userId);

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
      <div className="flex justify-center items-center flex-col gap-3">
        Error occurred while feching papers. Please try again later.
      </div>
    );
  }

  if (!data || data.papers.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-3">
        No papers available!
      </div>
    );
  }

  return <Papers papers={data.papers} />;
};

const Bookmarks = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <main>
      <section className="container mx-auto my-8 h-auto min-h-dvh md:my-12">
        <BookmarksContent userId={user.id} />
      </section>
    </main>
  );
};

export default Bookmarks;
