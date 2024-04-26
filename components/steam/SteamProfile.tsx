import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Link } from "@nextui-org/react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

export default function SteamProfile() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR('/api/steamplayer', fetcher, {
        refreshInterval: 20000,
    });

    const timestamp = data?.steam.getLastLog;

    function calculateTimeSince(timestamp: number): string {
        const currentDate = new Date();
        const pastDate = new Date(timestamp * 1000);
        const differenceInMilliseconds = currentDate.getTime() - pastDate.getTime();
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 3600 * 24));
        const differenceInHours = Math.floor((differenceInMilliseconds % (1000 * 3600 * 24)) / (1000 * 3600));
        return `${differenceInDays}d ${differenceInHours}h`;
    }

    return (

        <>
            <Card className="max-w-[340px]">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src={data?.steam.getAvatar} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{data?.steam.getRealName}</h4>
                            <h5 className="text-small tracking-tight text-default-400">{data?.steam.getPersonName}</h5>
                        </div>
                    </div>
                    <Link
                        href={data?.steam.getprofileUrl}
                        target="_blank"
                    >
                        <Button
                            className="bg-primary-50 text-foreground border-default-200"
                            color="primary"
                            size="sm"
                            radius="full"
                        >
                            Profile
                        </Button>
                    </Link>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        Status : {data?.steam.getStatus}
                    </p>
                    {data?.steam.getGames ? data?.steam.getGames : "Not playing currently"}

                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">Country: </p>
                        <p className=" text-default-400 text-small">{data?.steam.getLoc}</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">Connected:</p>
                        <p className="text-default-400 text-small">{data?.steam.getLastLog ? calculateTimeSince(data?.steam.getLastLog) : ""} ago</p>
                    </div>
                </CardFooter>
            </Card>
        </>

    );
}
