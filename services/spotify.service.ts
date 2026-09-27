import "server-only";
import { env } from "@/config/env";
import { assertOk, readJson } from "@/lib/http";
import type { Artist, NowPlaying, Track } from "@/types/spotify";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

type SpotifyImage = { url: string };
type SpotifyTrackObject = {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: SpotifyImage[] };
  external_urls: { spotify: string };
};
type SpotifyArtistObject = {
  name: string;
  genres: string[];
  images: SpotifyImage[];
  external_urls: { spotify: string };
};

let cachedToken: { value: string; expiresAt: number } | undefined;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const { clientId, clientSecret, refreshToken } = env.spotify();
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });
  assertOk(response, "Spotify token request");
  const data = await readJson<{ access_token: string; expires_in: number }>(response);

  // Refresh a minute early to avoid using a token that expires mid-request.
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return cachedToken.value;
}

async function spotifyGet<T>(path: string): Promise<T | null> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
    cache: "no-store",
  });
  if (response.status === 204) return null;
  assertOk(response, `Spotify ${path}`);
  return readJson<T>(response);
}

const imageAt = (images: SpotifyImage[], index: number) => (images[index] ?? images[0])?.url ?? "";

function toTrack(track: SpotifyTrackObject, imageIndex: number): Track {
  return {
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    imageUrl: imageAt(track.album.images, imageIndex),
  };
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const data = await spotifyGet<{ is_playing: boolean; item: SpotifyTrackObject | null }>(
    "/me/player/currently-playing",
  );
  if (!data?.is_playing || !data.item) return { isPlaying: false };
  return { isPlaying: true, album: data.item.album.name, ...toTrack(data.item, 0) };
}

export async function getRecentlyPlayed(limit = 10): Promise<Track[]> {
  const data = await spotifyGet<{ items: { track: SpotifyTrackObject }[] }>(
    `/me/player/recently-played?limit=${limit}`,
  );
  // The smallest album image is plenty for the compact list rows.
  return (data?.items ?? []).map((item) => toTrack(item.track, 2));
}

export async function getTopTracks(limit = 6): Promise<Track[]> {
  const data = await spotifyGet<{ items: SpotifyTrackObject[] }>(`/me/top/tracks?limit=${limit}`);
  return (data?.items ?? []).map((track) => toTrack(track, 0));
}

export async function getTopArtists(limit = 6): Promise<Artist[]> {
  const data = await spotifyGet<{ items: SpotifyArtistObject[] }>(`/me/top/artists?limit=${limit}`);
  return (data?.items ?? []).map((artist) => ({
    name: artist.name,
    artistUrl: artist.external_urls.spotify,
    imageUrl: imageAt(artist.images, 0),
    genres: artist.genres,
  }));
}
