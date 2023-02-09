import useSWR from 'swr'
import React from 'react';
import Image from 'next/image';

const PlayedGames = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/gamessummaries', fetcher);


  // const src=`https://steamcdn-a.akamaihd.net/steam/apps/${data.steam[0].appid}/header.jpg`//https://steamcdn-a.akamaihd.net/steam/apps/${data?.steam.appid}/header.jpg

  // console.log(src)
  
  if(!data){
  }
  if(data){
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
    <div className='mb-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 py-8'>          
          {data.steam.map((game, index) => (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://store.steampowered.com/app/${game.appid}`}
              key={game.appid}
              className='group relative h-full rounded-md bg-opacity-75  duration-150 ease-in-out'
            >
              <div className='absolute h-full w-full rounded-md opacity-80 duration-150 ease-in-out group-hover:opacity-100'>
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

