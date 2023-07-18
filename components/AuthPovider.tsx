"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface AuthProvider {
  children: React.ReactNode;
  session?: Session;
}

export default function AuthProvider({ children, session }: AuthProvider) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
