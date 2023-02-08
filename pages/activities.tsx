import useSWR from 'swr'
import React from 'react';
import Steam from '../components/steam-games';

import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import { getRecentlyGames } from '../lib/steam';

export async function getStaticProps() {
    // const games = await getRecentlyGames();
    
  
    return {
      props: {
        games: null,//games.response['games']
      },
      revalidate: 1,
    };
  }


const Games = ({games}:  InferGetStaticPropsType<typeof getStaticProps>) => {

    
    const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
    const { data } = useSWR('/api/playersummaries', fetcher);

    return (
        <>
        <main className='prose prose-invert max-w-none prose-a:no-underline'>
        <div className='mx-auto  mb-16 max-w-3xl text-center'>
          <h1 className='text-center text-4xl text-white py-5 font-bold'>Steam Player Summaries</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            for now {data?.steam.getPersonName} is{' '}
            <span className='text-primary'>
              {data?.steam.getGames === false
                ? data?.steam.getStatus
                  ? data?.steam.getStatus
                  : '-'
                : data?.steam.getGames}
            </span>
            </p>
        </div>

        {/* <Steam items={games} /> */}

        </main>

        </>
    );
};

export default Games;
