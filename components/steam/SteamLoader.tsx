"use client"

import useSWR from 'swr';
import { Key } from 'react';
import GameDetail from './GameDetail';
import SteamProfile from './SteamProfile';
import Loader from '../Loader';


const SteamLoader = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: dataGames, error: errorGames } = useSWR('/api/steamgames', fetcher, {
        refreshInterval: 20000,
    });


    if (errorGames) return <div>Failed to load games.</div>;
    if (!dataGames) return <Loader />;

    return (
        <section className="flex flex-col gap-8 my-8 items-center w-full max-w-[1440px]">
            <SteamProfile />
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                {dataGames?.games.enrichedGames ? (
                    dataGames.games.enrichedGames.map((game: { appid: Key | null | undefined; }) => (
                        <GameDetail key={game.appid} game={game} />
                    ))
                ) : (
                    <Loader />
                )}

            </div>
        </section>
    );
};

export default SteamLoader;