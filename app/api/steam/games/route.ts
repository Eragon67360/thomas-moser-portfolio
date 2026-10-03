import { jsonRoute } from "@/lib/api";
import { getRecentGames } from "@/services/steam.service";
import type { SteamGamesResponse } from "@/types/steam";

// Two weeks of playtime per game, plus one store lookup per game: the most expensive route and
// the slowest-moving data, so it gets the longest TTL.
export const GET = jsonRoute(async (): Promise<SteamGamesResponse> => ({ games: await getRecentGames() }), {
  ttl: 600,
});
