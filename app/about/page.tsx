import About from '@/components/About'
import Competencies from '@/components/Competencies'
import React from 'react'
import Projects from '@/components/projects/Projects'

const page = () => {
    return (
        <>
            <div className='w-full flex flex-col items-center h-screen'>
                <About />
                <hr className="w-full h-px border-0 bg-gray-500/30" />
                <Competencies />
                <hr className="w-full h-px border-0 bg-gray-500/30" />
            </div>
        </>

    )
}

export default page