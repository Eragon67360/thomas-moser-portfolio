import "server-only";
import { env } from "@/config/env";
import { assertOk, readJson } from "@/lib/http";
import type { Artist, PlayedTrack, Track } from "@/types/music";

const API_URL = "https://api.deezer.com";
const CACHE_TTL_MS = 30_000;
/** Deezer allows ~50 requests per 5 seconds; back off 0.5s, 1s, 2s on quota errors. */
const RETRY_DELAYS_MS = [500, 1000, 2000];
const QUOTA_EXCEEDED_CODE = 4;

type DeezerError = { error: { type: string; message: string; code: number } };
type Page<T> = { data: T[] };
type RawTrack = {
  id: number;
  title: string;
  /** Present on history items, missing on chart items. */
  link?: string;
  artist: { name: string };
  album: { cover_medium: string };
};
type RawPlayedTrack = RawTrack & { timestamp: number };
type RawArtist = { name: string; link: string; picture_big: string };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET against the Deezer API as the site owner. Deezer reports most failures as
 * HTTP 200 with an `error` object in the body, so both channels are checked.
 */
async function deezerGet<T>(path: string): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  url.searchParams.set("access_token", env.deezer().accessToken);

  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url, { cache: "no-store" });
    // Labels use `path`, never `url`, so the token stays out of logs.
    assertOk(response, `Deezer ${path}`);
    const body = await readJson<T | DeezerError>(response);
    if (typeof body !== "object" || body === null || !("error" in body)) return body;

    const { type, message, code } = body.error;
    const delay = RETRY_DELAYS_MS[attempt];
    if (code === QUOTA_EXCEEDED_CODE && delay !== undefined) {
      await sleep(delay);
      continue;
    }
    throw new Error(`Deezer ${path} failed: ${type} ${code} (${message})`);
  }
}

// Every visitor's widgets poll these routes; a short per-instance cache keeps
// upstream traffic independent of the number of visitors.
const cache = new Map<string, { value: unknown; expiresAt: number }>();

async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- entries are only written below under the same key
  if (hit && hit.expiresAt > Date.now()) return hit.value as T;
  const value = await load();
  cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
  return value;
}

function toTrack(track: RawTrack): Track {
  return {
    title: track.title,
    artist: track.artist.name,
    songUrl: track.link ?? `https://www.deezer.com/track/${track.id}`,
    imageUrl: track.album.cover_medium,
  };
}

export function getRecentlyPlayed(limit = 10): Promise<PlayedTrack[]> {
  return cached(`history:${limit}`, async () => {
    const page = await deezerGet<Page<RawPlayedTrack>>(`/user/me/history?limit=${limit}`);
    return page.data.map((track) => ({ ...toTrack(track), playedAt: track.timestamp * 1000 }));
  });
}

export function getTopTracks(limit = 6): Promise<Track[]> {
  return cached(`top-tracks:${limit}`, async () => {
    const page = await deezerGet<Page<RawTrack>>(`/user/me/charts/tracks?limit=${limit}`);
    return page.data.map(toTrack);
  });
}

export function getTopArtists(limit = 6): Promise<Artist[]> {
  return cached(`top-artists:${limit}`, async () => {
    const page = await deezerGet<Page<RawArtist>>(`/user/me/charts/artists?limit=${limit}`);
    return page.data.map((artist) => ({ name: artist.name, artistUrl: artist.link, imageUrl: artist.picture_big }));
  });
}
