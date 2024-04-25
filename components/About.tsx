import React from 'react'

const About = () => {
  return (
    <>
      <div id='about' className='py-8 w-[1440px] px-8'>
        <div className='flex flex-col items-center gap-4'>
          <h2 className='uppercase font-bold text-xl'>About me</h2>
          <h3 className='text-lg text-secondary'>Full-Stack Developer</h3>
          <div className='h-[.5vh] bg-primary-500 rounded-3xl w-24'></div>
        </div>
      </div>
    </>
  )
}

export default About