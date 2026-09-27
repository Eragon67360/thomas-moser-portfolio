export type Track = {
  title: string;
  artist: string;
  songUrl: string;
  imageUrl: string;
};

export type Artist = {
  name: string;
  artistUrl: string;
  imageUrl: string;
  genres: string[];
};

export type NowPlaying = { isPlaying: false } | ({ isPlaying: true; album: string } & Track);

export type TracksResponse = { tracks: Track[] };
export type ArtistsResponse = { artists: Artist[] };
export type NowPlayingResponse = NowPlaying;
