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
        },
        {
          icon: <AiOutlineLinkedin/>,
          href: "https://www.linkedin.com/in/thomas-moser67/",
          name: "Linkedin",
          color: "group-hover:bg-gradient-to-tr from-[#80ff72] to-[#5ec3d4]",
        },
        {
          icon: <AiFillYoutube/>,
          href: "https://www.youtube.com/channel/UC3IhL8CT3-xES72s_IRwuHw",
          name: "YouTube",
          color: "group-hover:bg-gradient-to-tr from-[#555555] to-[#ff0000]",
        },
        {
          icon: <SiMusescore/>,
          href: "https://musescore.com/thomas_moser",
          name: "Musescore",
          color: "group-hover:bg-gradient-to-tr from-[#56ccf2] to-[#2f80ed]",
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
                <main className="h-[95vh] px-20 pt-32 font-montserrat flex flex-col text-slate-200">
                    <div className='flex'>
                        <div className='flex flex-col'>
                            <div className="unselectable py-12 text-7xl  font-bold">{"Hey there! I'm"} <span className='text-primary'>Thomas Moser</span></div>
                            <div className='py-12 text-2xl'>Developer providing services for programming in embedded systems, software development... And so much more!</div>
                        </div>

                    </div>
                    <div className='my-20 flex mx-auto space-x-6'>
                        <button className='bg-primary text-2xl rounded-md p-3 font-bold hover:opacity-70'>
                            <Link href="/projects">Visit projects</Link>
                        </button>
                        <button className='bg-[#3c3e43] text-2xl rounded-md p-3 font-bold hover:opacity-70'>
                            <Link href="/about">About me</Link>
                        </button>
                    </div>
                    <div className='flex flex-col items-start m-auto'>
                        <h1 className='text-5xl font-bold text-center m-auto'>My socials</h1>
                        <div className="flex flex-wrap gap-12 lg:gap-5 mt-10 h-[100px] p-6 border border-primary rounded-3xl items-start">
                            {icons.map((item, index) =>(
                            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                                <div className='group z-0'>
                                <div className={classNames("bg-white h-14 w-14 p-2 group-hover:w-40 rounded-full flex transition-{w} ease-in-out duration-500",`${item.color}`,'')}>
                                    <div className='opacity-0 text-lg group-hover:text-2xl text-center group-hover:text-start hidden group-hover:block group-hover:opacity-100 uppercase text-slate-100 m-auto transition-{text-align} ease-in-out duration-500'>
                                    {item.name}
                                    </div>
                                    <div className='opacity-100 text-4xl group-hover:hidden text-gray-700 m-auto transition ease-in-out duration-500 group-hover:opacity-0 '>
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