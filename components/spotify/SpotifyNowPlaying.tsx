'use client'

import React from 'react'
import useSWR from 'swr';
import SpotifyPlayerLoader from '../loaders/spotify/SpotifyPlayerLoader';
import SpotifyLogo from './SpotifyLogo';
import { Card, CardBody, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import PlayingAnimation from './PlayingAnimation';
import { ArtistText, TrackText, Title } from '../ui/Typography';

const SpotifyNowPlaying = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataPlaying, error: errorPlaying } = useSWR('/api/spotifyplaying', fetcher, {
        refreshInterval: 10000,
    });


    if (errorPlaying) return <div>Failed to load Spotify API.</div>;
    if (!dataPlaying) return <SpotifyPlayerLoader />;

    return (
        <>
            <Card>
                <CardHeader className='gap-4 flex items-center'>
                    <SpotifyLogo />
                    {dataPlaying?.data?.isPlaying ? (
                        <div className='flex gap-4 items-center'>
                            <Title>Currently playing</Title>
                            <PlayingAnimation />
                        </div>
                    ) : (
                        <Title>Currently offline</Title>
                    )}

                </CardHeader>
                <Divider />
                {dataPlaying?.data?.isPlaying && (
                    <CardBody>
                        <div className='flex gap-8'>
                            <Image
                                radius='sm'
                                alt={`${dataPlaying?.data.title} Album cover`}
                                className="object-cover w-[64px]"
                                height={140}
                                src={dataPlaying?.data.albumImageUrl}
                                width="100%"
                            />
                            <div className='text-xs h-full flex flex-col justify-center truncate'>
                                <TrackText><Link href={dataPlaying?.data.songUrl} target="_blank" className='text-xs md:text-sm lg:text-base font-semibold truncate' color='foreground'>{dataPlaying?.data.title}</Link></TrackText>
                                <ArtistText>{dataPlaying?.data.artist}</ArtistText>

                            </div>
                        </div>
                    </CardBody>
                )}

            </Card>
        </>
    )
}

export default SpotifyNowPlaying