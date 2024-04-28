import React from 'react'
import { Card, CardBody, CardHeader, Divider, Skeleton } from '@nextui-org/react'
import SpotifyLogo from '@/components/spotify/SpotifyLogo'

const SpotifyPlayerLoader = () => {
    return (
        <Card>
            <CardHeader className='gap-4 flex items-center'>
                <SpotifyLogo />
                <Skeleton className="rounded-lg">
                    <div className="h-12 rounded-lg bg-default-300"></div>
                </Skeleton>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className='flex gap-4 w-full' >
                    <Skeleton className="w-16 h-16 rounded-lg">
                        <div className="h-16 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <div className='flex flex-col gap-2 w-full'>
                        <Skeleton className="w-3/5 h-6 rounded-lg">
                            <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-6 w-2/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>

                </div>

            </CardBody>


        </Card>
    )
}

export default SpotifyPlayerLoader