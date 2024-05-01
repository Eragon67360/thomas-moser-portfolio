import React, { ReactNode } from "react";
import type { Metadata } from "next";

import { dataSeo } from "@/lib/data";
import AdSense from "@/components/ads/AdSense";
import MainLayout from "@/components/layout/MainLayout";
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s - Thomas Moser',
    default: dataSeo.title,
  },
  generator: 'Next.js',
  applicationName: 'thomasmoserdev.com',
  referrer: 'origin-when-cross-origin',
  keywords: ['Personal Website', 'Personal Blog', 'Web Development'],
  authors: [{ name: dataSeo.name }],
  creator: dataSeo.name,
  publisher: dataSeo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(dataSeo.url),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  // openGraph: dataOpenGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-hidden dark`}>
      <head>
        <AdSense pId={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID!} />
      </head>
      <MainLayout>
        {children}
      </MainLayout>
    </html>
  );
}
