"use client";
import { useAuth } from "@/stores/userStore";
import { User } from "@/types";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers: React.FC<{
  children: React.ReactNode;
  initialUser?: User | null;
}> = ({ children, initialUser }) => {
  const [queryClient] = useState(new QueryClient());
  const { fetchProfile } = useAuth();

  useEffect(() => {
    if (initialUser) {
      useAuth.setState({ user: initialUser });
    } else {
      fetchProfile();
    }
  }, [fetchProfile, initialUser]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
