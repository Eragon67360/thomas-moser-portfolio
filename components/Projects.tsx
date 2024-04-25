import React from 'react'
import ProjectsViewer from './ProjectsViewer'

const Projects = () => {
    return (
        <>
            <div id='projects' className='py-8 w-[1440px] px-8'>
                <div className='flex flex-col items-center gap-4'>
                    <h2 className='uppercase font-bold text-xl'>My projects</h2>
                    <div className='h-[.5vh] bg-primary-500 rounded-3xl w-24'></div>
                    <h3 className='text-lg text-secondary'>A selection of some of my creations, a mix of video training and personal projects.</h3>

                </div>

                <ProjectsViewer />
            </div>
        </>
    )
}

export default Projects