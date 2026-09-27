"use client";
import { useApi } from "@/hooks/useApi";
import type { PlayedTracksResponse } from "@/types/music";
import { TrackRowsSkeleton } from "./skeletons";
import { DeezerPanel } from "./DeezerPanel";
import { TrackRow } from "./TrackRow";

export function RecentlyPlayed() {
  const { data, error } = useApi<PlayedTracksResponse>("/api/deezer/recently-played");

  return (
    <DeezerPanel title="Last played">
      {error ? (
        <p className="text-muted">Could not load recently played tracks.</p>
      ) : data ? (
        data.tracks.map((track, i) => <TrackRow key={`${track.songUrl}-${i}`} track={track} />)
      ) : (
        <TrackRowsSkeleton rows={10} />
      )}
    </DeezerPanel>
  );
}
