import React from 'react'
import ProjectsViewer from './ProjectsViewer'
import { H2, H3 } from './ui/Typography'
import { HorizontalDivider } from './ui/HorizontalDivider'
 

const Projects = () => {
    return (
        <>
            <div id='projects' className='py-8 w-full max-w-[1440px] px-8'>
                <div className='flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
                    <H2>My projects</H2>                    
                    <H3>A selection of some of my creations, a mix of video training and personal projects.</H3>
                    <HorizontalDivider/>
                </div>
                <div className='flex'><ProjectsViewer /></div>

                
            </div>
        </>
    )
}

export default Projects