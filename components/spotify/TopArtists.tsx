"use client";
import { useApi } from "@/hooks/useApi";
import type { ArtistsResponse } from "@/types/spotify";
import { ArtistTile } from "./ArtistTile";
import { ArtistTilesSkeleton } from "./skeletons";
import { SpotifyPanel } from "./SpotifyPanel";

export function TopArtists() {
  const { data, error } = useApi<ArtistsResponse>("/api/spotify/top-artists");

  return (
    <SpotifyPanel title="Top artists">
      {error ? (
        <p className="text-muted">Could not load top artists.</p>
      ) : data ? (
        data.artists.map((artist) => <ArtistTile key={artist.artistUrl} artist={artist} />)
      ) : (
        <ArtistTilesSkeleton count={6} />
      )}
    </SpotifyPanel>
  );
}
