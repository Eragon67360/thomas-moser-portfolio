import React, { } from 'react'
import SpotifyLoader from '@/components/spotify/SpotifyLoader'
import SteamLoader from '@/components/steam/SteamLoader'
import { HorizontalDivider } from '@/components/ui/HorizontalDivider'
import { H2 } from '@/components/ui/Typography'

const Projects = async () => {
  return (
    <>
      <div className='w-full py-8 px-8 flex flex-col items-center justify-center h-full'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <H2>Steam profile and games</H2>
          <HorizontalDivider />
        </div>
        <div id='steam' className='w-full flex items-center justify-center'>
          <SteamLoader />
        </div>
        <hr className='h-16'/>
        <div className='flex flex-col items-center gap-4'>
          <H2>Spotify profile and streams</H2>
          <HorizontalDivider />
        </div>
        <div id='spotify' className='w-full flex items-center justify-center'>
          <SpotifyLoader />
        </div>

      </div>


    </>
  )
}

export default Projects