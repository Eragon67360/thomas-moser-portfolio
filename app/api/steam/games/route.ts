import { jsonRoute } from "@/lib/api";
import { getRecentGames } from "@/services/steam.service";
import type { SteamGamesResponse } from "@/types/steam";

export const GET = jsonRoute(async (): Promise<SteamGamesResponse> => ({ games: await getRecentGames() }));
