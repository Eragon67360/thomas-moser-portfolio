import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
const inter = Inter({ subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });
import AnimatedCursor from "react-animated-cursor";

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
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={jetbrains.className}>
        <Providers>
          <Navigation />
          {children}
          <Footer />
          <ScrollToTopButton />
        </Providers>
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color='24, 24, 24'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            'Button',
            'Link',
            '.link',
            {
              target: '.custom',              
            }
          ]}
        />

      </body>
    </html>
  );
}
