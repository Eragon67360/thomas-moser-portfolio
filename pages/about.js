import Head from 'next/head'
import Image from 'next/image';
import avatar from "../public/avatar.png";
import { motion } from 'framer-motion';

function About() {
    const skills = [
        {
          name: 'Programming Languages',
          list: ['C/C++','Python','Java', 'JavaScript', 'VHDL'],
        },
        {
          name: 'Mobile Development',
          list: ['Java (Android Studio)', 'Flutter (Learning)'],
        },
        {
          name: 'Backend Development',
          list: ['Next.js API', 'Firebase'],
        },
        {
          name: 'Web Development',
          list: ['HTML & CSS', 'Tailwind CSS', 'Next.js'],
        },
        {
          name: 'Tools software',
          list: ['VSCode','Qt Framework', 'Git', 'Spyder', 'Android Studio', 'Canva'],
        },
        {
            name: 'Tools hardware',
            list: ['Quartus', 'Vitis/Vivado', 'STMCube', 'Eclipse'],
          },
      
        {
          name: 'Hosting',
          list: ['Vercel'],
        },
        {
            name: 'Music and Video',
            list: ['Musescore', 'Audacity', 'Premiere Pro', 'After Effect', 'Blender'],
          },
      ];

    return(
        <>
            <Head>
                <title>About</title>
                <meta name="description" content="About - portfolio" />
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
                    <div className="unselectable py-[1vh] text-[5vw] font-bold">About me</div>
                </div>

                <div className='z-10 rounded-t-3xl px-8 bg-gradient-to-br from-background via-purple-800 to-primary/40 py-8 mt-[18vw] align-middle transition-all ease-in-out duration-300'>

                    <h1 className='text-center text-xl md:text-3xl lg:text-5xl text-white font-bold transition-all ease-in-out duration-300'>Who am I?</h1>
                    <div className="text-center text-lg md:text-xl lg:text-2xl pb-10 leading-8 text-gray-400 transition-all ease-in-out duration-300">Here are my professional background, accomplishments and personal values.</div>

                    <div className='py-10 -pt-5 bg-[#58585857] shadow-lg rounded-lg border border-white border-opacity-10 bg-background_100 p-5'>
                        <div className='relative float-left mr-4 w-[150px]'>
                            <Image
                                src={avatar}
                                className='float-left square rounded-sm md:rounded-md'
                                
                                alt={'Thomas Moser'}
                            />
                        </div>            
                    
                        <div className='text-md md:text-lg lg:text-xl'>
                            
                            <p >
                                {`Hello! I'm Thomas Moser. I was born in Madagascar and raised in France. I am currently working freelance as a software
                                    developer in Germany while studying at the `}
                                <a
                                className='font-medium text-primary underline '
                                href='https://www.hs-offenburg.de/'
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                University of Applied Sciences Offenburg.
                                </a>
                            </p>
                            <p className='mb-5 '>
                                I&apos;ve been attracted by the world of technology
                                since I was in studies.{' '}
                                <a
                                className='font-medium text-primary underline '
                                href='https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html'
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                C
                                </a>{' '}
                                and the{' '}
                                <a
                                className='font-medium text-primary underline '
                                href='https://en.cppreference.com/w/'
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                C++
                                </a>{' '}
                                were both new to me at the time. Since then, I&apos;ve primarily
                                worked with{' '}
                                <a
                                className='font-medium text-primary underline'
                                href='https://www.python.org/'
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                Python
                                </a>{' '}
                                and more recently with {' '}
                                <a
                                className='font-medium text-primary underline'
                                href='https://www.javascript.com/'
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                Javascript
                                </a>{' '}

                                on React and {' '}
                                <a
                                    className='font-medium text-primary underline'
                                    href='https://nextjs.org/'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                Next.Js
                                </a>{' '} associated with {' '}
                                <a
                                    className='font-medium text-primary underline'
                                    href='https://tailwindcss.com/'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                TailwindCSS
                                </a>{' '}.
                            </p>
                            <p className='mb-5'>
                                Learning new technologies is essential for me since, in the future,
                                I think illiteracy will be defined as the inability to read
                                programming languages.
                            </p>
                            <p className='mb-5 '>
                                Aside from programming stuff, I enjoy playing video games, —
                                especially Rocket League and FPS — and working with music, I play trumpet/piano and I write music as well.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1 className='pt-20 text-center text-5xl text-white font-bold'>Skillset</h1>
                        <p className='text-center md:text-xl lg:text-2xl pb-10 leading-8 text-gray-400'>
                            {"My skillset is a mix of software, web, mobile and music development."}
                        </p>
                        <div className='my-10'></div>
                        <div className=' grid grid-cols-1 gap-5 sm:grid-cols-3'>
                            {skills.map((item, index) => (
                                <div
                                className='-pt-5 bg-[#58585857] shadow-lg rounded-lg border border-white border-opacity-10 bg-background_100 p-5'
                                key={index}
                                >
                                <h2 className='mb-5 -mt-0.5 sm:text-lg md:text-xl lg:text-2xl font-bold text-white'>
                                    {item.name}
                                </h2>
                                {item.list.map((item, index) => (
                                    <p className='sm:text-md md:text-lg lg:text-xl my-2 text-gray-300' key={index}>
                                    · {item}
                                    </p>
                            ))}
                        </div>
                        ))}
                    </div>
                    </div>

                </div>
            </motion.main>
        </>
    )
};

export default About;