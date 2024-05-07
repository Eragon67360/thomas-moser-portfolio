
import getPosts from '@/lib/get-posts'
import PostsList from '.'
import LanguageDropdown from '../blog/LanguageDropdown'
import { useEffect, useState } from 'react';
import { Post } from '@/lib/types';
import { useLanguageContext } from '../blog/LanguageContext';
import path from 'path';
import { promises as fs } from "fs";

interface LanguageDropdownProps {
  selectedLanguages: string[];
}


export const PostListRSC = async () =>  {
  const posts = (await getPosts([])) as Post[];
  
  return (
    <>
      <div className='gap-8 w-full space-y-8'>
        <div className='w-full'>
          <PostsList posts={posts} />
        </div>
      </div>
    </>
  )
}