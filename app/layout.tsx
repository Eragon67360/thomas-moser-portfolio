import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { feedAlternate, sharedOpenGraph } from "@/lib/seo/metadata";
import { siteGraph } from "@/lib/seo/structured-data";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--next-font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--next-font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { template: `%s | ${site.author}`, default: site.title },
  description: site.description,
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  keywords: [site.author, "Full-Stack Developer", "Next.js", "TypeScript", "Vue.js", "NestJS", "Portfolio", "Blog"],
  authors: [{ name: site.author, url: "/about" }],
  creator: site.author,
  publisher: site.author,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    types: feedAlternate,
  },
  openGraph: { ...sharedOpenGraph, type: "website", url: "/", title: site.title, description: site.description },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  // Matches the site background so mobile browser chrome blends in.
  themeColor: "#16181d",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark motion-safe:scroll-smooth overflow-x-hidden ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-inter text-foreground">
        <JsonLd data={siteGraph()} />
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
      </body>
    </html>
  );
}
