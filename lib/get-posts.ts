
import matter from 'gray-matter'
import path, { join } from 'path';
import { cache } from 'react'
import { Post } from './types'
import { promises as fs } from "fs";
import { redis } from './redis';
import getConfig from 'next/config'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import { bundleMDX } from 'mdx-bundler';

const postsDirectory = process.cwd() + '\\articles';

export const getPosts = cache(async (languages: string[], includeThirdPartyPosts?: boolean) => {
    const rootPath = process.cwd();
    // console.log(languages);
    const articlesPath = join(rootPath, 'articles');
    console.log(postsDirectory);

    console.log("Trying to read from:", articlesPath);
    const posts = await fs.readdir(articlesPath);


    const postsWithMetadata = await Promise.all(
        posts
            .filter(
                (file) => path.extname(file) === '.md' || path.extname(file) === '.mdx',
            )
            .map(async (file) => {
                const filePath = `./articles/${file}`
                const postContent = await fs.readFile(filePath, 'utf8')
                const { data, content } = matter(postContent)

                if (data.published === false) {
                    return null
                }

                const withoutLeadingChars = filePath.substring(2).replace('.mdx', '.md')

                const fetchUrl =
                    process.env.NODE_ENV === 'production'
                        ? `https://api.github.com/repos/Eragon67360/thomas-moser-portfolio/commits?path=${withoutLeadingChars}&page=1&per_page=1`
                        : `http://localhost:3000/mock-commit-response.json`

                const commitInfoResponse = await fetch(fetchUrl, {
                    headers: {
                        Authorization: process.env.NEXT_GITHUB_TOKEN ?? '',
                    },
                })
                const commitInfo = await commitInfoResponse.json()
                let lastModified = 0
                if (commitInfo?.length) {

                    lastModified = new Date(commitInfo[0].commit.committer.date).getTime()

                    if (
                        lastModified - new Date(data.date).getTime() <
                        24 * 60 * 60 * 1000
                    ) {
                        lastModified = 0
                    }
                }

                // const result = await bundleMDX({
                //     source: content,

                //     mdxOptions(options) {
                //         options.remarkPlugins = [
                //             ...(options.remarkPlugins ?? [remarkGfm]),
                //         ];
                //         options.rehypePlugins = [
                //             ...(options.rehypePlugins ?? [rehypeSlug,
                //                 rehypeAutolinkHeadings,
                //                 rehypeCodeTitles,
                //                 rehypePrism,
                //                 rehypeAccessibleEmojis,]),

                //         ];

                //         return options;
                //     },
                // })
                // const { code } = result;

                return { ...data, body: content, lastModified, type: 'post'} as Post
            }),
    )

    const postsWithMetadataAndThirdPartyPosts = [
        ...postsWithMetadata,
    ]

    const filtered = postsWithMetadataAndThirdPartyPosts
        .filter((post) => post !== null)
        .sort((a, b) =>
            a && b ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0,
        ) as Post[]

    function filterPosts(languageFilter: string[]): Post[] {
        if (languageFilter?.includes("english") && languageFilter?.includes("french")) {
            return filtered;
        } else if (languageFilter?.includes("french")) {
            return filtered.filter(post => post.slug?.startsWith("fr-"));
        } else if (languageFilter?.includes("english")) {
            return filtered.filter(post => !post.slug?.startsWith("fr-"));
        } else {
            return [];
        }
    }

    let filteredPosts = filterPosts(languages);

    return filteredPosts
})


export async function getPost(slug: string) {
    const posts = await getPosts(["english", "french"]);


    return posts.find((post) => post.slug === slug)
}

export const fetchPageViews = async () => {
    let cursor = 0;
    let keys: string[] = [];
    let iterations = 0;

    while (true) {
        const [nextCursor, batchKeys] = await redis.scan(cursor, { match: 'pageviews:posts:*', count: 100 });
        keys = keys.concat(batchKeys);
        cursor = nextCursor;

        if (cursor === 0) {
            break;
        }
        if (++iterations > 1000) {
            console.error("iterations Breaking out of potential infinite loop in redis scan");
            break;
        }
    }

    if (keys.length === 0) return [];

    const values = (await redis.mget(...keys)).map(value => Number(value) || 0);

    const pageViews = keys.map((key, index) => {
        const slug = key.split(':')[2];
        return {
            slug,
            views: values[index]
        };
    });

    return pageViews.sort((a, b) => b.views - a.views);
};

export default getPosts