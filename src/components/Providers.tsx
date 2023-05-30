"use client";

import { MessagesProvider } from "@/context/messages";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        <Toaster position="top-center" />
        {children}
      </MessagesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
