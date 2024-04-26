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
            <div className='py-8 w-[1440px] px-8'>
                <div className='flex flex-col items-center gap-4'>
                    <h2 className='uppercase font-bold text-xl'>Steam profile and games</h2>
                    <div className='h-[.5vh] bg-primary-500 rounded-3xl w-24'></div>
                </div>

                <div className='flex flex-col items-center py-8 gap-8'>
                    <SteamProfile />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {dataGames?.games.enrichedGames ? (
                            dataGames.games.enrichedGames.map((game: { appid: Key | null | undefined; }) => (
                                <GameDetail key={game.appid} game={game} />
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}

                    </div>
                </div>


            </div>

            <div className=''></div>



        </section>
    );
};

export default SteamLoader;