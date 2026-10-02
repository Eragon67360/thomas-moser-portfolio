import "server-only";
import { env } from "@/config/env";
import { fetchJson } from "@/lib/http";
import type { SteamGame, SteamPlayer } from "@/types/steam";

const API_URL = "https://api.steampowered.com";
const STORE_URL = "https://store.steampowered.com/api";

type RawPlayer = {
  personaname: string;
  realname?: string;
  avatarfull: string;
  profileurl: string;
  loccountrycode?: string;
  personastate: number;
  gameextrainfo?: string;
  lastlogoff?: number;
};
type RawGame = { appid: number; name: string; playtime_forever: number };

const PERSONA_STATES: Record<number, string> = {
  1: "Online 😆",
  2: "Busy 😐",
  3: "Away 🥱",
};

/**
 * Seconds a Steam response is shared across function instances in Next's data
 * cache. Steam signals failures with HTTP status codes, which the fetch cache
 * never stores, so caching at the fetch level is safe here (unlike Deezer).
 */
const REVALIDATE_SECONDS = {
  /** Online status and the current game change within minutes. */
  player: 60,
  /** Two weeks of playtime moves slowly. */
  games: 600,
  /** A store header image is effectively a static asset. */
  appDetails: 3600,
} as const;

function steamGet<T>(url: string, revalidate: number): Promise<T> {
  return fetchJson<T>(url, { next: { revalidate } });
}

export async function getPlayer(): Promise<SteamPlayer | null> {
  const { apiKey, steamId } = env.steam();
  const data = await steamGet<{ response: { players: RawPlayer[] } }>(
    `${API_URL}/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`,
    REVALIDATE_SECONDS.player,
  );
  const player = data.response.players[0];
  if (!player) return null;

  return {
    personaName: player.personaname,
    realName: player.realname ?? null,
    avatarUrl: player.avatarfull,
    profileUrl: player.profileurl,
    countryCode: player.loccountrycode ?? null,
    status: PERSONA_STATES[player.personastate] ?? "Offline 😴",
    currentGame: player.gameextrainfo ?? null,
    lastLogoff: player.lastlogoff ?? null,
  };
}

async function getHeaderImage(appId: number): Promise<string | null> {
  try {
    const data = await steamGet<Record<string, { data?: { steam_appid?: number; header_image?: string } }>>(
      `${STORE_URL}/appdetails?appids=${appId}`,
      REVALIDATE_SECONDS.appDetails,
    );
    // The store may key the response by a different id than requested (e.g. a
    // bundle id), so match on the app id inside the payload.
    const details = Object.values(data).find((entry) => entry.data?.steam_appid === appId);
    return details?.data?.header_image ?? null;
  } catch {
    return null;
  }
}

export async function getRecentGames(): Promise<SteamGame[]> {
  const { apiKey, steamId } = env.steam();
  const data = await steamGet<{ response: { games?: RawGame[] } }>(
    `${API_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`,
    REVALIDATE_SECONDS.games,
  );
  return Promise.all(
    (data.response.games ?? []).map(async (game) => ({
      appId: game.appid,
      name: game.name,
      playtimeMinutes: game.playtime_forever,
      headerImageUrl: await getHeaderImage(game.appid),
    })),
  );
}
