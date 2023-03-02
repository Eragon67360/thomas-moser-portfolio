import Head from 'next/head';
import React from "react";
import { BiDownArrowAlt } from 'react-icons/bi';
import { BiRightArrowAlt } from 'react-icons/bi';

import Link from 'next/link';

import { motion } from "framer-motion";

function HomePage() {
    return(
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Home - portfolio" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <motion.body
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className='w-screen min-h-screen overflow-auto overflow-x-hidden bg-gradient-to-b from-background via-gray-900 to-gray-700'
                >
                    <div className='h-screen w-screen fixed z-0 flex bg-transparent justify-evenly divide-x divide-neutral-500'>
                        <div className='w-full'></div>
                        <div className='w-full'></div>
                    </div>
                   

                <div className='snap-start bg-transparent w-screen h-screen flex items-center justify-center'>
                    <div className='z-10 flex flex-col mx-8 md:mx-16 lg:mx-24 transition-all duration-300 ease-in-out items-center justify-center w-full bg-background'>
                        <div className="unselectable text-white py-4 sm:py-8 md:py-8 text-md sm:text-lg  md:text-xl lg:text-xl text-center transition-all duration-300 ease-in-out">{"Hey there! I'm"} <span className='text-primary'>Thomas</span></div>
                        <div className='py-4 sm:py-8 md:py-8 text-2xl sm:text-4xl lg:text-4xl text-center text-white font-bold transition-all duration-300 ease-in-out'>{"I'm a Junior Developer building softwares in Germany."}</div>
                        <div className='py-0 sm:py-4 md:py-8 text-md sm:text-lg lg:text-xl text-center text-gray-500 transition-all duration-300 ease-in-out'>
                            Currently working at BMG LABTECH.
                        </div>
                    </div>

                </div>

                <div className='snap-start bg-transparent text-white w-screen h-screen flex items-center justify-center'>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        whileTap={{ scale: 0.8 }}
                        
                        className='z-10 mx-auto flex rounded-xl bg-transparent '>
                            <Link
                                href={"/about"}
                                className='border z-10 mx-auto flex flex-col rounded-xl p-4 md:p-8 lg:p-12 bg-background '>
                                <div className='text-2xl flex' >
                                    <div className=' text-2xl p-10'>About me</div>
                                    <div className='m-auto'><BiRightArrowAlt/></div>
                                </div>
                                <div className='animate-pulse text-center visible opacity-100 transition-opacity ease-in-out duration-500'>
                                    Wanna learn nore about me?
                                </div>
                            </Link>
                    </motion.div>

                </div>

                <div className='snap-start bg-transparent text-white w-screen h-screen flex items-center justify-center'>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        whileTap={{ scale: 0.8 }}
                        
                        className='z-10 mx-auto flex rounded-xl bg-background '>
                            <Link
                                href={"/projects"}
                                className='z-10 mx-auto border flex flex-col rounded-xl p-4 md:p-8 lg:p-12 bg-background'>
                                <div className='text-2xl flex' >
                                    <div className='text-2xl p-10'>Visit my projects</div>
                                    <div className='m-auto'><BiRightArrowAlt/></div>
                                </div>
                                <div className='animate-pulse text-center visible opacity-100 transition-opacity ease-in-out duration-500'>
                                    Take a look at my projects!
                                </div>
                            </Link>
                    </motion.div>
                </div>

                <div className='snap-start bg-transparent text-white w-screen h-screen flex items-center justify-center'>
                    <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    whileTap={{ scale: 0.8 }}
                    className='z-10 mx-auto flex rounded-xl bg-background '>
                        <Link className='z-10 mx-auto border flex flex-col rounded-xl p-4 md:p-8 lg:p-12 bg-background' href={"/activities"}>
                            <div className='text-2xl flex'>
                                <div className='text-2xl p-10'>My activities</div>
                                <div className='m-auto'><BiRightArrowAlt/></div>                                
                            </div>
                            <div className='animate-pulse text-center visible opacity-100 transition-opacity ease-in-out duration-500'>
                                    No way I have other activities than coding...
                                </div>
                        </Link>
                    </motion.div>

                </div>
                    
                    {/* <div className='h-screen w-screen fixed z-0 flex bg-transparent justify-evenly divide-x divide-neutral-500'>
                        <div className='w-full'></div>
                        <div className='w-full'></div>
                    </div>
                    */}

                

            </motion.body>
        </>
        
    )
};

export default HomePage;