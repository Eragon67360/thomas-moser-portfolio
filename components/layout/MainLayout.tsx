'use client'
import { Providers } from "@/app/providers";
import Navigation from "../Navigation";
import { usePathname, useSearchParams } from "next/navigation";
import AnimatedCursor from "react-animated-cursor";
import { Footer } from "../Footer";
import ScrollToTopButton from "../ScrollToTopButton";
import { Inter, JetBrains_Mono } from "next/font/google";
import { motion } from 'framer-motion';
import "../../app/globals.css";
import 'prismjs/themes/prism-okaidia.css';
import { useEffect, useState } from "react";


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

export default function MainLayout({ children }: any) {
  const pathname = usePathname();
  const isBlogPost = [`/blog/`].some((prefix) =>
    pathname.startsWith(prefix),
  );
  const containerClass = isBlogPost ? 'max-w-screen' : 'mx-auto my-8 md:my-12 lg:my-16 xl:my-24  max-w-[80rem] px-0 xs:px-6 md:px-24 lg:px-8';

  return (

    <body className={`${inter.variable} ${jetbrains.variable} background-core`}>
      <Providers>
        <Navigation />
        <motion.main
          // key={pathname}
          initial='pageInitial'
          animate='pageAnimate'
          variants={{
            pageInitial: { opacity: 0 },
            pageAnimate: { opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`${containerClass}`}>
          {children}
        </motion.main>
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
  );
};

