import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import Link from 'next/link';
const BlogCard = (props: { post: any; }) => {
    const { post } = props;
    return (
        <>
            <Link href={`/article/${post.slug}`} className='p-4 flex h-auto w-full hover:opacity-65 transition-all duration-200 rounded-md'>
                <div className='w-1/3 flex flex-col flex-1 justify-evenly'>
                    <div className='h-full'></div>
                    <div className='bg-secondary/65 h-[.1vw]'/>
                    <div className='h-full'></div>
                </div>
                <Card className='w-2/3 bg-transparent' radius='md' shadow='none'>
                    <CardHeader>
                        <p className='font-bold text-lg'>{post.title}</p>
                    </CardHeader>
                    <CardBody>
                        <p className='font-extralight text-secondary text-base'>{post.description}</p>
                    </CardBody>
                    <CardFooter>
                        <div className='flex gap-2'>
                            {post.tags.map((tag: string, index: number) => {
                                return (
                                    <Card key={index} className='p-0' shadow='none'>
                                        <CardBody>
                                            <p className='text-xs'>{"#" + tag}</p>
                                        </CardBody>
                                    </Card>
                                )
                            })}
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </>
    )
}

export default BlogCard