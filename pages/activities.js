import Head from 'next/head'
import dynamic from 'next/dynamic';
import Player from '../components/steamplayer';
import { Suspense } from "react";
import GamesSkeleton from '../components/GamesSkeleton';

// const DynamicSteamPlayer = dynamic(() => import('../components/steamplayer'), {
//     ssr: false,
//   });
  const DynamicSteamGames = dynamic(() => import('../components/steamgames'), {
    ssr: false,
  });
  
  const DynamicDeezerProfile = dynamic(() => import('../components/deezeruser'), {
    ssr: false,
  });
  
  const DynamicDeezerHistory = dynamic(() => import('../components/deezerhistory'), {
    ssr: false,
  });

function Activities() {
    return(
        <>
            <Head>
                <title>Activities</title>
                <meta name="description" content="Activities - portfolio" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='max-h-max border border-transparent bg-bg_gradient bg-fixed bg-no-repeat bg-cover'>
                <div className='px-20 py-[2vw] z-0'>
                    <div className="unselectable py-[1vh] text-[5vw] font-bold">Activities</div>
                </div>

                <div className='m-10 p-10 rounded-xl bg-gray-400/30 mt-[2vw]'>

                    <h1 className='text-center text-4xl text-white py-5 font-bold'>What I play</h1>
                    <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>My status.</p>
                    <Player/>

                    
                    <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>The games I recently played.</p>
                    <DynamicSteamGames/>
                    <h1 className='text-center mt-24 text-4xl text-white py-5 font-bold'>What I&apos;m currently listening to.</h1>
                    
                    <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>My status.</p>
                    <DynamicDeezerProfile/>
                    <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>My last listened songs.</p>
                    <DynamicDeezerHistory className="flex items-center justify-center h-screen"/>

                </div>
                
            </div>
        </>
    )
};

export default Activities;