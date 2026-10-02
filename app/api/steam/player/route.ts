import { jsonRoute } from "@/lib/api";
import { getPlayer } from "@/services/steam.service";
import type { SteamPlayerResponse } from "@/types/steam";

// Online status and the game being played change within minutes; a minute matches the service's
// own data cache.
export const GET = jsonRoute(async (): Promise<SteamPlayerResponse> => ({ player: await getPlayer() }), { ttl: 60 });
