"use client";
import { Card, Separator, Skeleton } from "@heroui/react";
import Image from "next/image";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useApi } from "@/hooks/useApi";
import type { NowPlayingResponse } from "@/types/spotify";
import { PlayingIndicator } from "./PlayingIndicator";
import { SpotifyLogo } from "./SpotifyLogo";

export function NowPlaying() {
  const { data, error } = useApi<NowPlayingResponse>("/api/spotify/now-playing", 10_000);
  const song = data?.isPlaying ? data : null;

  return (
    <Card>
      <Card.Header className="flex flex-row items-center gap-4">
        <SpotifyLogo />
        {!data && !error ? (
          <Skeleton className="h-6 w-40 rounded-lg" />
        ) : (
          <Card.Title className="flex items-center gap-4 text-sm md:text-base lg:text-lg">
            {song ? "Currently playing" : "Currently offline"}
            {song && <PlayingIndicator />}
          </Card.Title>
        )}
      </Card.Header>
      {song && (
        <>
          <Separator />
          <Card.Content className="flex flex-row gap-8">
            <Image
              src={song.imageUrl}
              alt={`${song.album} album cover`}
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div className="flex min-w-0 flex-col justify-center text-xs md:text-sm lg:text-base">
              <ExternalLink href={song.songUrl} className="truncate font-semibold hover:underline">
                {song.title}
              </ExternalLink>
              <p className="truncate font-light opacity-80">{song.artist}</p>
            </div>
          </Card.Content>
        </>
      )}
    </Card>
  );
}
