import { NextResponse } from "next/server";
import { getCurrentlyPlaying, getTopTracks } from '@/services/spotify.service';


if (!process.env.NEXT_SPOTIFY_CLIENT_ID) {
  throw new Error("Missing NEXT_SPOTIFY_CLIENT_ID");
}

if (!process.env.NEXT_SPOTIFY_CLIENT_SECRET) {
  throw new Error("Missing NEXT_SPOTIFY_CLIENT_SECRET");
}

export const runtime = "edge"

export async function GET() {
  const response = await getCurrentlyPlaying();

  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  const song = await response.json();

  if (song.item === null) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }


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

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: { name: any; }) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    // const albumImageUrl = music.item.album.images[0].url;
    // const artist = music.item.artists.map((_artist: { name: any; }) => _artist.name).join(", ");
    // const isPlaying = music.is_playing;
    // const songUrl = music.item.external_urls.spotify;
    // const title = music.item.name;

    const data = {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title
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
