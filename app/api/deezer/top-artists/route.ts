import { jsonRoute } from "@/lib/api";
import { getTopArtists } from "@/services/deezer.service";
import type { ArtistsResponse } from "@/types/music";

// Charts aggregate weeks of listening: ten minutes of staleness is invisible.
export const GET = jsonRoute(async (): Promise<ArtistsResponse> => ({ artists: await getTopArtists() }), { ttl: 600 });
