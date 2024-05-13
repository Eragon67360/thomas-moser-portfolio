import Link from 'next/link'
import { title } from 'process'
import React from 'react'
import Views from '../redis/Views'
import { getPost } from '@/lib/get-posts'

const Post = async (props: { views: number; slug:string; }) => {
    const { views, slug } = props;
    const post = await getPost(slug);
    console.log(post);
    const title = post?.title;
    const description = post?.description;

    return (
        <>
            <Link href={`/blog/${slug}`} key={slug}>
                <div className='group relative h-full rounded-lg border border-gray-700 bg-white bg-opacity-5 backdrop-blur-sm duration-150 ease-in-out text-start'>
                    <div className='flex flex-col items-start justify-start px-4'>
                        <h3 className='mt-4'>
                            <div className='mb-2'>
                                <span className='mr-2 rounded-lg bg-primary bg-opacity-10 p-1 text-xs text-primary'>
                                    <Views views={views} />
                                </span>
                            </div>
                            <span>{title}</span>
                        </h3>
                        <p className='text-sm text-gray-300 my-4'>{description}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Post