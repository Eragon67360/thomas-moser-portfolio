import { Card, CardFooter, Image, Button, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect } from "react";


function GameDetail({ game }: { game: any }) {

    function hoursSince(timestamp: number) {
        return Math.floor(timestamp / 60);
    }

    return (

        <>
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{game.name}</p>
                    <small className="text-default-500">Played {hoursSince(game.playtime_forever)} hours</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"                        
                        src={game.headerImage}
                        width={300}
                    />
                </CardBody>
            </Card>
        </>

    );
}

export default GameDetail
