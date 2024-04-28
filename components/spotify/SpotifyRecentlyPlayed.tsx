'use client'
import React from 'react'
import { RecentlyPlayed } from '@/lib/types';
import useSWR from 'swr';
import LastPlayedLoader from '../loaders/spotify/LastPlayedLoader';
import RecentlyPlayedTrack from './RecentlyPlayedTrack';
import { Card, CardHeader, Divider, CardBody, CardFooter, ScrollShadow, Link } from '@nextui-org/react';
import { FooterText, Title } from '../ui/Typography';

const SpotifyRecentlyPlayed = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataTracks } = useSWR<RecentlyPlayed>('/api/spotifyrecentlyplayed', fetcher, {
        refreshInterval: 20000,
    });

    if (!dataTracks) return <LastPlayedLoader />;

    return (
        <>
            <Card className='w-full h-full'>
                <CardHeader>
                    <Title>Last played</Title>
                </CardHeader>
                <Divider />
                <CardBody>
                    <ScrollShadow hideScrollBar className="flex flex-wrap justify-center">
                        {dataTracks?.tracks.map((track) => (
                            <RecentlyPlayedTrack key={track.songUrl} {...track} />
                        ))}
                    </ScrollShadow>
                </CardBody>
                <Divider />
                <CardFooter>
                    <FooterText >Data fetched with&nbsp;<Link href='https://developer.spotify.com/documentation/web-api' target='_blank' className='text-xs lg:text-base'>Spotify API</Link></FooterText>
                </CardFooter>

            </Card>
        </>

    );
};
export default SpotifyRecentlyPlayed