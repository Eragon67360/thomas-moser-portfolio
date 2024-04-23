import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <hr className="w-full h-px border-0 bg-gray-200"/>
      <About/>
    </main>
  );
}
