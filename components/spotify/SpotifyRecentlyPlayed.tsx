'use client'
import { RecentlyPlayed } from '@/lib/types';
import useSWR from 'swr';
import Loader from '../Loader';
import Track from './SpotifyTrack';
import { Card, CardHeader, Divider, CardBody, CardFooter, ScrollShadow,Link } from '@nextui-org/react';

const SpotifyRecentlyPlayed = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataTracks } = useSWR<RecentlyPlayed>('/api/spotifyrecentlyplayed', fetcher, {
        refreshInterval: 20000,
    });

    if (!dataTracks) return <Loader />;

    return (
        <>
        
            <Card className='w-full h-full '>
                <CardHeader>
                    Last played
                </CardHeader>
                <Divider />
                <CardBody>
                    <ScrollShadow className="flex flex-wrap ">
                        {dataTracks?.tracks.map((track, index) => (
                            <Track ranking={index + 1} key={track.songUrl} {...track} />
                        ))}
                    </ScrollShadow>

                </CardBody>
                <Divider />
                <CardFooter>
                    <p className='text-xs'>Data fetched with&nbsp;<Link href='https://developer.spotify.com/documentation/web-api' target='_blank' className='text-xs'>Spotify API</Link></p>
                </CardFooter>

            </Card>
        </>

    );
};
export default SpotifyRecentlyPlayed