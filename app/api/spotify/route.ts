import { NextResponse } from "next/server";
import { SpotifyApi } from '@spotify/web-api-ts-sdk';


if (!process.env.NEXT_SPOTIFY_CLIENT_ID) {
    throw new Error("Missing NEXT_SPOTIFY_CLIENT_ID");
}

if (!process.env.NEXT_SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing NEXT_SPOTIFY_CLIENT_SECRET");
}

export async function GET() {

    const scopes = [
        "user-read-email",
        "user-read-private",
        "user-read-playback-state",
        "user-library-read",
        "user-modify-playback-state",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-read-currently-playing",
        "user-top-read"
    ];

    const sdk = SpotifyApi.withClientCredentials(process.env.NEXT_SPOTIFY_CLIENT_ID!, process.env.NEXT_SPOTIFY_CLIENT_SECRET!, scopes);
    const items = await sdk.users.profile('3172n5pvrazayylbzlh2bf44rvu4');

    console.table(items.display_name);

    return NextResponse.json({
        items
    });
}