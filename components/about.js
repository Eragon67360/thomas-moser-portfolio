import Image from 'next/image';

import avatar from "../public/avatar.png";

export default function About(props) {
    const title = 'About';


    return(
        <div>
            
            <h1 className='text-center text-5xl text-white py-5 font-bold'>Who am I?</h1>
            <p className='text-center text-md md:text-xl lg:text-2xl pb-10 leading-8 text-gray-400'>
                {"Here are my professional background, accomplishments and personal values"}
            </p>
            <main className='py-10 -pt-5 bg-[#58585857] shadow-lg rounded-lg border border-white border-opacity-10 bg-background_100 p-5'>
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


            </main>
        </div>
        
    )
}