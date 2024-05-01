import getPosts from '@/lib/get-posts'
import { bundleMDX } from 'mdx-bundler'
import React from 'react'
import { MdAccessTime } from 'react-icons/md'
import PostComponent from './PostComponent'
import Image from '../shared/image'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import readingDuration from 'reading-duration';
import Comment from './Comment'

let imageSrc = ""

async function getData({ slug }: { slug: string }) {
    const posts = await getPosts()
    const postIndex = posts.findIndex((p) => p?.slug === slug)

    if (postIndex === -1) {
        throw new Error(`${slug} not found in posts. Did you forget to rename the file?`)
    }

    const post = posts[postIndex]

    const { ...rest } = post
    imageSrc = slug;

    return {
        previous: posts[postIndex + 1] || null,
        next: posts[postIndex - 1] || null,
        ...rest,
    }
}


export default async function ShowPost({
    params,
}: {
    params: {
        slug: string
    }
}) {
    const { previous, next, title, date, lastModified, description, duration, body } = await getData(params)
    // const [toc, setToc] = useState([] as Array<TocProps>);
    const lastModifiedDate = lastModified
        ? new Date(lastModified).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : null


    const readingTime = readingDuration(body, {
        wordsPerMinute: 100,
        emoji: false
    });
    const result = await bundleMDX({
        source: body,

        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? [remarkGfm]),
            ];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? [rehypeSlug,
                    rehypeAutolinkHeadings,
                    rehypeCodeTitles,
                    rehypePrism,
                    rehypeAccessibleEmojis,]),

            ];

            return options;
        },
    })

    const { code, frontmatter } = result

    return (
        <>
            <div className="custom-prose mx-auto mb-16 max-w-none sm:mb-28">
                <div className="relative -mt-28 min-h-[105vh]">
                    <div className="absolute h-full w-full opacity-40">
                        <figure className="object-cover flex overflow-hidden">
                            <Image
                                alt={description}
                                src={`/thomasmoserdev.com/blog/${imageSrc}/header`}
                                className="false object-cover"
                                style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} />
                        </figure>
                    </div>
                    <div className="relative flex h-full min-h-[105vh] w-full items-center justify-center bg-gradient-to-t from-background to-transparent text-center">
                        <div className="mx-5 max-w-3xl">
                            <h1 className="text-3xl text-white sm:text-5xl font-extrabold">{title}</h1>
                            <div className="relative my-10 grid grid-cols-[auto_1fr_auto] items-center gap-x-2">
                                <time className="rounded-lg bg-white bg-opacity-20 p-1 px-2 text-sm">{date}</time>
                                <div className="w-full border-b"></div>
                                <div className='flex gap-2 items-center'><MdAccessTime />{readingTime}</div>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <p className="text-md mb-10 text-center text-gray-400 sm:text-lg lg:mb-0">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id='article'
                    className='mx-auto my-10 max-w-6xl flex-none px-6 sm:my-20 md:px-24 lg:flex lg:space-x-8 xl:px-0'
                >
                    <div className='mx-auto w-full'>
                        <article className='w-full'>
                            <PostComponent code={code} />
                        </article>
                        <hr className='my-8 opacity-20' />
                        <Comment />
                    </div>

                    <div className='hidden lg:block my-10 ml-4 space-y-6 lg:w-[40%]'>
                        <div className='sticky top-10 rounded-lg border border-gray-700 bg-white bg-opacity-5 backdrop-blur-sm backdrop-filter'>
                            <span className='block px-4 py-3 font-medium'>
                                Table of Contents
                            </span>
                            <hr className='m-0' />
                            <div className='pr-2'>
                                {/* <Toc toc={toc} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
