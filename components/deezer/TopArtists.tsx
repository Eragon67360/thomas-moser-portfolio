"use client";
import { useApi } from "@/hooks/useApi";
import type { ArtistsResponse } from "@/types/music";
import { ArtistTile } from "./ArtistTile";
import { ArtistTilesSkeleton } from "./skeletons";
import { DeezerPanel } from "./DeezerPanel";

export function TopArtists() {
  const { data, error } = useApi<ArtistsResponse>("/api/deezer/top-artists");

  return (
    <DeezerPanel title="Top artists">
      {error ? (
        <p className="text-muted">Could not load top artists.</p>
      ) : data ? (
        data.artists.map((artist) => <ArtistTile key={artist.artistUrl} artist={artist} />)
      ) : (
        <ArtistTilesSkeleton count={6} />
      )}
    </DeezerPanel>
  );
}
