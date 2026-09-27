export type SteamPlayer = {
  personaName: string;
  realName: string | null;
  avatarUrl: string;
  profileUrl: string;
  countryCode: string | null;
  status: string;
  currentGame: string | null;
  /** Unix timestamp (seconds) of the last logoff, when the profile exposes it. */
  lastLogoff: number | null;
};

export type SteamGame = {
  appId: number;
  name: string;
  playtimeMinutes: number;
  headerImageUrl: string | null;
};

export type SteamPlayerResponse = { player: SteamPlayer | null };
export type SteamGamesResponse = { games: SteamGame[] };
