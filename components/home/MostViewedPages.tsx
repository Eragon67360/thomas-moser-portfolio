import React, { useState, useEffect } from 'react';
import { redis } from '@/lib/redis';
import Post from './Post';
import { fetchPageViews } from '@/lib/get-posts';

interface PageView {
    slug: string;
    views: number;
}

const MostViewedPages = async () => {
    const pageViews = await fetchPageViews()


    return (
        <div>
            <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:my-0'>
                {pageViews.map((view, index) => {
                    const slug = view.slug;
                    const views = view.views;
                    return (
                        <Post key={slug} views={views} slug={slug} />
                    );
                })}
            </ul>
        </div>
    );
};

export default MostViewedPages;
