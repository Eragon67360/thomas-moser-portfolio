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

function steamGet<T>(url: string): Promise<T> {
  return fetchJson<T>(url, { next: { revalidate: 60 } });
}

export async function getPlayer(): Promise<SteamPlayer | null> {
  const { apiKey, steamId } = env.steam();
  const data = await steamGet<{ response: { players: RawPlayer[] } }>(
    `${API_URL}/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`,
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
    const data = await steamGet<Record<string, { data?: { header_image?: string } }>>(
      `${STORE_URL}/appdetails?appids=${appId}`,
    );
    return data[appId]?.data?.header_image ?? null;
  } catch {
    return null;
  }
}

export async function getRecentGames(): Promise<SteamGame[]> {
  const { apiKey, steamId } = env.steam();
  const data = await steamGet<{ response: { games?: RawGame[] } }>(
    `${API_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`,
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
