import { NextResponse } from "next/server";
import { SpotifyApi } from '@spotify/web-api-ts-sdk';


if (!process.env.NEXT_SPOTIFY_CLIENT_ID) {
  throw new Error("Missing NEXT_SPOTIFY_CLIENT_ID");
}

if (!process.env.NEXT_SPOTIFY_CLIENT_SECRET) {
  throw new Error("Missing NEXT_SPOTIFY_CLIENT_SECRET");
}

import { getCurrentlyPlaying } from '@/services/spotify.service';

export const revalidate = 0;

export async function GET() {
  try {
    const response = await getCurrentlyPlaying();
    if (response?.status === 204) {
      return NextResponse.json({
        data: {
          isPlaying: false,
        },
      });
    }
    const music = await response.json();
    if (music.item === null) {
      return NextResponse.json({
        data: {
          isPlaying: false,
        },
      });
    }
    const data = {
      fullTitle: `${music.item.name} - ${music.item.artists[0].name}`,
      url: music.item.external_urls.spotify,
      isPlaying: music.is_playing,
    };
    return NextResponse.json({ error: null, data: data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'someting went wrong', data: null },
      { status: 500 },
    );
  }
}