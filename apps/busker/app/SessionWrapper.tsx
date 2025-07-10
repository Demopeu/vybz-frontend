"use client";
import { SessionProvider } from "next-auth/react";
import TanstackQueryProvider from "@/provider/TanstackQueryProvider";

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </SessionProvider>
  );
} 