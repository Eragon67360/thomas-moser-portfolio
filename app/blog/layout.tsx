import React,{ ReactNode } from "react"

export const metadata = {
    title: 'Blog',
    description: 'Collection of informative and resources focused on various programming-related with the latest industry trends.',
    alternates: {
        canonical: 'https://thomasmoserdev.com/blog',
    },
}

export default function BlogLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <article>{children}</article>
    )
}

