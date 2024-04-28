import React from 'react'
import { Button, Card, CardBody, CardFooter, Image, Link, Divider } from '@nextui-org/react';
import { Title, FooterText, TrackText, ArtistText } from '../ui/Typography';

export default function TopTrack(track: any) {
    return (
        <Card
            radius="none"
            shadow='none'
            className="border-none w-full"
        >
            <CardBody>
                <div className='flex gap-2 text-xs'>
                    <Image
                        alt={`Album picture: ${track.title}`}
                        className="object-fill"
                        height={64}
                        src={track.imageUrl}
                        width={64}
                    />
                    <div className='flex flex-col justify-center'>
                        <TrackText>{track.title}</TrackText>
                        <ArtistText>{track.artist}</ArtistText>
                    </div>
                </div>
            </CardBody>
            <Divider/>
        </Card>
    )
};