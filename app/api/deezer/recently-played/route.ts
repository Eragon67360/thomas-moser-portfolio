import { jsonRoute } from "@/lib/api";
import { getRecentlyPlayed } from "@/services/deezer.service";
import type { PlayedTracksResponse } from "@/types/music";

// "Last played" is the one near-live widget: short enough to feel current, long enough that
// every visitor polling it shares one upstream read per edge region.
export const GET = jsonRoute(async (): Promise<PlayedTracksResponse> => ({ tracks: await getRecentlyPlayed() }), {
  ttl: 30,
});
