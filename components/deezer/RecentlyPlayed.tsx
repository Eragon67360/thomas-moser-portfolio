"use client";
import { SkeletonMessage } from "@/components/ui/SkeletonMessage";
import { useApi } from "@/hooks/useApi";
import type { PlayedTracksResponse } from "@/types/music";
import { TrackRowsSkeleton } from "./skeletons";
import { DeezerPanel } from "./DeezerPanel";
import { TrackRow } from "./TrackRow";

/** Same key and interval as the footer's `LastPlayed`, so SWR shares one request between them. */
const HISTORY_POLL_MS = 60_000;

export function RecentlyPlayed() {
  const { data, error } = useApi<PlayedTracksResponse>("/api/deezer/recently-played", HISTORY_POLL_MS);

  return (
    <DeezerPanel title="Last played">
      {error ? (
        <SkeletonMessage skeleton={<TrackRowsSkeleton rows={10} />}>
          Could not load recently played tracks.
        </SkeletonMessage>
      ) : data ? (
        data.tracks.map((track, i) => <TrackRow key={`${track.songUrl}-${i}`} track={track} />)
      ) : (
        <TrackRowsSkeleton rows={10} />
      )}
    </DeezerPanel>
  );
}
