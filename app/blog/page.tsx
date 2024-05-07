import HomeBody from '@/components/blog/HomeBody';
import PostsList from '@/components/posts-list';
import { HorizontalDivider } from '@/components/ui/HorizontalDivider'
import { H2, H3 } from '@/components/ui/Typography'
import getPosts from '@/lib/get-posts';
import { Post } from '@/lib/types';
import React from 'react'

async function page() {
  const posts = (await getPosts(['english', 'french'])) as Post[];
  return (
    <>
      <div className='font-inter w-full flex flex-col gap-8 items-center'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <H2>Posts</H2>
          <H3>Collection of informative and resources focused on various programming-related with the latest industry trends.</H3>
        </div>

        <div className='w-full max-w-[896px] py-8 flex flex-col items-center h-full'>
          <div className='gap-8 w-full space-y-8'>
            <div className='w-full'>
              <PostsList posts={posts} />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default page