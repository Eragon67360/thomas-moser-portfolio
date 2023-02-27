import Head from 'next/head';
import React from "react";
import {AiFillYoutube, AiFillGithub, AiOutlineLinkedin} from 'react-icons/ai';
import {SiMusescore} from 'react-icons/si';
import Link from 'next/link';

import { motion } from "framer-motion";

function HomePage() {
    const classNames = require("classnames");
    const icons = [
        {
          icon: <AiFillGithub/>,
          href: "https://github.com/Eragon67360",
          name: "Github",
          color: "group-hover:bg-gradient-to-tr from-[#ffa9c6] to-[#f434e2]",
          icon_color: 'text-gray',
        },
        {
          icon: <AiOutlineLinkedin/>,
          href: "https://www.linkedin.com/in/thomas-moser67/",
          name: "Linkedin",
          color: "group-hover:bg-gradient-to-tr from-[#80ff72] to-[#5ec3d4]",
          icon_color: 'text-[#0a66c2]',
        },
        {
          icon: <AiFillYoutube/>,
          href: "https://www.youtube.com/channel/UC3IhL8CT3-xES72s_IRwuHw",
          name: "YouTube",
          color: "group-hover:bg-gradient-to-tr from-[#555555] to-[#ff0000]",
          icon_color: 'text-[#ff0000]',
        },
        {
          icon: <SiMusescore/>,
          href: "https://musescore.com/thomas_moser",
          name: "Musescore",
          color: "group-hover:bg-gradient-to-tr from-[#56ccf2] to-[#2f80ed]",
          icon_color: 'text-[#2e68c0]',
        },
  
      ]

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
                <main className="max-h-max px-4 sm:px-8 md:px-16 lg:px-20 pt-32 font-montserrat flex flex-col text-slate-200 transition-all duration-300 ease-in-out">
                    <div className='flex transition-all duration-300 ease-in-out'>
                        <div className='flex flex-col transition-all duration-300 ease-in-out'>
                            <div className="unselectable py-4 sm:py-8 md:py-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center sm:text-start font-bold transition-all duration-300 ease-in-out">{"Hey there! I'm"} <span className='text-primary'>Thomas Moser</span></div>
                            <div className='py-4 sm:py-8 md:py-12 text-lg sm:text-2xl lg:text-4xl text-center sm:text-start font-semibold text-slate-300 transition-all duration-300 ease-in-out'>Developer providing services for programming in embedded systems, software development... And so much more!</div>
                        </div>

                    </div>
                    <div className='unselectable my-20 flex mx-auto space-x-6 transition-all duration-300 ease-in-out'>
                        <button className='bg-primary text-lg sm:text-2xl lg:text-4xl rounded-md p-3 font-bold hover:opacity-70 transition-all duration-300 ease-in-out'>
                            <Link href="/projects">Visit projects</Link>
                        </button>
                        <button className='bg-[#3c3e43] text-lg sm:text-2xl lg:text-4xl rounded-md p-3 font-bold hover:opacity-70 transition-all duration-300 ease-in-out'>
                            <Link href="/about">About me</Link>
                        </button>
                    </div>
                    <div className='flex flex-col m-auto items-center transition-all duration-300 ease-in-out'>
                        <h1 className='text-[5vw] font-bold text-center m-auto transition-all duration-300 ease-in-out'>My socials</h1>
                        
                        <div className="unselectable flex flex-wrap gap-5 mt-10 h-[100px] p-2 md:p-4 lg:p-6 border border-primary rounded-3xl items-center mb-12 transition-all duration-300 ease-in-out">
                            {icons.map((item, index) =>(
                            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                                <div className='group z-0'>
                                <div className={classNames("bg-white h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 p-2 group-hover:w-44 rounded-full flex transition-{w} ease-in-out duration-500",`${item.color}`,'')}>
                                    <div className='opacity-0 text-lg sm:text-xl md:text-xl lg:text-2xl text-center group-hover:text-start hidden group-hover:block group-hover:opacity-100 uppercase text-slate-100 m-auto transition-{text-align} ease-in-out duration-500'>
                                    {item.name}
                                    </div>
                                    <div className={classNames('opacity-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl group-hover:hidden text-gray-700 m-auto transition ease-in-out duration-500 group-hover:opacity-0 ',`${item.icon_color}`)}>
                                    {item.icon}
                                    </div>
                                </div>
                                </div>
                            </a>
                            ))}
                        </div>
                    </div>
                </main>
                

            </motion.div>
        </>
        
    )
};

export default HomePage;