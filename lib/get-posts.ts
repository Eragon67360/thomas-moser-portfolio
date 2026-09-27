
import matter from 'gray-matter'
import path, { join } from 'path';
import { cache } from 'react'
import { Post } from './types'
import { promises as fs } from "fs";
import { redis } from './redis';
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import { bundleMDX } from 'mdx-bundler';

export const getPosts = cache(async (languages: string[], includeThirdPartyPosts?: boolean) => {
    const rootPath = process.cwd();
    const articlesPath = join(rootPath, 'articles');

    const posts = await fs.readdir(articlesPath);

    const postsWithMetadata = await Promise.all(
        posts
            .filter(
                (file) => path.extname(file) === '.md' || path.extname(file) === '.mdx',
            )
            .map(async (file) => {
                const filePath = join(articlesPath, file);
                const postContent = await fs.readFile(filePath, 'utf8');
                const { data, content } = matter(postContent);

                if (data.published === false) {
                    return null;
                }

                // For GitHub API, we need the relative path from repo root
                const relativePath = `articles/${file}`.replace('.mdx', '.md');

                let lastModified = 0;

                try {
                    const fetchUrl =
                        process.env.NODE_ENV === 'production'
                            ? `https://api.github.com/repos/Eragon67360/thomas-moser-portfolio/commits?path=${encodeURIComponent(relativePath)}&page=1&per_page=1`
                            : `http://localhost:3001/mock-commit-response.json`

                    const commitInfoResponse = await fetch(fetchUrl, {
                        headers: {
                            Authorization: process.env.NEXT_GITHUB_TOKEN ? `token ${process.env.NEXT_GITHUB_TOKEN}` : '',
                            Accept: 'application/vnd.github.v3+json',
                        },
                    })

                    if (!commitInfoResponse.ok) {
                        console.warn(`GitHub API error for ${relativePath}: ${commitInfoResponse.status} ${commitInfoResponse.statusText}`);
                        // Continue without lastModified date
                    } else {
                        const contentType = commitInfoResponse.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const commitInfo = await commitInfoResponse.json();

                            if (Array.isArray(commitInfo) && commitInfo.length > 0) {
                                lastModified = new Date(commitInfo[0].commit.committer.date).getTime();

                                if (
                                    lastModified - new Date(data.date).getTime() <
                                    24 * 60 * 60 * 1000
                                ) {
                                    lastModified = 0;
                                }
                            }
                        } else {
                            console.warn(`GitHub API returned non-JSON response for ${relativePath}`);
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching commit info for ${relativePath}:`, error);
                    // Continue without lastModified date
                }

                return { ...data, body: content, lastModified, type: 'post' } as Post
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
    let cursor: string | number = 0;
    const keysSet = new Set<string>();

    do {
        const reply = await redis.scan(cursor, { match: 'pageviews:posts:*', count: 100 });
        const [nextCursor, batchKeys] = reply as [string | number, string[]];

        // Add keys to Set to automatically deduplicate
        batchKeys.forEach(key => keysSet.add(key));

        cursor = nextCursor;
    } while (cursor !== 0 && cursor !== "0");

    const keys = Array.from(keysSet);

    if (keys.length === 0) return [];

    const values = (await redis.mget(...keys)).map(value => Number(value) || 0);

    const pageViews = keys.map((key, index) => {
        const slug = key.split(':')[2];
        return {
            slug,
            views: values[index] || 0
        };
    });

    return pageViews.sort((a, b) => b.views - a.views);
};

export default getPosts