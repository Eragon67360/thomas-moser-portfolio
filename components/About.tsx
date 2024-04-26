import React from 'react'
import { H2,H3 } from './ui/Typography';
import { HorizontalDivider } from './ui/HorizontalDivider';

const About = () => {
  return (
    <>
      <div id='about' className='py-8 w-full max-w-[1440px] px-8'>
        <div className='flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
          <H2>About me</H2>
          <H3>Full-Stack Developer</H3>
          <HorizontalDivider/>
        </div>
      </div>
    </>
  )
}

export default About