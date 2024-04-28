import { NextResponse } from "next/server";
import { getTopTracks } from '@/services/spotify.service';
import { SpotifyTopTrack, Track } from "@/lib/types";

export async function GET() {
    try {
        const response = await getTopTracks();

        const { items } = await response.json() as { items: SpotifyTopTrack[] };

        const tracks: Track[] = items?.slice(0, 6).map((track) => ({
            songUrl: track.external_urls.spotify,
            title: track.name,
            artist: track.artists.map((artist) => artist.name).join(', '),
            imageUrl: track.album.images[0].url
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
