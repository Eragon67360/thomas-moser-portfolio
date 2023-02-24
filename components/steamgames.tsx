import useSWR from 'swr'
import React from 'react';
import Image from 'next/image';
import {BiError} from 'react-icons/bi'

const PlayedGames = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/gamessummaries', fetcher);


  // const src=`https://steamcdn-a.akamaihd.net/steam/apps/${data.steam[0].appid}/header.jpg`//https://steamcdn-a.akamaihd.net/steam/apps/${data?.steam.appid}/header.jpg

  // console.log(src)
  
  if(!data){
    return (
      <section>
        <div className='text-2xl flex flex-wrap gap-12 py-10'>
          <div className=''><BiError/></div>
          <h1 className=''>{"Sorry, an error occured. We couldn't fetch the player's games informations!"}</h1>
        </div>
        
      </section>
    );
  }
  else {
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
    <div className='py-10 m-auto '>
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
            <div className='relative z-0 flex h-full items-end rounded-md p-4 '>
              <div className=' rounded-mdl flex flex-col space-y-5'>
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
    );
  }
}

export default PlayedGames;

