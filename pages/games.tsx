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


const Games = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/playersummaries', fetcher);

  return (
    <section className="mb-16 container">
      <div className="rounded-lg items-center border border-white border-opacity-10">
        <div className="flex py-6 my-auto rounded-md">
          <div className="flex my-auto ml-5 mr-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-lg">
              {data?.steam.getAvatar ? (
                <img
                  className="rounded-lg"
                  src={data?.steam.getAvatar}
                  width={100}
                  height={100}
                  alt="steam profil picture"
                />
              ) : (
                <div></div>
              )}
            </div>
            <div className="my-auto ml-3">
              <p className="text-md sm:text-xl text-white">
                {data?.steam.getPersonName ? data?.steam.getPersonName : "~"}
                <div className="text-md sm:text-lg text-white font-semibold">
                  {data?.steam.getGames === false ? (
                    <p>{data?.steam.getStatus ? data?.steam.getStatus : "-"}</p>
                  ) : (
                    <p className="text-white font-normal">{data?.steam.getGames}</p>
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Games;

