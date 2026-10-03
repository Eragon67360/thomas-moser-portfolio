"use client";
import { SkeletonMessage } from "@/components/ui/SkeletonMessage";
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
        <SkeletonMessage skeleton={<TrackRowsSkeleton rows={6} />}>Could not load top tracks.</SkeletonMessage>
      ) : data ? (
        data.tracks.map((track) => <TrackRow key={track.songUrl} track={track} />)
      ) : (
        <TrackRowsSkeleton rows={6} />
      )}
    </DeezerPanel>
  );
}
