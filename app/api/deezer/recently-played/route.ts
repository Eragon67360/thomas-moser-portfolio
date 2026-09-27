import { jsonRoute } from "@/lib/api";
import { getRecentlyPlayed } from "@/services/deezer.service";
import type { PlayedTracksResponse } from "@/types/music";

export const GET = jsonRoute(async (): Promise<PlayedTracksResponse> => ({ tracks: await getRecentlyPlayed() }));
