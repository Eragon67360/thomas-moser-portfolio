import type { Metadata } from "next";
import { RecentlyPlayed } from "@/components/deezer/RecentlyPlayed";
import { TopArtists } from "@/components/deezer/TopArtists";
import { TopTracks } from "@/components/deezer/TopTracks";
import { SteamActivity } from "@/components/steam/SteamActivity";
import { SectionTitle } from "@/components/ui/Typography";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Activities",
  description: "What Thomas Moser does besides programming: recent Steam games and Deezer listening.",
  path: "/activities",
});

export default function ActivitiesPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-8">
      <h1 className="sr-only">Activities</h1>
      <SectionTitle>Steam profile and games</SectionTitle>
      <SteamActivity />

      <SectionTitle>Deezer profile and streams</SectionTitle>
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
