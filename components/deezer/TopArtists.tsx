"use client";
import { SkeletonMessage } from "@/components/ui/SkeletonMessage";
import { useApi } from "@/hooks/useApi";
import type { ArtistsResponse } from "@/types/music";
import { ArtistTile } from "./ArtistTile";
import { ArtistTilesSkeleton } from "./skeletons";
import { DeezerPanel } from "./DeezerPanel";

/** Charts aggregate weeks of listening and the route is edge-cached for 10 min. */
const CHART_POLL_MS = 600_000;

export function TopArtists() {
  const { data, error } = useApi<ArtistsResponse>("/api/deezer/top-artists", CHART_POLL_MS);

  return (
    <DeezerPanel title="Top artists">
      {error ? (
        <SkeletonMessage skeleton={<ArtistTilesSkeleton count={6} />}>Could not load top artists.</SkeletonMessage>
      ) : data ? (
        data.artists.map((artist) => <ArtistTile key={artist.artistUrl} artist={artist} />)
      ) : (
        <ArtistTilesSkeleton count={6} />
      )}
    </DeezerPanel>
  );
}
