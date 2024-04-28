import { NextResponse } from "next/server";
import { getRecentlyPlayedTracks } from '@/services/spotify.service';
import { SpotifyTrack, Track } from "@/lib/types";

export async function GET() {
    try {
        const response = await getRecentlyPlayedTracks();

        const { items } = await response.json() as { items: SpotifyTrack[] };

        const tracks: Track[] = items?.slice(0, 10).map((track) => ({
            songUrl: track.track.external_urls.spotify,
            title: track.track.name,
            artist: track.track.artists.map((artist) => artist.name).join(', '),
            imageUrl: track.track.album.images[2].url
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
