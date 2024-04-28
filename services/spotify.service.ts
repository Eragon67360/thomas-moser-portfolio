import querystring from 'querystring';

if (!process.env.NEXT_SPOTIFY_CLIENT_ID) {
  throw new Error("Missing NEXT_SPOTIFY_CLIENT_ID");
}

if (!process.env.NEXT_SPOTIFY_CLIENT_SECRET) {
  throw new Error("Missing NEXT_SPOTIFY_CLIENT_SECRET");
}


const client_id = process.env.NEXT_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const RECENTLY_PLAYED_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const CURRENTLY_PLAYING_URL = `https://api.spotify.com/v1/me/player/currently-playing`;


const getAccessToken = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Spotify token error: ${data.error} - ${data.error_description}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching access token', error);
    throw error;
  }
};

export const getRecentlyPlayedTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

};

export const getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(CURRENTLY_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};