import React, { } from 'react'
import SpotifyRecentlyPlayed from '@/components/spotify/SpotifyRecentlyPlayed'
import SteamLoader from '@/components/steam/SteamLoader'
import { HorizontalDivider } from '@/components/ui/HorizontalDivider'
import { H2 } from '@/components/ui/Typography'
import SpotifyTopArtists from '@/components/spotify/SpotifyTopArtists'
import SpotifyTopTracks from '@/components/spotify/SpotifyTopTracks'

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
        <hr className='h-16' />
        <div className='flex flex-col items-center gap-4'>
          <H2>Spotify profile and streams</H2>
          <HorizontalDivider />
        </div>
        <div id='spotify' className='w-full max-w-[1440px] flex flex-col lg:flex-row gap-8 py-8 items-centertransition-all duration-250'>
          <div className='flex flex-col gap-8 w-full lg:w-1/2'>
            <SpotifyTopArtists />
            <SpotifyTopTracks />
          </div>
          <div className='h-full w-full lg:w-1/2'>
            <SpotifyRecentlyPlayed />
          </div>


        </div>
      </div>


    </>
  )
}

export default Projects