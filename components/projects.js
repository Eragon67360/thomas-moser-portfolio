import 'tw-elements'
import app from "../public/app.png";
import chatgpt from '../public/chatgpt.png';
import musescore from '../public/musescore.png';
import portfolio from '../public/portfolio.png';
import Image from 'next/image';
import Link from "next/link";

export default function Projects(props) {
    const title = 'Projects';

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
            target: "_blank",
            link: 'https://musescore.com/thomas_moser',
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
        <div>
            <p className='text-center text-md md:text-xl lg:text-2xl pb-10 leading-8 text-gray-400'>
                Here is a brief summary of the projects I have done in various fields.
            </p>
            
            <div className='my-10'></div>
              <div className='align-middle grid grid-cols-1 gap-5 md:gap-10'>
              {projects.map((item, index) => (
                  <a key={index} className=' mb-5 max-w-none flex-none items-center justify-between lg:flex lg:flex-row-reverse'>
                  <div className='py-5 w-fit overflow-hidden rounded-md bg-background_100 lg:ml-10'>
                    <div className='group relative z-0'>
                      <Link href={item.link} target={item.target}>
                        <Image
                          className='rounded-sm relative z-10 translate-x-16 lg:translate-x-32 brightness-100 transition transition-brightness ease-in-out group-hover:brightness-50 group-hover:opacity-70 group-hover:scale-95 duration-300'
                          src={item.screenshot}
                          width={'1000'}
                          height={'625'}
                          alt={title}
                          
                        />
                        <div className="absolute inset-0 flex justify-center items-center z-10 opacity-0 transition ease-in-out group-hover:opacity-100 group-hover:scale-110 group-hover:translate-x-20 duration-300">
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


        </div>
    )

}

