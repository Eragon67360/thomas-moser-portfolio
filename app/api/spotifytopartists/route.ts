import { NextResponse } from "next/server";
import { getTopArtists } from '@/services/spotify.service';
import { Artist, SpotifyArtist } from "@/lib/types";

export async function GET() {
    try {
        const response = await getTopArtists();
        const { items } = await response.json() as { items: SpotifyArtist[] };

        const artists: Artist[] = items.slice(0, 6).map((artist) => ({
            name: artist.name,
            artistUrl: artist.external_urls.spotify,
            imageUrl: artist.images[0].url,
            genre: artist.genres
        }));

        return NextResponse.json({ artists });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'someting went wrong', data: null },
            { status: 500 },
        );
    }
}
