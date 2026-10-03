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

/**
 * Most recent track from the listening history (Deezer has no "now playing" API).
 * The card keeps one shape in every state (loading, track, empty, error) so the footer never jumps,
 * and its title is a paragraph: the footer repeats on every page and must not break heading order.
 */
export function LastPlayed() {
  const { data, error } = useApi<PlayedTracksResponse>("/api/deezer/recently-played", HISTORY_POLL_MS);
  const track = data?.tracks[0];

  return (
    <Card>
      <Card.Header className="flex flex-row items-center gap-4">
        <SiDeezer size={20} color={DEEZER_PURPLE} aria-hidden />
        <p className="text-sm leading-6 font-medium text-foreground md:text-base lg:text-lg">
          {track ? `Last played ${formatTimeAgo(track.playedAt)}` : "Last played"}
        </p>
      </Card.Header>
      <Separator />
      <Card.Content className="flex min-h-16 flex-row items-center gap-8 text-xs md:text-sm lg:text-base">
        {track ? (
          <>
            <Image
              src={track.imageUrl}
              alt={`${track.title} album cover`}
              width={64}
              height={64}
              className="size-16 rounded-md object-cover"
            />
            <div className="flex min-w-0 flex-col justify-center">
              <ExternalLink href={track.songUrl} className="truncate font-semibold hover:underline">
                {track.title}
              </ExternalLink>
              <p className="truncate font-light opacity-80">{track.artist}</p>
            </div>
          </>
        ) : error ? (
          <p className="text-muted">Could not load the last played track.</p>
        ) : data ? (
          <p className="text-muted">Nothing played recently.</p>
        ) : (
          <>
            <Skeleton className="size-16 shrink-0 rounded-md" />
            <div className="flex w-full flex-col">
              <Skeleton className="my-1 h-3 w-3/5 rounded-md md:h-4" />
              <Skeleton className="my-1 h-3 w-2/5 rounded-md md:h-4" />
            </div>
          </>
        )}
      </Card.Content>
    </Card>
  );
}
