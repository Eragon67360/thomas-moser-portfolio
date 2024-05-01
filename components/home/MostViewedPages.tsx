
import React, { useState, useEffect } from 'react';
import { Redis, ScanCommandOptions } from '@upstash/redis';
import { redis } from '@/lib/redis';

interface PageView {
    slug: string;
    views: number;
}

const MostViewedPages = () => {
    const [pageViews, setPageViews] = useState<PageView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchPageViews = async () => {
        let cursor = 0; // Start with cursor at 0
        let keys: string[] = [];
        let iterations = 0; // To prevent any possible infinite loop
        console.log('-----------------------------------------------------------------------\n----------------------------------------------------------')

        while (true) {
            const [nextCursor, batchKeys] = await redis.scan(cursor, { match: 'pageviews:posts:*', count: 100 });
            console.log('Cursor:', cursor);
            console.log('Next Cursor:', nextCursor);
            console.log('Batch Keys:', batchKeys);
            // keys = keys.concat(batchKeys);
            // cursor = nextCursor; // Update cursor to the nextCursor from the response

            // // Check if the scan is complete
            // if (cursor === 0) {
            //     break;
            // }
            // if (++iterations > 1000) {
            //     console.error("Breaking out of potential infinite loop in redis scan");
            //     break;
            // }
        }

        if (keys.length === 0) return [];

        // Fetch all values for the keys
        //const values = (await redis.mget(...keys)).map(value => Number(value) || 0);

        // Combine keys and values, and extract the slug from the key
        const pageViews = keys.map((key, index) => {
            const slug = key.split(':')[2];
            return {
                slug,
                views: 0 // Handle possible null values
            };
        });

        // Sort the results by views in descending order
        return pageViews.sort((a, b) => b.views - a.views);
    };

    useEffect(() => {
        fetchPageViews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Page Views</h1>
            <ul>
                {pageViews.map((view, index) => (
                    <li key={index}>
                        {view.slug}: {view.views} views
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostViewedPages;
