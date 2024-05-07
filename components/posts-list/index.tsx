'use client'

import BlockEntry from '@/components/entry/block'
import getPosts from '@/lib/get-posts'
import type { Post } from '@/lib/types'

type Props =
  | {    
    posts: Post[]
  }


const Posts = async (props: Props) => {
  const { posts } = props
  
  return (
    <ul>
      {posts.slice(0,).map((post) => {
        const date = new Date(post.date).toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        })

        return (
          <BlockEntry
            key={`post-item-${post.slug || Math.random()}`}
            href={`/blog/${post.slug}`}
            tags={post.tags}
            title={post.title}
            date={new Date(date)}
            views={post.views}
            description={post.description}
          />
        )
      })}
    </ul>
  )
}

export default Posts
