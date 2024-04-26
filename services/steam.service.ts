
if (!process.env.NEXT_STEAM_API_KEY) {
    throw new Error("Missing NEXT_STEAM_API_KEY");
}

if (!process.env.NEXT_STEAM_ID) {
    throw new Error("Missing NEXT_STEAM_ID");
}

export const getPlayerSummaries = () => {
    const playersummaries_endpoint = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_STEAM_API_KEY}&steamids=${process.env.NEXT_STEAM_ID}`;
    return fetch(playersummaries_endpoint, {
        method: "GET",
    });
};

export const getGamesSummaries = () => {
    const gamesummaries_endpoint = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.NEXT_STEAM_API_KEY}&steamid=${process.env.NEXT_STEAM_ID}&format=json`;
    return fetch(gamesummaries_endpoint, {
        method: "GET",
    });
}

export const getGameHero = (appId: any) => {
    const gamehero_endpoint = `http://store.steampowered.com/api/appdetails?appids=${appId}`;
    return fetch(gamehero_endpoint, {
        method: "GET",
    });
}