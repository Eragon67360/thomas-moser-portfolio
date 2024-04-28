import { NextResponse } from "next/server";
import { getCurrentlyPlaying, getTopTracks } from '@/services/spotify.service';


if (!process.env.NEXT_SPOTIFY_CLIENT_ID) {
    throw new Error("Missing NEXT_SPOTIFY_CLIENT_ID");
}

if (!process.env.NEXT_SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing NEXT_SPOTIFY_CLIENT_SECRET");
}

interface SpotifyTrack {
    name: string;
    artists: Array<{ name: string }>;
    external_urls: { spotify: string };
}

interface Track {
    artist: string;
    songUrl: string;
    title: string;
}


export async function GET() {

    try {
        const response = await getTopTracks();        
        const { items } = await response.json() as { items: SpotifyTrack[] };
        

        const tracks: Track[] = items.slice(0, 10).map((track) => ({
            artist: track.artists.map((artist) => artist.name).join(', '),
            songUrl: track.external_urls.spotify,
            title: track.name,
        }));

        return NextResponse.json({ tracks });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'someting went wrong', data: null },
            { status: 500 },
        );
    }
}
