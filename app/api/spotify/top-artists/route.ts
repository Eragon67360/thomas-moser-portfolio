import { jsonRoute } from "@/lib/api";
import { getTopArtists } from "@/services/spotify.service";
import type { ArtistsResponse } from "@/types/spotify";

export const GET = jsonRoute(async (): Promise<ArtistsResponse> => ({ artists: await getTopArtists() }));
