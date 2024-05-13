
export type Track = {
    songUrl: string;
    artist: string;
    title: string;
    imageUrl: string;
};

export type SpotifyTrack = {
    track: {
        name: string,
        artists: Array<SpotifyArtist>,
        album: { images: Array<{ url: string }> },
        external_urls: { spotify: string }
    };
}

export type SpotifyTopTrack = {
    name: string,
    album: { images: Array<{ url: string }> },
    artists: Array<SpotifyArtist>,
    external_urls: { spotify: string }
}

export type TopTracks = {
    tracks: Track[];
}

export type RecentlyPlayed = {
    tracks: Track[];
};

export type NowPlayingSong = {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
};

export type SpotifyArtist = {
    name: string;
    external_urls: { spotify: string };
    images: Array<{ url: string }>;
    genres: Array<string>;
}

export type Artist = {
    name: string;
    artistUrl: string;
    imageUrl: string;
    genre: Array<string>;
};

export type TopArtists = {
    artists: Artist[];
}

export type Base = {
    title: string
    description: string
    duration: number
    href?: string
}

export type Post = Base & {
    // Not defined for third party posts
    slug: string | undefined
    date: string
    tags: string[]
    body: string
    lastModified?: number
    views?: number
    // Third party only
    isThirdParty?: boolean
    type: 'post'
    code?: string;
    frontmatter: {
        slug: string;
        title: string;
        header: string;
        description: string;
        date: Date;
        tags: Array<string>;
    };
}

export type PostProps = {
    content: string;
    slug: string;
    frontmatter: {
        slug: string;
        title: string;
        header: string;
        description: string;
        date: Date;
        tags: Array<string>;
    };
    code?: string;
};

export type TocProps = {
    id: string;
    name: string | null;
    level: number;
};
