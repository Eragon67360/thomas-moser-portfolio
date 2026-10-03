import { jsonRoute } from "@/lib/api";
import { getTopTracks } from "@/services/deezer.service";
import type { TracksResponse } from "@/types/music";

// Charts aggregate weeks of listening: ten minutes of staleness is invisible.
export const GET = jsonRoute(async (): Promise<TracksResponse> => ({ tracks: await getTopTracks() }), { ttl: 600 });
