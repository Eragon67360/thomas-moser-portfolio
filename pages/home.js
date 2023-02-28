import Head from 'next/head';
import React from "react";
import { BiDownArrowAlt } from 'react-icons/bi';
import { BiRightArrowAlt } from 'react-icons/bi';

import Link from 'next/link';

import { motion } from "framer-motion";

function HomePage() {
    return(
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                >

                <Head>
                    <title>Home</title>
                    <meta name="description" content="Home - portfolio" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="w-full h-full snap-y font-montserrat z-0 flex flex-col text-slate-200 transition-all duration-300 ease-in-out my-auto">
                    <div className='h-screen w-screen fixed z-0 flex bg-transparent justify-evenly divide-x divide-neutral-500'>
                        <div className='w-full'></div>
                        <div className='w-full'></div>
                    </div>
                    
                    <div className='h-screen z-10 flex transition-all duration-300 ease-in-out items-center justify-center m-auto bg-transparent'>
                        <div className='z-10 flex flex-col transition-all duration-300 ease-in-out items-center justify-center mx-auto w-[40vw] bg-background'>
                            <div className="unselectable py-4 sm:py-8 md:py-8 text-md sm:text-lg  md:text-xl lg:text-xl text-center transition-all duration-300 ease-in-out">{"Hey there! I'm"} <span className='text-primary'>Thomas</span></div>
                            <div className='py-4 sm:py-8 md:py-8 text-2xl sm:text-4xl lg:text-4xl text-center text-white font-bold transition-all duration-300 ease-in-out'>{"I'm a Junior Developer building softwares in Germany."}</div>
                            <div className='py-0 sm:py-4 md:py-8 text-md sm:text-lg lg:text-xl text-center text-gray-500 transition-all duration-300 ease-in-out'>
                                Currently working at BMG LABTECH.
                            </div>
                        </div>

                    </div>

                    <div className='snap-center h-screen bg-transparent'>
                        <div className='z-10 mx-auto flex rounded-xl p-12 bg-background '>                            
                            <div className='z-10 mx-auto  border flex rounded-xl p-12 bg-background '>
                                <Link className='text-2xl flex' href={"/projects"}>
                                    <div className='text-2xl p-10'>Visit my projects</div>
                                    <div className='m-auto'><BiRightArrowAlt/></div>
                                </Link>                                
                            </div>                            
                        </div>
                    </div>

                    <div className='snap-center h-screen bg-transparent'>
                        <div className='z-10 mx-auto flex rounded-xl p-12 bg-background '>
                            <Link className='z-10 mx-auto  border flex rounded-xl p-12 bg-background hover:bg-primary transition-all duration-300 ease-in-out' href={"/activities"}>
                                <div className='text-2xl flex'>                                    
                                        <div className='text-2xl p-10'>My activities</div>
                                        <div className='m-auto'><BiRightArrowAlt/></div>
                                    
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    
                    

                    
                </main>
                

            </motion.div>
        </>
        
    )
};

export default HomePage;