import getPosts from '@/lib/get-posts'
import { Metadata } from 'next'
import { MdAccessTime } from "react-icons/md";
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo, useState } from 'react';
import Toc from '@/components/blog/toc';
import { TocProps } from '@/lib/types';
import ShowPost from '@/components/blog/ShowPost';

export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export const generateMetadata = async ({
    params,
}: {
    params: {
        slug: string
    }
}): Promise<Metadata> => {
    const post = (await getPosts()).find((p) => p?.slug === params.slug)
    return {
        title: post?.title,
        description: post?.description,
        alternates: {
            canonical: `https://maxleiter.com/blog/${params.slug}`,
        },
    }
}

export default async function PostLayout({
    children,
    params,
}: {
    children: JSX.Element
    params: {
        slug: string
    }
}) {


    return (
        <>
            <ShowPost children={children} params={{
                slug: params.slug
            }}></ShowPost >
        </>
    )
}
