import Head from 'next/head';
import React, {useEffect} from "react";
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillTwitterCircle, AiFillYoutube, AiFillGithub, AiOutlineInstagram, AiOutlineLinkedin} from 'react-icons/ai';
import {SiMusescore,SiLinktree} from 'react-icons/si';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { ScrollToTop } from '../components/layout/ScrollToTop'
import { Name } from '../components/layout/name';

import Image from 'next/image';
import eragon from '../public/eragon.png';

import CV from '../public/CV_Thomas_MOSER.pdf';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import { motion,mount } from "framer-motion";


const DynamicHeader = dynamic(() => import('../components/header'), {
  ssr: false,
});

const About = dynamic(() => import('../components/about'), {
  ssr: false,
});

const Skillset = dynamic(() => import('../components/skillset'), {
  ssr: false,
});

const Projects = dynamic(() => import('../components/projects'), {
  ssr: false,
});


const DynamicPlayer = dynamic(() => import('../components/player'), {
  ssr: false,
});
const DynamicGames = dynamic(() => import('../components/games'), {
  ssr: false,
});

const DynamicDeezerProfile = dynamic(() => import('../components/deezeruser'), {
  ssr: false,
});

const DynamicDeezerHistory = dynamic(() => import('../components/deezerhistory'), {
  ssr: false,
});


