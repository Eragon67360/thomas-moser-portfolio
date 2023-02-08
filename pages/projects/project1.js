//Cards for each project
import React from "react";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { AnimatedName } from '../../components/layout/project1_float'
export default function Project1() {

    const title = "Card -- Stop'Violence"

    const [scrolled, setMore] = useState(false);
    var classNames = require('classnames');

    const setScrolled = () => {
        if (window.pageYOffset > 200) {
        setMore(true)
        } else {
        setMore(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', setScrolled)

        return () => {
        window.removeEventListener('scroll', setScrolled)
        }
    }, [])

    return(
        <div className="">
            <NextSeo title={title}/>
            <AnimatedName/>
            <div>
                <main className='h-max bg-fixed bg-transparent bg-gradient-to-br from-[#040404] via-cyan-900 to-primary'>
                    <div className="h-screen">
                        <header className={classNames(scrolled ?'h-1/3 md:h-1/2 lg:h-3/4' : 'h-screen'," bg-project1-bg transition-all ease-in-out duration-1000")}>
                            <div className={classNames(scrolled ?'h-1/3 md:h-1/2 lg:h-3/4' : 'h-screen'," group relative z-0 flex items-center justify-center w-full transition-all ease-in-out duration-500")}>
                                <h1>
                                    <h2 className="unselectable opacity-0 align-middle mb-1 font-bold text-xl md:text-4xl text-gray-100 lg:text-8xl transition ease-in-out group-hover:opacity-100 duration-1000 transform translate-y-20 group-hover:translate-y-0">{"Mobile development"}</h2>
                                    <div class="absolute z-10 inset-0 flex justify-center items-center font-bold text-xl md:text-4xl lg:text-8xl text-primary opacity-100 transition ease-in-out group-hover:opacity-0 duration-1000 translate-y-0 group-hover:-translate-y-20">
                                        <p class="unselectable">{"Stop'Violence"}</p>
                                    </div>

                                </h1>
                            
                            </div>
                        </header>

                    </div>
                    
                    <div className={classNames(scrolled ?"-translate-y-72" :"translate-y-0", "flex flex-row transition ease-in-out duration-1000")}>
                        <div className="flex-auto lg:flex-1 text-white text-center pt-20 flex flex-row">
                            <div className="w-20 md:w-36 lg:w-56 transition-all duration-1000"></div>
                            <div className="w-20 md:w-36 lg:w-56 transition-all duration-1000"></div>
                        </div>
                        <div className="flex-auto">
                            <div className="mt-36 bg-[#58585857] shadow-lg rounded-lg border border-white border-opacity-10 bg-background_100  flex-col">
                                <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Overview 👀</h1>
                                <h2 className="py-20 px-10 text-start text-xl text-white">Stop&apos;Violence is a mobile application to identify the dangers of society in terms of harassment, etc... The project is initiated in the framework of the mobile development course of the Haute-École ARC (Neuchâtel, Switzerland).</h2>

                                <iframe className="px-5" id="ytplayer" type="text/html" width="640" height="360"
                                src="http://www.youtube.com/embed/_wZubFPbSNA?autoplay=1&origin=http://example.com"
                                frameborder="0"/>
                                <h2 className="pt-5 text-start px-10 text-xl text-white">Trailer: don&apos;t forget to turn the volume up!</h2>

                                <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Objective 🎯</h1>

                                <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Technologies Used 🧑‍💻</h1>

                                <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Features ✅</h1>

                                <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">Results 🚀</h1>

                                <h1 className="filter-none text-xl lg:text-4xl font-bold text-white text-bold border-gray-600 mt-10 pt-10 text-start px-10">What I Learn 💪</h1>

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

            </div>
            
        </div>
        
    )
}