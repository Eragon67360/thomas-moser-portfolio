'use client'
import React from 'react'
import { TopTracks } from '@/lib/types';
import useSWR from 'swr';
import Loader from '../Loader';
import { Card, CardHeader, CardBody, CardFooter, Link, Divider, ScrollShadow } from '@nextui-org/react';
import TopTrack from './TopTrack';
import { Title, FooterText } from '../ui/Typography';

const SpotifyTopTracks = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataTracks } = useSWR<TopTracks>('/api/spotifytoptracks', fetcher, {
        refreshInterval: 20000,
    });

    if (!dataTracks) return <Loader />;

    return (
        <>
            <Card className='w-full h-full '>
                <CardHeader>
                    <Title>Top musics</Title>
                </CardHeader>
                <Divider />
                <CardBody>
                    <ScrollShadow className='flex flex-wrap justify-center'>
                        {dataTracks?.tracks.map((track) => (
                            <TopTrack key={track.title} {...track} />
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
export default SpotifyTopTracks