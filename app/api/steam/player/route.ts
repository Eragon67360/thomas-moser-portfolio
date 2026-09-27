import { jsonRoute } from "@/lib/api";
import { getPlayer } from "@/services/steam.service";
import type { SteamPlayerResponse } from "@/types/steam";

export const GET = jsonRoute(async (): Promise<SteamPlayerResponse> => ({ player: await getPlayer() }));
