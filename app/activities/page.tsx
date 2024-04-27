import React, { } from 'react'
import SpotifyLoader from '@/components/SpotifyLoader'
import SteamLoader from '@/components/steam/SteamLoader'
import { HorizontalDivider } from '@/components/ui/HorizontalDivider'
import { H2 } from '@/components/ui/Typography'

const Projects = async () => {
  return (
    <>
      <div className='w-[100%] flex flex-col items-center'>
        <div className='py-8 w-[1440px] px-8 flex flex-col items-center justify-center' >
          <div className='flex flex-col items-center gap-4 text-center'>
            <H2>Steam profile and games</H2>
            <HorizontalDivider />
          </div>
          <div id='steam' className='h-screen'>
            <SteamLoader />
          </div>
          <div className='flex flex-col items-center gap-4'>
            <H2>Spotify profile and streams</H2>
            <HorizontalDivider />
          </div>
          <div id='spotify' className='h-screen'>
            {/* <SpotifyLoader /> */}
          </div>


        </div>
      </div>


    </>
  )
}

export default Projects