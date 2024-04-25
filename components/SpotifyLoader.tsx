'use client'

import React, { useEffect, useState } from 'react'
import { SpotifyApi } from '@spotify/web-api-ts-sdk';


const SpotifyLoader = () => {

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState();

    const fetchSpotifyAPI = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/spotify', {
                headers: {
                    Accept: 'application/json',
                    method: 'GET',
                }
            });
            if (response) {
                const data = await response.json();
                console.table(data.artists.items.map((item: { name: any; followers: { total: any; }; popularity: any; }) => ({
                    name: item.name,
                    followers: item.followers.total,
                    popularity: item.popularity,
                })));
                setItems(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     fetchSpotifyAPI();
    // });

    return (
        <>
            <button onClick={fetchSpotifyAPI} className='bg-primary-500 p-3'>CLICK ME</button>
            {/* {items && (
                <div>{items}</div>
            )} */}
        </>

    )
}

export default SpotifyLoader