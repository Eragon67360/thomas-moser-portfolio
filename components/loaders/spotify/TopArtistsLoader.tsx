import React from 'react'
import { Card, CardHeader, Divider, CardBody, CardFooter, Skeleton } from '@nextui-org/react'

const TopArtistsLoader = () => {
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
                    <div className='grid grid-cols-3 gap-4 '>
                        {[...Array(6)].map((index) =>
                            <Skeleton key={index} className="w-32 h-32 rounded-lg">
                                <div className="h-32 w-32 rounded-lg bg-default-200"></div>
                            </Skeleton>
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

export default TopArtistsLoader