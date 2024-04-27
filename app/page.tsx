import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Competencies from "@/components/Competencies";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <hr className="w-[95dvw] max-w-[1440px] h-px border-0 bg-gray-500/30 dark:bg-none" />
      <About />
      <hr className="w-[95dvw] max-w-[1440px] h-px border-0 bg-gray-500/30" />
      <Competencies />
      <hr className="w-[95dvw] max-w-[1440px] h-px border-0 bg-gray-500/30" />
      <Projects />
    </main>
  );
}
