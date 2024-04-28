import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { TrackText, ArtistText } from "../ui/Typography";
import Link from "next/link";

export default function Track(track: any) {
    return (
        <Card
            radius="none"
            shadow='none'
            className="border-none w-full"
        ><Link href={track.songUrl} target="_blank">
                <CardBody>
                    <div className='flex gap-8'>
                        <Image
                            alt={`Album picture: ${track.title}`}
                            className="object-cover w-[64px]"
                            height={64}
                            src={track.imageUrl}
                            width='100%'
                        />
                        <div className='flex flex-col justify-center truncate'>
                            <TrackText>{track.title}</TrackText>
                            <ArtistText>{track.artist}</ArtistText>
                        </div>
                    </div>

                    {/* <div className='flex gap-2 text-xs'>
                    <div className="w-16 h-16 flex items-center justify-center border-2 border-red-500">
                        <Image
                            alt={`Album picture: ${track.title}`}
                            className="object-cover w-[64px]"
                            height={64}
                            src={track.imageUrl}
                            width='100%'
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <TrackText>{track.title}</TrackText>
                        <ArtistText>{track.artist}</ArtistText>
                    </div>
                </div> */}
                </CardBody></Link>

        </Card>
    );
}