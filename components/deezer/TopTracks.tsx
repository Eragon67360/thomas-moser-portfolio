"use client";
import { useApi } from "@/hooks/useApi";
import type { TracksResponse } from "@/types/music";
import { TrackRowsSkeleton } from "./skeletons";
import { DeezerPanel } from "./DeezerPanel";
import { TrackRow } from "./TrackRow";

/** Charts aggregate weeks of listening and the route is edge-cached for 10 min. */
const CHART_POLL_MS = 600_000;

export function TopTracks() {
  const { data, error } = useApi<TracksResponse>("/api/deezer/top-tracks", CHART_POLL_MS);

  return (
    <DeezerPanel title="Top musics">
      {error ? (
        <p className="text-muted">Could not load top tracks.</p>
      ) : data ? (
        data.tracks.map((track) => <TrackRow key={track.songUrl} track={track} />)
      ) : (
        <TrackRowsSkeleton rows={6} />
      )}
    </DeezerPanel>
  );
}
