import React, { } from 'react'
import SpotifyLoader from '@/components/SpotifyLoader'
import SteamLoader from '@/components/steam/SteamLoader'

const Projects = async () => {
  return (
    <>
      <div className='w-[100%] flex flex-col items-center'>
        <div className='py-8 w-[1440px] px-8' >
          <div id='steam' className='h-screen w-1/2'>
            <SteamLoader />
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