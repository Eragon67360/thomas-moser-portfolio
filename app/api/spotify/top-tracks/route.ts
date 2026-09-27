import { jsonRoute } from "@/lib/api";
import { getTopTracks } from "@/services/spotify.service";
import type { TracksResponse } from "@/types/spotify";

export const GET = jsonRoute(async (): Promise<TracksResponse> => ({ tracks: await getTopTracks() }));
