import "server-only";
import { unstable_cache } from "next/cache";
import { env } from "@/config/env";
import { assertOk, readJson } from "@/lib/http";
import type { Artist, PlayedTrack, Track } from "@/types/music";

const API_URL = "https://api.deezer.com";
/** Seconds a successful read is shared across function instances in Next's data cache. */
const REVALIDATE_SECONDS = { history: 30, charts: 600 } as const;
/** Deezer allows ~50 requests per 5 seconds; back off 0.5s, 1s, 2s on quota errors. */
const RETRY_DELAYS_MS = [500, 1000, 2000];
const QUOTA_EXCEEDED_CODE = 4;
const HISTORY_LIMIT = 10;
const CHART_LIMIT = 6;

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
 *
 * The fetch itself is deliberately not cached: Next's fetch cache stores any
 * HTTP 200, which would pin a Deezer error body for a whole TTL. Caching happens
 * one level up, in `shared()`, which only ever stores a parsed success.
 */
async function deezerGet<T>(path: string): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  url.searchParams.set("access_token", env.deezer().accessToken);

  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url, { cache: "no-store" });
    // Labels use `path`, never `url`, so the token stays out of logs.
    await assertOk(response, `Deezer ${path}`);
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

// Every visitor's widgets poll these routes. Two layers keep upstream traffic
// independent of the number of visitors and of function instances:
// - `inflight` coalesces concurrent loads of the same key within one instance;
// - `unstable_cache` shares the parsed result across instances through Next's
//   data cache and serves a stale entry while it refreshes in the background.
//   A thrown error is never stored, so an outage or quota error is retried on
//   the next request instead of being served for the whole TTL.
const inflight = new Map<string, Promise<unknown>>();

function shared<T>(key: string, revalidate: number, load: () => Promise<T>): () => Promise<T> {
  const read = unstable_cache(load, ["deezer", key], { revalidate });
  return () => {
    const pending = inflight.get(key);
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- entries are only written below under the same key
    if (pending) return pending as Promise<T>;
    const loading = read().finally(() => inflight.delete(key));
    inflight.set(key, loading);
    return loading;
  };
}

function toTrack(track: RawTrack): Track {
  return {
    title: track.title,
    artist: track.artist.name,
    songUrl: track.link ?? `https://www.deezer.com/track/${track.id}`,
    imageUrl: track.album.cover_medium,
  };
}

const readRecentlyPlayed = shared(`history:${HISTORY_LIMIT}`, REVALIDATE_SECONDS.history, async () => {
  const page = await deezerGet<Page<RawPlayedTrack>>(`/user/me/history?limit=${HISTORY_LIMIT}`);
  return page.data.map((track): PlayedTrack => ({ ...toTrack(track), playedAt: track.timestamp * 1000 }));
});

const readTopTracks = shared(`top-tracks:${CHART_LIMIT}`, REVALIDATE_SECONDS.charts, async () => {
  const page = await deezerGet<Page<RawTrack>>(`/user/me/charts/tracks?limit=${CHART_LIMIT}`);
  return page.data.map(toTrack);
});

const readTopArtists = shared(`top-artists:${CHART_LIMIT}`, REVALIDATE_SECONDS.charts, async () => {
  const page = await deezerGet<Page<RawArtist>>(`/user/me/charts/artists?limit=${CHART_LIMIT}`);
  return page.data.map((artist): Artist => ({
    name: artist.name,
    artistUrl: artist.link,
    imageUrl: artist.picture_big,
  }));
});

export function getRecentlyPlayed(): Promise<PlayedTrack[]> {
  return readRecentlyPlayed();
}

export function getTopTracks(): Promise<Track[]> {
  return readTopTracks();
}

export function getTopArtists(): Promise<Artist[]> {
  return readTopArtists();
}
