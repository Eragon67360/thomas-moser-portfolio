//Cards for each project
import React from "react";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { AnimatedName } from '../../components/layout/project1_float'
import { motion } from "framer-motion"
import YouTube from "react-youtube";
import { render } from "react-dom";


function hideReader() {
    console.log("hide")
    var x = document.getElementById("reader");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

export function VideoReader(){

    const _onReady = (event) => {
        event.target.pauseVideo();
    }
    const opts = {
        height: "540",
        width: "960",
        playerVars: {
            autoplay: 1,
        },
    };
    var classNames = require('classnames');
    const [videoVisible, setVideoVisibility] = useState(false);

    const toggleReader = (e) => {
        e.preventDefault();
        setVideoVisibility(!videoVisible);
        };

    const variants = {
        enter: {y:0, transition: { ease: "circOut", duration: 1 }},
        exit: {y:1300, transition: { ease: "circIn", duration: 1 }},
    }

    
    return (
        <>
        <motion.div
            initial={false}
            variants={variants}
            animate={videoVisible?'enter':'exit'}

        id="videoreader" className={classNames(videoVisible?"flex":"flex","z-20 flex-col fixed transition-all ease-in-out ")}>
            <button onClick={() => {setVideoVisibility(false)}} className="bg-transparent z-20 opacity-90 text-white text-end p-5 hover:text-primary font-montserrat">
                Close
            </button>
            <div id="reader" className={`fixed z-10 flex flex-col h-screen w-screen bg-gray-600/75`}>
                <div className="z-20 m-auto bg-none">
                    <YouTube className="" videoId="_wZubFPbSNA" 
                        opts={opts} onReady={_onReady} />

                </div>
                
            </div>
        </motion.div>
        
        <div className={classNames(videoVisible?"":"","fixed bottom-0 left-0 z-10")}>
            <div className='w-screen h-20 flex bg-slate-800'>
                <div className="flex-auto"></div>
                <span className='text-gray-200 text-lg flex-initial mx-10 my-auto'>{"Stop'Violence is part of a greater project: make the world better and safer."}</span>
                <div className="flex flex-col flex-initial mx-10 my-auto group">
                    <button onClick={() => {setVideoVisibility(true)}} className='text-gray-200 text-lg '>Check out our launch video</button>
                    <span className="align-top w-full text-center border-t border-t-primary transition-all group-hover:translate-x-56 group-hover:w-0"></span>


                </div>
                
                <div className="flex-auto"></div>
            </div>
            
        </div>
        </>
    )
}