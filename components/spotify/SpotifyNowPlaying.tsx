'use client'

import React from 'react'
import useSWR from 'swr';
import Loader from '../Loader';
import SpotifyLogo from './SpotifyLogo';
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import PlayingAnimation from './PlayingAnimation';

const SpotifyNowPlaying = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataPlaying, error: errorPlaying } = useSWR('/api/spotifyplaying', fetcher, {
        refreshInterval: 2000,
    });

    if (errorPlaying) return <div>Failed to load Spotify API.</div>;
    if (!dataPlaying) return <Loader />;

    return (
        <>
            <Card>
                <CardHeader className='gap-4 flex items-center'>
                    <SpotifyLogo />
                    {dataPlaying?.data.isPlaying ? (
                        <div className='flex gap-4 items-center'>
                            <span>Currently playing</span>
                            <PlayingAnimation />
                        </div>
                    ) : (
                        <span>Currently offline</span>
                    )}

                </CardHeader>
                <CardBody>
                    {dataPlaying?.data.isPlaying ? (
                        <div className='flex gap-8'>
                            <Image
                                alt={`${dataPlaying?.data.title} Album cover`}
                                className="object-cover w-[64px]"
                                height={200}
                                shadow="md"
                                src={dataPlaying?.data.albumImageUrl}
                                width="100%"
                            />
                            <div className='text-xs h-full flex flex-col justify-center'>

                                <a href={dataPlaying?.data.songUrl} target="_blank">{dataPlaying?.data.title}</a>
                                <p>{dataPlaying?.data.artist}</p>
                            </div>
                        </div>

                    ) : (
                        <div></div>
                    )}
                </CardBody>
            </Card>
        </>
    )
}

export default SpotifyNowPlaying