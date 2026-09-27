import { jsonRoute } from "@/lib/api";
import { getTopArtists } from "@/services/deezer.service";
import type { ArtistsResponse } from "@/types/music";

export const GET = jsonRoute(async (): Promise<ArtistsResponse> => ({ artists: await getTopArtists() }));
