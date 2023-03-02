import useSWR from 'swr';
import { useState, useEffect } from 'react'
import React from 'react';
import Image from 'next/image';
import GamesSkeleton from './GamesSkeleton'

import Skeleton from 'react-loading-skeleton'
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const PlayedGames = () => {
    
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch('/api/playersummaries')
            .then((res) => res.json())
            .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading){
        return <GamesSkeleton/>
    }

    if(!data){
        return <div>No data</div>
    }

    var array = [];
    var playtime = [];
    var name = [];
    var index = 0;
    for (const game in data.steam) {
    array[game]=`https://steamcdn-a.akamaihd.net/steam/apps/${data.steam[game].appid}/header.jpg`;
    playtime[game] = data.steam[game].playtime_forever;
    name[game] = data.steam[game].name; 
    }

    return (
    <div className='flex mx-auto'>
    
        <div className='py-10 flex mx-auto'>
            <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28'>          
            {data.steam.map((game, index) => (
                <a
                target='_blank'
                rel='noopener noreferrer'
                href={`https://store.steampowered.com/app/${game.appid}`}
                key={game.appid}
                className='group rounded-md bg-opacity-75 duration-150 ease-in-out'
                >
                <div className='inline-block absolute rounded-md opacity-80 duration-150 ease-in-out group-hover:opacity-100'>
                    <Image
                    className='rounded-md'
                    loader={() => array[index]}
                    src={array[index]}
                    alt={game.getname}
                    width={400}
                    height={200}
                    />
                </div>
                <div className='relative z-10 flex h-full items-end rounded-md p-4 '>
                    <div className=' z-20 rounded-mdl flex flex-col space-y-5'>
                    <h3 className='bg-black bg-opacity-80 p-1 text-gray-300'>{name[index]}</h3>

                    <span className=' bg-black bg-opacity-80 p-1 text-gray-300'>
                        {(parseInt(playtime[index]) / 60 + 1) | 0} Hours
                    </span>
                    </div>
                </div>
                </a>
                ))}
            
            </div>
        </div>
    </div>
    );

}


export default PlayedGames;

