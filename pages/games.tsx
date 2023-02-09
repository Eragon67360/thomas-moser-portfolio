import useSWR from 'swr'
import React from 'react';
import Steam from '../components/steam-games';
import {BiError} from 'react-icons/bi'
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import { getRecentlyGames } from '../lib/steam';

export async function getStaticProps() {
    const games = await getRecentlyGames();
    console.log(games)
  
    return {
      props: {
        games: games.response['games'],
      },
      revalidate: 1,
    };
  }

const PlayedGames = ({
    games,
  }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Steam items={games}/>
    )
    

  
  
};

export default PlayedGames;

