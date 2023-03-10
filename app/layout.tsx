import React from "react";
import "../styles/globals.css";
import { AuthContext, AuthProvider } from "context/AuthContext";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
    </html>
    
  );
}

