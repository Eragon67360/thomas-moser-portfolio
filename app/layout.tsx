import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import ScrollToTopButton from "@/components/ScrollToTopButton";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thomas's portfolio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="select-none scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <Navigation/>
          {children}
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
