import React from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    // <LoadingScreen />
    <main className="flex w-full flex-col items-center justify-between font-jet">
      <Hero />
    </main>
  );
}
