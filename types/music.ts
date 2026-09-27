export type Track = {
  title: string;
  artist: string;
  songUrl: string;
  imageUrl: string;
};

export type PlayedTrack = Track & {
  /** When the track was played, in milliseconds since the epoch. */
  playedAt: number;
};

export type Artist = {
  name: string;
  artistUrl: string;
  imageUrl: string;
};

export type TracksResponse = { tracks: Track[] };
export type PlayedTracksResponse = { tracks: PlayedTrack[] };
export type ArtistsResponse = { artists: Artist[] };
