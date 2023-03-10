//Cards for each project
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import YouTube from "react-youtube";
import { render } from "react-dom";
import { VideoReader } from "../../components/layout/video";
import Image from "next/image";
import Beautiful from "../../public/beautiful.gif"
import Head from "next/head";

export default function Project1 (){

        const _onReady = (event) => {
            event.target.pauseVideo();
        }

        const opts = {
            height: "390",
            width: "640",
            playerVars: {
                autoplay: 1,
            },
        };

        return(
            <>
                <Head>
                    <title>Projects--Stop Violence</title>
                    <meta name="description" content="Activities - portfolio" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="overflow-y-hidden h-[95vh] ">

                    <VideoReader/>
                    <main className='transition pb-24 ease-in-out duration-1000 h-screen overflow-scroll bg-fixed bg-transparent bg-gradient-to-br from-[#040404] via-cyan-900 to-primary'>
                        <div className="snap-center duration-700">
                            <header className="h-screen bg-project1-bg transition-all ease-in-out duration-1000">
                                <div className="h-screen group relative z-0 flex items-center justify-center w-full transition-all ease-in-out duration-500">
                                    <h1>
                                        <h2 className="unselectable opacity-0 align-middle mb-1 font-bold text-xl md:text-4xl text-gray-100 lg:text-8xl transition ease-in-out group-hover:opacity-100 duration-1000 transform translate-y-20 group-hover:translate-y-0">{"Mobile development"}</h2>
                                        <div className="absolute z-10 inset-0 flex justify-center items-center font-bold text-xl md:text-4xl lg:text-8xl text-primary opacity-100 transition ease-in-out group-hover:opacity-0 duration-1000 translate-y-0 group-hover:-translate-y-20">
                                            <p className="unselectable">{"Stop'Violence"}</p>
                                        </div>

                                    </h1>
                                
                                </div>
                            </header>

                        </div>
                        
                        <div className="snap-start flex flex-row  transition ease-in-out duration-1000">
                            <div className="flex-auto lg:flex-1 text-white text-center pt-10 flex flex-row">
                                <div className="w-20 md:w-36 lg:w-56 transition-all duration-1000"></div>
                                <div className="w-20 md:w-36 lg:w-56 transition-all duration-1000"></div>
                            </div>
                            <div className="flex-auto">
                                <div className="mt-12 py-10 bg-[#58585857] shadow-lg rounded-lg border border-white border-opacity-10 bg-background_100  flex-col">
                                    <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 text-start px-10">Overview ????</h1>
                                    <h2 className="py-20 px-10 text-start text-xl text-white">Stop&apos;Violence is a mobile application to identify the dangers of society in terms of harassment, etc... The project is initiated in the framework of the mobile development course of the Haute-??cole ARC (Neuch??tel, Switzerland).</h2>
                                    
                                    <div className="flex">
                                        <Image className="flex m-auto" src={Beautiful} alt="presentation gif" height={400} width={736} />
                                    
                                    </div>
                                    

                                    <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Objective ????</h1>

                                    <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Technologies Used ???????????</h1>

                                    <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Features ???</h1>

                                    <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Link to the project ????</h1>
                                    <h2 className="filter-none text-md lg:text-xl text-white pt-10 text-start px-10">Project <a href="https://github.com/Eragon67360/stop-violence.git" className="text-primary underline">link</a> on github.</h2>

                                    <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">What I Learn ????</h1>

                                </div>
                                <div className="h-20">                                
                                </div>

                            </div>

                            

                            <div className="flex-auto lg:flex-1 text-white text-center pt-20 flex flex-row">
                                <div className="w-20 md:w-36 lg:w-56 transition-all duration-1000"></div>
                                <div className="w-20 md:w-36 lg:w-56 transition-all duration-1000"></div>
                            </div>
                            
                        </div>


                    </main>

                    
                
                </motion.div>

            </>
           
            
        );
    }
   


