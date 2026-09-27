"use client";
import { useApi } from "@/hooks/useApi";
import type { TracksResponse } from "@/types/spotify";
import { TrackRowsSkeleton } from "./skeletons";
import { SpotifyPanel } from "./SpotifyPanel";
import { TrackRow } from "./TrackRow";

export function RecentlyPlayed() {
  const { data, error } = useApi<TracksResponse>("/api/spotify/recently-played");

  return (
    <SpotifyPanel title="Last played">
      {error ? (
        <p className="text-muted">Could not load recently played tracks.</p>
      ) : data ? (
        data.tracks.map((track, i) => <TrackRow key={`${track.songUrl}-${i}`} track={track} />)
      ) : (
        <TrackRowsSkeleton rows={10} />
      )}
    </SpotifyPanel>
  );
}
