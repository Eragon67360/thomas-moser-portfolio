import getPosts from '@/lib/get-posts'
import { Metadata } from 'next'
import ShowPost from '@/components/blog/ShowPost';

export async function generateStaticParams() {
    const posts = await getPosts(['english','french'])
    return posts.map((post) => ({ slug: post.slug }))
}

export const generateMetadata = async ({
    params,
}: {
    params: {
        slug: string
    }
}): Promise<Metadata> => {
    const post = (await getPosts(['english','french'])).find((p) => p?.slug === params.slug)
    return {
        title: post?.title,
        description: post?.description,
        alternates: {
            canonical: `https://thomasmoserdev.com/blog/${params.slug}`,
        },
    }
}

export default async function PostLayout({
    params,
}: {
    params: {
        slug: string
    }
}) {
    return (
        <>
            <ShowPost params={{
                slug: params.slug
            }} />
        </>
    )
}