export default function Portfolio({}) {
  console.log();
  
  const [darkMode, setDarkMode] = useState(true);
  const [menu1, setMenu1] = useState(true);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);
  const [menu4, setMenu4] = useState(false);
  const [menu5, setMenu5] = useState(false);

  

  const slides = [
    {
      url: '/../public/app.png', title: "Stop' Violence", style: "text-center font-bold text-[#9369a5] text-xl md:text-3xl py-10 px-5", explanation: 'An Android app to help people, especially women, wherever they are. Developped with Android Studio (Java) and Love.',
    },
    {
      url: '/../public/web2.png', title: "OpenAI Clone", style: "text-center font-bold text-white text-gray-600 text-xl md:text-3xl py-10 px-5", explanation: 'AnChatGPT and DALL·E clone in one tool. Developped with Flet (Flutter for Python) and OpenAI API.',
    },
    {
      url: '/../public/musescore.png', title: "Musescore", style: "text-center font-bold text-yellow-500 text-xl md:text-3xl py-10 px-5", explanation: 'Music creation with Musescore. Arrangements of existing songs/musics for duets, orchestra, etc...',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  var classNames = require('classnames');
  const [isVisible, setIsVisible] = useState(false)
  const [iScrollLevel, setScroll] = useState(0)

    const toggleVisibility = () => {
        if (window.pageYOffset > 90) {
        setIsVisible(true);
        } else {
        setIsVisible(false);
        }
    }
    
    const scrollLevel = () => {
      if (window.pageYOffset < 300) {
        setScroll(0);
      } else if (window.pageYOffset < 450){
        setScroll(1);
      }
      else if (window.pageYOffset < 700){
        setScroll(2);
      }
      else if (window.pageYOffset < 800){
        setScroll(3);
      }
    }
    var logosClass = classNames((iScrollLevel==0)?'transition translate-y-0 duration-500':(((iScrollLevel==1)?'transition translate-y-16 duration-500' : (((iScrollLevel==2)?'transition translate-y-96 duration-500' : 'transition translate-y-96  duration-500')))),'text-5xl flex flex-wrap justify-center gap-16 py-3');

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

    const icon = {
      hidden: {
        pathLength: 0,
        fill: "rgba(255, 255, 255, 0)"
      },
      visible: {
        pathLength: 1,
        fill: "rgba(255, 255, 255, 1)"
      }
    }
  

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        window.addEventListener('scroll', scrollLevel);

        return () => {
        window.removeEventListener('scroll', toggleVisibility);
        window.removeEventListener('scroll', scrollLevel)
        }
    }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Head>
        <title>Thomas Moser Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-transparent overflow-auto '>
        <ScrollToTop />
        <Name/>
        <DynamicHeader />
        <main className='snap-y snap-mandatory bg-fixed px-10 md:px-20 lg:px-40 bg-gradient-to-tl from-purple-900 via-sky-900 to-black text-white '>          
          <motion.section 
            initial={{scale: 1}}
            animate={{scale: [1,1.2,1]}}
            transition={{
              duration: 1,
            }} 
            id='home' className='snap-center min-h-screen'>
            <div className='py-10'></div>
            <div className='text-center p-10 '>
              <h2 className={classNames(isVisible ?  'opacity-0 transition-{text} -translate-x-96 ease-in-out duration-1000 text-xl md:text-3xl lg:text-4xl' : 'opacity-100 transition-{text} translate-x-0 ease-in-out duration-1000 text-3xl md:text-6xl lg:text-7xl', 'unselectable inline-block py-2 bg-gradient-to-tr from-teal-500 via-violet-800 to-amber-300 text-transparent bg-clip-text font-bold ')}>Thomas Moser</h2>
              <h3 className=' py-2 md:text-3xl lg:text-4xl'>Developer and Apprentice Designer</h3>
              <p className='text-md py-5 leading-8 text-white md:text-xl lg:text-2xl max-w-lg mx-auto'>
                Developer providing services for programming in embedded systems, software development...
                And so much more!
              </p>
            </div>            
            <div             
              className="flex flex-wrap justify-center gap-12 lg:gap-5 py-3">
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
            
            
            <div 
                className='shadow-lg relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 overflow-hidden md:h-96 md:w-96'>
              <motion.div
                animate={{y: [500,-80,300,-40,150,-25,50,-15,25,-5,10,0]}}
                transition={{
                  ease: "easeInOut",
                  delay: 1,
                  duration: 3,
                }}
                >
                <Image src={eragon} alt="Avatar"/>

              </motion.div>
              

            </div>
          </motion.section >
          
          <section id='know' className='pt-30' >
            <div className='text-center'>
              <h3 className='unselectable text-center inline-block text-3xl md:text-6xl lg:text-7xl py-4 bg-gradient-to-tr from-teal-500 via-violet-800 to-amber-300 text-transparent bg-clip-text'>About me</h3>
              
              
            </div>
            <About/>
            <Skillset/>
          </section>
          <div className='py-20'></div>
          
          <section id='portfolio' className='snap-center py-30'>
            
            <div className='text-center'>
              <h3 className='unselectable inline-block text-3xl md:text-6xl lg:text-7xl py-4 bg-gradient-to-tr from-teal-500 via-violet-800 to-amber-300 text-transparent bg-clip-text'>Projects</h3>            
            </div>
            <Projects/>
            
          </section>

          <section id='activities' className='snap-start pt-30'>
            <div className='text-center'>
              <h3 className=' unselectable inline-block text-3xl md:text-6xl lg:text-7xl py-4 bg-gradient-to-tr from-teal-500 via-violet-800 to-amber-300 text-transparent bg-clip-text'>Activities</h3>
            </div>
            <h1 className='text-center text-4xl text-white py-5 font-bold'>What I play</h1>
            <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>My status.</p>
            <DynamicPlayer/>
            <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>The games I recently played.</p>
            <DynamicGames/>
            <h1 className='text-center mt-24 text-4xl text-white py-5 font-bold'>What I&apos;m currently listening to.</h1>
            
            <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>My status.</p>
            <DynamicDeezerProfile/>
            <p className='text-md my-4 text-center font-bold text-gray-400 sm:text-xl'>My last listened songs.</p>
            <DynamicDeezerHistory className="flex items-center justify-center h-screen"/>            
            <div className='pt-100'>

            </div>

          </section>
          <section id='contact' className='snap-start pt-30'>
            <div className='text-center'>
              <h1 className='inline-block text-3xl md:text-6xl lg:text-7xl py-4 bg-gradient-to-tr from-teal-500 via-violet-800 to-amber-300 text-transparent bg-clip-text'>Contact</h1>
              <div className='text-md py-2 leading-8 text-white'>
                How to reach me.

              </div>
              <div>
                <span className='font-bold'>Email</span> : click <a className='underline ' href="mailto: thomas-moser@orange.fr">here</a> to contact me per email.
              </div>
            
            </div>

          </section>

          <section id='resume' className='snap-start pt-30'>
            <div className='text-center'>
              <h1 className='inline-block text-3xl md:text-6xl lg:text-7xl py-4 bg-gradient-to-tr from-teal-500 via-violet-800 to-amber-300 text-transparent bg-clip-text'>Resume</h1>
              <div className=' items-center text-center'>
                
                <a href="CV_Thomas_MOSER.pdf"
                  alt="alt text"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                  <span>Download resume</span>
                </button>
                </a>
              </div>
            
            </div>

          </section>
          <div className=' h-20'></div>
          
        </main>

        <footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800">
          <span className="text-sm sm:text-center text-gray-400">© 2023 <a href="https://github.com/Eragon67360" className="hover:underline">Eragon67360</a>. All Rights Reserved.</span>
          <span className="text-sm sm:text-center text-gray-400">Location: Strasbourg, FRANCE</span>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </footer> 
      </div>
    </motion.div>
  )
  
}
