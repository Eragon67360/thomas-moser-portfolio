'use client'
import React from 'react'
import { TopArtists } from '@/lib/types';
import useSWR from 'swr';
import Loader from '../Loader';
import Artist from './SpotifyArtist';
import { Card, CardHeader, CardBody, CardFooter, Link, Divider } from '@nextui-org/react';
import { Title, FooterText } from '../ui/Typography';

const SpotifyTopArtists = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataArtists } = useSWR<TopArtists>('/api/spotifytopartists', fetcher, {
        refreshInterval: 20000,
    });

    if (!dataArtists) return <Loader />;

    return (
        <>
            <Card className='w-full h-full '>
                <CardHeader>
                    <Title>Top artists</Title>
                    
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className='flex flex-wrap gap-4 justify-center'>
                        {dataArtists?.artists.map((artist, index) => (
                            <Artist ranking={index + 1} key={artist.name} {...artist} />
                        ))}
                    </div>

                </CardBody>
                <Divider />
                <CardFooter>
                    <FooterText>Data fetched with&nbsp;<Link href='https://developer.spotify.com/documentation/web-api' target='_blank' className='text-xs lg:text-base'>Spotify API</Link></FooterText>
                </CardFooter>

            </Card>
        </>

    );
};
export default SpotifyTopArtists