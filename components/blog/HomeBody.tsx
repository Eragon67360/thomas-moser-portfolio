"use client"

import React, { useEffect, useState } from 'react'
import { PostListRSC } from '../posts-list/rsc';
import LanguageDropdown from './LanguageDropdown';
import { Post } from '@/lib/types';
import getPosts from '@/lib/get-posts';



const HomeBody = async () => {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['english', 'french']);
    const [posts, setPosts] = useState<Post[]>([]);

    const handleLanguageChange = (languages: string[]) => {
        setSelectedLanguages(languages);
        fetchData(languages);
    };

    const fetchData = async (languages: string[]) => {
        const response = await getPosts(languages, true);

        setPosts(response);
    };

    useEffect(() => {
        fetchData(selectedLanguages);
        console.log(selectedLanguages);
    }, [selectedLanguages]);

    return (
        <>
            <div className='w-full flex justify-end'>
                <LanguageDropdown
                    selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} />
            </div>


            <div className='w-full max-w-[896px] py-8 flex flex-col items-center h-full'>
                <PostListRSC />
            </div>
        </>
    )
}

export default HomeBody