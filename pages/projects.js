import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import app from "../public/app.png";
import chatgpt from '../public/chatgpt.png';
import musescore from '../public/musescore.png';
import portfolio from '../public/portfolio.png';
import { motion } from 'framer-motion';

function Projects() {

    const projects = [
        {
            title: "Stop'Violence",
            explanation: "An Android app to help people, especially women, wherever they are. Developped with Android Studio (Java) and Love 💜.",
            screenshot: app,
            link: 'projects/project1',
            code:['Java', 'XML'],
        },
        {
            title: "OpenAI Clone",
            explanation: "A ChatGPT and DALL·E clone in one tool. Developped with Flet (Flutter for Python) and OpenAI API.",
            screenshot: chatgpt,
            link: 'projects/project2',
            code:['Python', 'Flutter'],
        },
        {
            title: "Musescore",
            explanation: "Music creation with Musescore. Arrangements of existing songs/musics for duets, orchestra, etc...",
            screenshot: musescore,
            link: 'projects/project3',
            code:[],
        },
        {
          title: "Portfolio",
          explanation: "An interactive portfolio made with Next.JS and TailwindCSS",
          screenshot: portfolio,
          link: '/',
          code:['Next.JS', 'TailwindCSS', 'Vercel'],
      },
        
      ];


    return(
        <>
            <Head>
                <title>Projects</title>
                <meta name="description" content="Projects - portfolio" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <motion.main
                initial='pageInitial'
                animate='pageAnimate'
                variants={{
                pageInitial: { opacity: 0 },
                pageAnimate: { opacity: 1 },
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="font-montserrat flex flex-col text-slate-200">
                <div className='px-20 py-[2vw] z-0 fixed'>
                    <div className="unselectable py-[1vh] text-[5vw] font-bold">My projects</div>                
                    <div className="py-[2vw] text-[3vw] lg:text-4xl ">Here is a brief summary of the projects I have done in various fields.</div>

                </div>
                
            
            
                <div className='z-10 rounded-t-3xl px-8 bg-gradient-to-br from-background to-purple-800 py-8 mt-[30vw] align-middle grid grid-cols-1 gap-5 md:gap-10'>
                {projects.map((item, index) => (
                    <a key={index} className=' mb-5 max-w-none flex-none items-center justify-between lg:flex lg:flex-row-reverse'>
                    <div className='py-5 w-fit overflow-hidden rounded-md bg-background_100 lg:ml-10'>
                        <div className='group relative z-0 items-center'>
                        <Link href={item.link} target={item.target}>
                            <Image
                            className='rounded-sm relative z-10 brightness-100 transition transition-brightness ease-in-out group-hover:brightness-50 group-hover:opacity-70 group-hover:scale-95 duration-300'
                            src={item.screenshot}
                            width={'888'}
                            height={'500'}
                            alt={item.title}
                            
                            />
                            <div className="absolute inset-0 -translate-x-20 flex justify-center items-center z-10 opacity-0 transition ease-in-out group-hover:opacity-100 group-hover:scale-110 group-hover:translate-x-0 duration-300">
                                <p className="unselectable text-md md:text-lg lg:text-3xl">View project</p>
                            </div>

                        </Link>
                        
                        </div>
                    </div>

                    <div className='text-center md:text-start py-5 align-middle lg:w-[900px] relative z-0 transition ease-in-out translate-x-16 duration-300'>
                        <div >
                        <h3 className='py-5 md:text-3xl lg:text-5xl font-bold'>
                            {item.title}
                        </h3>
                        <p className='text-gray-400 md:text-xl lg:text-2xl'>{item.explanation}</p>
                        <div className='mb-8 flex flex-wrap flex-row py-5'>
                            {item.code.map((item,index)=>(
                            <main key={index} className='align-middle flex flex-row'>
                                <div className='m-auto object-center px-2'>
                                <div className="circle"></div>
                                </div>
                                
                                <div className='align-middle md:text-xl lg:text-2xl pl-0 pr-3'>{item}</div>

                            </main>
                            


                            ))}
                        </div>
                        </div>
                    </div>
                    </a>
                ))}
                </div>


        </motion.main>
        </>
    )
};

export default Projects;