import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { site } from "@/config/site";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--next-font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--next-font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { template: `%s - ${site.author}`, default: site.title },
  description: site.description,
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  keywords: ["Personal Website", "Personal Blog", "Web Development"],
  authors: [{ name: site.author }],
  creator: site.author,
  publisher: site.author,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`dark scroll-smooth overflow-x-hidden ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-inter text-foreground">
        <Providers>
          <div className="flex min-h-screen flex-col justify-between">
            <Navigation />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </div>
          <ScrollToTopButton />
          <CustomCursor />
        </Providers>
        <Analytics />
        <AdSenseScript />
      </body>
    </html>
  );
}
