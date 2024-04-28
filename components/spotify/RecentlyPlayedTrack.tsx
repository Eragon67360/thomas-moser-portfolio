import React from 'react'
import { Card, CardBody, Image,Link } from "@nextui-org/react";
import { TrackText, ArtistText } from "../ui/Typography";


export default function RecentlyPlayedTrack(track: any) {
    return (
        <Card
            radius="none"
            shadow='none'
            className="border-none w-full"
        >
            <Link className='text-foreground' href={track.songUrl} target="_blank">
                <CardBody>
                    <div className='flex gap-4'>
                        <div className='w-10 sm:w-12 md:w-14 lg:w-20 h-8 sm:h-12 md:h-14 lg:h-20 transition-all duration-200'>
                            <Image
                                radius='sm'
                                alt={`Album picture: ${track.title}`}
                                className="object-cover"
                                height={100}
                                src={track.imageUrl}
                                width='100%'
                            />
                        </div>
                        <div className='flex flex-col justify-center truncate w-full'>
                            <TrackText>{track.title}</TrackText>
                            <ArtistText>{track.artist}</ArtistText>
                        </div>
                    </div>
                </CardBody></Link>

        </Card>
    );
}