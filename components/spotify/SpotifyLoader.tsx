'use client'
import { TopTracks } from '@/lib/types';
import useSWR from 'swr';
import Loader from '../Loader';
import Track from './SpotifyTrack';

const SpotifyLoader = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataTracks } = useSWR<TopTracks>('/api/spotifytracks', fetcher, {
        refreshInterval: 20000,
    });

    if (!dataTracks) return <Loader />;

    return (
        <div className='flex flex-col min-h-[70px] max-w-md items-center justify-center'>
            {dataTracks?.tracks.map((track, index) => (
                <Track ranking={index + 1} key={track.songUrl} {...track} />
            ))}
        </div >
    );
};
export default SpotifyLoader