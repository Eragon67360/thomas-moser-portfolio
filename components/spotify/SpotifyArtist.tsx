import React from 'react';
import { Button, Card, CardFooter, Image, Link } from '@nextui-org/react';

export default function Artist(artist: any) {

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-[14.44dvw] max-w-52 transition-all duration-200"
        >
            <Link href={artist.artistUrl}>
                <div className='w-[14.44dvw] h-[14.44dvw] max-w-52 max-h-52 relative overflow-hidden'>
                    <Image
                        alt={`Artist picture: ${artist.name}`}
                        className="object-fill"
                        height={208}
                        src={artist.imageUrl}
                        width={208}
                    />
                </div>
                <CardFooter className="hidden sm:block justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-[8px] text-center sm:text-xs md:text-sm lg:text-base text-white/80 mr-1">{artist.name}</p>
                </CardFooter>
            </Link>
        </Card>

    );
}