"use client";
import { Skeleton } from "@heroui/react";
import { useApi } from "@/hooks/useApi";
import type { SteamGamesResponse, SteamPlayerResponse } from "@/types/steam";
import { GameCard } from "./GameCard";
import { SteamProfileCard } from "./SteamProfileCard";

const CARD_SKELETON = "h-48 w-72 rounded-2xl";

function ProfileSection() {
  const { data, error } = useApi<SteamPlayerResponse>("/api/steam/player");

  if (error) return <p className="text-muted">Could not load the Steam profile.</p>;
  if (!data) return <Skeleton className={CARD_SKELETON} />;
  return data.player && <SteamProfileCard player={data.player} />;
}

function RecentGamesSection() {
  const { data, error } = useApi<SteamGamesResponse>("/api/steam/games");

  if (error) return <p className="text-muted">Could not load recently played games.</p>;
  if (data?.games.length === 0) return <p className="text-muted">No games recently played.</p>;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {data
        ? data.games.map((game) => <GameCard key={game.appId} game={game} />)
        : [0, 1].map((i) => <Skeleton key={i} className={CARD_SKELETON} />)}
    </div>
  );
}

export function SteamActivity() {
  return (
    <section className="my-8 flex w-full max-w-7xl flex-col items-center gap-8">
      <ProfileSection />
      <RecentGamesSection />
    </section>
  );
}
