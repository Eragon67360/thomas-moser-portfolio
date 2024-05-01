import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/projects/Projects";
import Competencies from "@/components/Competencies";
export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between font-jet">
      <Hero />
    </main>
  );
}
