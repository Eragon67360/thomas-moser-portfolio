import React from 'react'
import { H2, H3 } from './ui/Typography'
import { HorizontalDivider } from './ui/HorizontalDivider'

const Competencies = () => {
  return (
    <>
      <div id='competencies' className='py-8 w-full max-w-[1440px] px-8'>
        <div className='flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
          <H2>Competencies</H2>
          <H3>My cross-disciplinary and technical skills </H3>
          <HorizontalDivider/>
        </div>
      </div>
    </>
  )
}

export default Competencies