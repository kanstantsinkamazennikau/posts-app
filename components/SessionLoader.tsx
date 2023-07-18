"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

interface SessionLoader {
  children: React.ReactNode;
}

export default function SessionLoader({ children }: SessionLoader) {
  const { status } = useSession();

  if (status === "loading")
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return <>{children}</>;
}
