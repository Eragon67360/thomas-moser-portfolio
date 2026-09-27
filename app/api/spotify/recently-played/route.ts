import { jsonRoute } from "@/lib/api";
import { getRecentlyPlayed } from "@/services/spotify.service";
import type { TracksResponse } from "@/types/spotify";

export const GET = jsonRoute(async (): Promise<TracksResponse> => ({ tracks: await getRecentlyPlayed() }));
