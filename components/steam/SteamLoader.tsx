"use client"

import useSWR from 'swr';
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Key } from 'react';
import GameDetail from './GameDetail';
import SteamProfile from './SteamProfile';

const SteamLoader = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    
    const { data: dataGames, error: errorGames } = useSWR('/api/steamgames', fetcher, {
        refreshInterval: 20000,
    });

    
    if (errorGames) return <div>Failed to load games.</div>;
    if (!dataGames) return <div>Loading...</div>;

    return (
        <section className="mb-16 flex flex-col gap-8">

            <SteamProfile/>
            <div className="rounded-lg items-center border border-white border-opacity-10">
                <div className="flex py-6 my-auto rounded-md">
                    <div className="flex my-auto ml-5 mr-4">
                        <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                            
                        </div>
                        
                    </div>
                </div>
            </div>


            <div className='grid grid-cols-2 gap-8'>
                {dataGames?.games.enrichedGames ? (
                    dataGames.games.enrichedGames.map((game: { appid: Key | null | undefined; }) => (
                        <GameDetail key={game.appid} game={game} />
                    ))
                ) : (
                    <div>Loading...</div>
                )}

            </div>

        </section>
    );
};

export default SteamLoader;