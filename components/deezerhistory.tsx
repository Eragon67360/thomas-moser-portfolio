import useSWR from 'swr'
import React from 'react';
import {BiError} from 'react-icons/bi'
import DeezerHistorySkeleton from './DeezerHistorySkeleton'
import Image from 'next/image';

const DeezerHistory = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/deezerchart', fetcher);

  
    return (
      <div>
        {data ? (
          <section className="mb-16 m-auto container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.data.slice(0,12).map((music, index) => (
          <div key={index} className="rounded-lg items-center border border-white border-opacity-10">
            <div className="flex py-6 my-auto rounded-md">
            
              <div className="flex my-auto ml-5 mr-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                  {music.album.cover ? (
                    <a href={music.preview}
                    target="_blank"
                    rel='noreferrer noopener'
                    >
                    <Image
                      className="rounded-lg"
                      loader={() => music.album.cover}
                      src={music.album.cover}
                      width={100}
                      height={100}
                      alt="deezer album picture"
                    /></a>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="my-auto ml-3">
                  <p className="text-md sm:text-xl text-white">
                    {music.title ? music.title : "~"}
                    <div className="text-md sm:text-lg text-white font-semibold">
                        <p>{music.artist.name ? music.artist.name : "-"}</p>                    
                    </div>
                  </p>
                </div>
              </div>
            
            </div>
          </div>
          ))}
          </section>
          ):(
          <DeezerHistorySkeleton/>
          )
        }

      </div>
    );
  
};

export default DeezerHistory;

