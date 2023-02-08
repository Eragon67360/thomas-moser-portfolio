import 'tw-elements'
import Image from 'next/image';

import avatar from "../public/avatar.png";
import { NextSeo } from 'next-seo';
import design from '../public/design.png';
import tools from '../public/tools.png';
import music from '../public/music.png';
import code from '../public/code.png';



export default function Skillset(props) {
    const title = 'Skillset';
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
    )
}