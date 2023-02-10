const recentlygames_endpoint = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_TOKEN}&steamid=${process.env.STEAM_ID}&format=json`;
const playersummaries_endpoint = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_TOKEN}&steamids=${process.env.STEAM_ID}`;

export const getRecentlyGames = async () => {
  const response = await fetch(recentlygames_endpoint, {
    method: 'GET',
    credentials : "include", // to send httpOnly cockie
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  return response.json();
};

export const getPlayerSummaries = () => {
  return fetch(playersummaries_endpoint, {
    method: 'GET',
    credentials : "include", // to send httpOnly cockie
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
};