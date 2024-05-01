import BlogCard from '@/components/blog/BlogCard';
import { PostListRSC } from '@/components/posts-list/rsc';
import { HorizontalDivider } from '@/components/ui/HorizontalDivider'
import { H2, H3 } from '@/components/ui/Typography'
import React from 'react'

function page() {
  return (
    <>
      <div className='font-inter w-full min-h-[90dvh] flex flex-col gap-8 items-center'>
        <div className='flex flex-col items-center gap-4 text-center mt-8 max-w-[1440px]'>
          <H2>Posts</H2>
          <H3>Collection of informative and resources focused on various programming-related with the latest industry trends.</H3>
          <HorizontalDivider />
        </div>
        <div className='w-full max-w-[1024px] py-8 px-8 flex flex-col items-center h-full'>
          <PostListRSC />
        </div>
      </div>


    </>
  )
}

export default page