import React from 'react';
import { Button, Card, CardFooter, Image, Link } from '@nextui-org/react';

export default function Artist(artist: any) {
    
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-[200px]"
        >
            <div className='w-[200px] relative overflow-hidden h-[200px]'>
                <Image
                    alt={`Artist picture: ${artist.name}`}
                    className="object-fill"
                    height={200}
                    src={artist.imageUrl}
                    width={200}
                />
            </div>
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80 mr-1">{artist.name}</p>
                <Link href={artist.artistUrl} target='_blank'>
                    <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                        Profile
                    </Button>
                </Link>

            </CardFooter>
        </Card>

    );
}