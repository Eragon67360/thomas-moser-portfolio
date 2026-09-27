"use client";
import { useApi } from "@/hooks/useApi";
import type { TracksResponse } from "@/types/spotify";
import { TrackRowsSkeleton } from "./skeletons";
import { SpotifyPanel } from "./SpotifyPanel";
import { TrackRow } from "./TrackRow";

export function TopTracks() {
  const { data, error } = useApi<TracksResponse>("/api/spotify/top-tracks");

  return (
    <SpotifyPanel title="Top musics">
      {error ? (
        <p className="text-muted">Could not load top tracks.</p>
      ) : data ? (
        data.tracks.map((track) => <TrackRow key={track.songUrl} track={track} />)
      ) : (
        <TrackRowsSkeleton rows={6} />
      )}
    </SpotifyPanel>
  );
}
