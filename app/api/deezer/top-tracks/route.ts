import { jsonRoute } from "@/lib/api";
import { getTopTracks } from "@/services/deezer.service";
import type { TracksResponse } from "@/types/music";

export const GET = jsonRoute(async (): Promise<TracksResponse> => ({ tracks: await getTopTracks() }));
