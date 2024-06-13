'use client'
import React from 'react'
import musescore from '@/public/img/musescore.png';
import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
import projects from '@/public/json/projects.json'

const ProjectsViewer = () => {
    const base_URL = 'https://res.cloudinary.com/dluezegi8/image/upload/v1715078393/images/upload/thomasmoserdev.com/projects/'

    return (
        <>
            <section className="mt-12 mx-auto max-w-screen-xl w-full transition-all duration-150">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 transition-all duration-150">
                    {
                        projects.map((item, key) => (

                            <Card key={key}
                                className='border border-transparent hover:border-[#ffffff33] bg-[#ccdcff1f] hover:bg-transparent p-2 group'>
                                <Link href={item.link} target='_blank'>
                                    <CardBody className='flex flex-col gap-8'>
                                        <Image data-tilt priority src={base_URL + item.screenshot} className='aspect-video rounded-lg' alt={'Project screenshot'} width={1920} height={1080} />
                                        <div className='rounded-lg bg-[#5757577b] group-hover:bg-[#57575733] py-3 px-4 flex flex-col gap-4'>
                                            <div className='flex justify-between items-center'>
                                                <div className="font-bold text-lg md:text-xl relative overflow-hidden">
                                                    <div className="absolute w-full transition-transform duration-300 ease-linear z-20 translate-y-0 group-hover:-translate-y-full">{item.title}</div>
                                                    <div className="w-full transition-transform duration-300 ease-linear z-10 translate-y-full group-hover:translate-y-0">{item.title}</div>
                                                </div>
                                                <FaArrowRight className='group-hover:-rotate-45 transition-all duration-500' />
                                            </div>
                                            <div className='flex gap-4'>
                                                {item.code.map((code, index) => {
                                                    return (
                                                        <div key={index} className='flex gap-2 items-center text-sm sm:text-base'>
                                                            <div className='w-2 h-2 rounded-full bg-primary'></div>
                                                            {code}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='flex gap-2 item-center'>
                                                {item.designed && (<p className='text-xs text-secondary'>Designed by: {item.designed}</p>)}
                                                {item.designed && item.designed && (<div className='bg-secondary w-1 h-1 rounded-full'></div>)}
                                                {item.developed && (<p className='text-xs text-secondary'>Developed by: {item.developed}</p>)}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Link>

                            </Card>
                        ))
                    }
                </div>




            </section>
        </>
    )
}

export default ProjectsViewer