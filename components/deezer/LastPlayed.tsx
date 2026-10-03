"use client";
import { Card, Separator, Skeleton } from "@heroui/react";
import Image from "next/image";
import { SiDeezer } from "react-icons/si";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useApi } from "@/hooks/useApi";
import type { PlayedTracksResponse } from "@/types/music";
import { formatTimeAgo } from "./format";

const DEEZER_PURPLE = "#A238FF";
/** A track is rarely shorter than a minute; the route is edge-cached for 30 s anyway. */
const HISTORY_POLL_MS = 60_000;

/** Most recent track from the listening history (Deezer has no "now playing" API). */
export function LastPlayed() {
  const { data, error } = useApi<PlayedTracksResponse>("/api/deezer/recently-played", HISTORY_POLL_MS);
  const track = data?.tracks[0];

  return (
    <Card>
      <Card.Header className="flex flex-row items-center gap-4">
        <SiDeezer size={20} color={DEEZER_PURPLE} aria-hidden />
        {!data && !error ? (
          <Skeleton className="h-6 w-40 rounded-lg" />
        ) : (
          <Card.Title className="text-sm md:text-base lg:text-lg">
            {track ? `Last played ${formatTimeAgo(track.playedAt)}` : "Nothing played recently"}
          </Card.Title>
        )}
      </Card.Header>
      {track && (
        <>
          <Separator />
          <Card.Content className="flex flex-row gap-8">
            <Image
              src={track.imageUrl}
              alt={`${track.title} album cover`}
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div className="flex min-w-0 flex-col justify-center text-xs md:text-sm lg:text-base">
              <ExternalLink href={track.songUrl} className="truncate font-semibold hover:underline">
                {track.title}
              </ExternalLink>
              <p className="truncate font-light opacity-80">{track.artist}</p>
            </div>
          </Card.Content>
        </>
      )}
    </Card>
  );
}
