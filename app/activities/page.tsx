import type { Metadata } from "next";
import { RecentlyPlayed } from "@/components/spotify/RecentlyPlayed";
import { TopArtists } from "@/components/spotify/TopArtists";
import { TopTracks } from "@/components/spotify/TopTracks";
import { SteamActivity } from "@/components/steam/SteamActivity";
import { SectionTitle } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Activities",
  description: "What I do beside programming.",
  alternates: { canonical: "/activities" },
};

export default function ActivitiesPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-8">
      <SectionTitle>Steam profile and games</SectionTitle>
      <SteamActivity />

      <SectionTitle>Spotify profile and streams</SectionTitle>
      <div className="flex w-full flex-col items-center gap-8 py-8 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-8 lg:w-1/2">
          <TopArtists />
          <TopTracks />
        </div>
        <div className="w-full lg:w-1/2">
          <RecentlyPlayed />
        </div>
      </div>
    </div>
  );
}
