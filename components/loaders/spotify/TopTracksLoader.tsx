import { Card, CardHeader, Skeleton, Divider, CardBody, CardFooter } from '@nextui-org/react'
import React from 'react'

const TopTracksLoader = () => {
    return (
        <>
            <Card className='w-full h-full'>
                <CardHeader>
                    <Skeleton className="w-2/5 h-6 rounded-lg">
                        <div className="h-6 w-2/5 rounded-lg bg-default-200"></div>
                    </Skeleton>

                </CardHeader>
                <Divider />
                <CardBody className='flex justify-center items-center w-full px-auto'>
                    <div className='flex flex-col gap-4 w-full my-8'>
                        {[...Array(6)].map(() =>
                            <div className='flex gap-4 items-center'>
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
                        )}
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Skeleton className="w-3/5 h-6 rounded-lg">
                        <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </CardFooter>

            </Card>
        </>
    )
}

export default TopTracksLoader