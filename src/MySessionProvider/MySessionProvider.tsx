"use client";
import { SessionProvider } from "next-auth/react"; 
import React from "react";

export default function MySessionProvider({children,}:{children: React.ReactNode}) {
  return <SessionProvider>
    {children}   {/* (children==>All Applications) all the children will have access to the session */} 
    </SessionProvider>;
}
