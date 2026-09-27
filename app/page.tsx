import { Hero } from "@/components/home/Hero";
import { MostViewedPosts } from "@/components/home/MostViewedPosts";

// View counters change constantly; refresh the statically rendered page every minute.
export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="my-8 flex w-full flex-col items-center gap-8 font-jet sm:my-16 md:my-20 lg:flex-row lg:gap-8 xl:my-24">
      <Hero />
      <MostViewedPosts />
    </div>
  );
}
