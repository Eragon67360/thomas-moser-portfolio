import { NextResponse } from "next/server";
import { getGamesSummaries } from "@/services/steam.service";
import { getGameHero } from "@/services/steam.service";

async function getGameDetailsWithLogo(appId: number): Promise<any> {
    const response = await getGameHero(appId);
    const data = await response.json();
    const gameInfo = data[appId.toString()].data;
    const headerImage = gameInfo.header_image;
    return {
        appId: appId,
        headerImage: headerImage
    };
}

async function enrichGamesWithLogos(games: any[]): Promise<any[]> {
    const enrichedGames = await Promise.all(games.map(async (game) => {
      const logoDetails = await getGameDetailsWithLogo(game.appid);
      return {
        ...game, // Spread the existing game details
        headerImage: logoDetails.headerImage // Add new logo URL
      };
    }));
    return enrichedGames;
  }

export async function GET() {

    const response = await getGamesSummaries();

    if (response.status != 200) {
        return NextResponse.json({
            games: {
                games: "No games recently played",
            },
        });
    }

    const games = await response.json();
    if (games.response === null) {
        return NextResponse.json({
            games: {
                games: "No games recently played",
            },
        });
    }

    const enrichedGames = await enrichGamesWithLogos(games.response.games);
    
    
    return NextResponse.json({
        games: {
            enrichedGames
        },
    });
}
