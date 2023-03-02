import useSWR from 'swr'
import { useState, useEffect } from 'react'
import React from 'react';
import {BiError} from 'react-icons/bi'
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PlayerSkeleton from './PlayerSkeleton'

const Player = () => {
    const [isLoading, setLoading] = useState(false);

    const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
    const {data} = useSWR('/api/playersummaries', fetcher)

    if(!data) {
        return <PlayerSkeleton/>
    }

    return (
      <div className='m-auto'>
        <section className="mb-16 container">
          <div className="rounded-lg">
            <div className="flex py-6 rounded-md">
              <div className="flex m-auto">
                <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                  {data?.steam.getAvatar ? (
                    <Image
                      className="rounded-lg"
                      loader={() => data?.steam.getAvatar}
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
      </div>
      
    );
  
};

export default Player;

