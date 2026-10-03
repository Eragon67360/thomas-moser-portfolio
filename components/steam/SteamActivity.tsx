"use client";
import { Card, Skeleton } from "@heroui/react";
import type { ReactNode } from "react";
import { SkeletonMessage } from "@/components/ui/SkeletonMessage";
import { useApi } from "@/hooks/useApi";
import type { SteamGamesResponse, SteamPlayerResponse } from "@/types/steam";
import { GameCard } from "./GameCard";
import { SteamProfileCard } from "./SteamProfileCard";

/** Online status and the current game can change within a minute. */
const PLAYER_POLL_MS = 60_000;
/** Two weeks of playtime moves slowly; the route is edge-cached for 10 min. */
const GAMES_POLL_MS = 600_000;

/** Same shell and rows as `SteamProfileCard`, so the card doesn't resize when the profile arrives. */
function ProfileSkeleton() {
  return (
    <Card className="w-full max-w-85">
      <Card.Header className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3.5 w-28 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-7 w-18 rounded-full" />
      </Card.Header>
      <Card.Content className="text-sm">
        <Skeleton className="my-1 h-3 w-24 rounded-md" />
        <Skeleton className="my-1 h-3 w-36 rounded-md" />
      </Card.Content>
      <Card.Footer className="gap-3 text-sm">
        <Skeleton className="my-1 h-3 w-20 rounded-md" />
        <Skeleton className="my-1 h-3 w-36 rounded-md" />
      </Card.Footer>
    </Card>
  );
}

/** Same shell as `GameCard` with its 300x140 header image (narrower cards scale it like the image). */
function GameCardSkeleton() {
  return (
    <Card className="py-4">
      <Card.Header className="px-4 pt-2 pb-0">
        <Skeleton className="my-1 h-4 w-40 rounded-md" />
        <Skeleton className="my-1 h-3 w-24 rounded-md" />
      </Card.Header>
      <Card.Content className="py-2">
        <Skeleton className="aspect-[300/140] w-75 max-w-full rounded-xl" />
      </Card.Content>
    </Card>
  );
}

function GamesGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">{children}</div>;
}

const GAMES_SKELETON = (
  <GamesGrid>
    <GameCardSkeleton />
    <GameCardSkeleton />
  </GamesGrid>
);

function ProfileSection() {
  const { data, error } = useApi<SteamPlayerResponse>("/api/steam/player", PLAYER_POLL_MS);

  if (!data && !error) return <ProfileSkeleton />;
  // A `null` player means Steam answered without a profile: as unusable for the visitor as an error.
  if (error || !data?.player) {
    return <SkeletonMessage skeleton={<ProfileSkeleton />}>Could not load the Steam profile.</SkeletonMessage>;
  }
  return <SteamProfileCard player={data.player} />;
}

function RecentGamesSection() {
  const { data, error } = useApi<SteamGamesResponse>("/api/steam/games", GAMES_POLL_MS);

  if (error) return <SkeletonMessage skeleton={GAMES_SKELETON}>Could not load recently played games.</SkeletonMessage>;
  if (!data) return GAMES_SKELETON;
  if (data.games.length === 0)
    return <SkeletonMessage skeleton={GAMES_SKELETON}>No games recently played.</SkeletonMessage>;

  return (
    <GamesGrid>
      {data.games.map((game) => (
        <GameCard key={game.appId} game={game} />
      ))}
    </GamesGrid>
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
