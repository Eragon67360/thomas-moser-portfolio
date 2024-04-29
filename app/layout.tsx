import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Analytics } from "@vercel/analytics/react"
import AnimatedCursor from "react-animated-cursor";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", '700', '800'],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", '700', '800'],
  variable: "--font-jetbrains",
});


export const metadata: Metadata = {
  title: "Thomas's portfolio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-hidden`}>
      <body className={`${inter.variable} ${jetbrains.variable}`}>
        <Providers>
          <Navigation />
          {children}
          <Footer />
          <ScrollToTopButton />
        </Providers>
        <div className="hidden sm:block">
          <AnimatedCursor
            innerSize={8}
            outerSize={8}
            color='128,128,128'
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
        </div>


      </body>
    </html>
  );
}
