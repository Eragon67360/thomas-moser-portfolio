import React from 'react'
import Markdown from 'markdown-to-jsx'
import getPostMetadata from '@/utils/getPostMetadata'
import fs from 'fs'
import matter from 'gray-matter'

interface Params {
    slug?: string;
}
function getPostContent(slug: any) {
    const folder = 'articles/'
    const file = folder + `${slug}.md`
    const content = fs.readFileSync(file, 'utf-8')

    const matterResult = matter(content);
    return matterResult
}

export const generateStaticParams = async () => {
    const articles = getPostMetadata('articles')
    return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params, searchParams }: { params: Params, searchParams: URLSearchParams }): Promise<{ title: string }> {
    const id = params?.slug ? '| ' + params?.slug : '';
    return {
        title: `Thomas articles ${id.replaceAll('_', ' ')}`
    }
}

export default function ArticlePage(props: { params: { slug: any } }) {
    const slug = props.params.slug;
    const article = getPostContent(slug);
    return (
        <main>
            <article>
                <Markdown>{article.content}</Markdown>
            </article>
        </main>
    )
}

