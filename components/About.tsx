import React from 'react'
import { H2,H3 } from './ui/Typography';
import { HorizontalDivider } from './ui/HorizontalDivider';

const About = () => {
  return (
    <>
      <section id='about' className='py-8 w-full max-w-[1440px] px-8'>
        <div className='flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
          <H2>About me</H2>
          <H3>Full-Stack Developer</H3>

          <p className="text-lg leading-7 mb-4">
                My name is Thomas Moser, a passionate software developer with a Bachelor&apos;s degree in Engineering, specializing in Computer Science and Communication Systems from Haute-École ARC in Neuchâtel, Switzerland.
                I have also completed a Bachelor in Electrical Engineering and Information Technology at Fachhochschule Offenburg in Germany, and a DUT in Electrical Engineering and Industrial Computing from the University Institute of Technology in Haguenau, France.
            </p>
            <p className="text-lg leading-7 mb-4">
                With extensive experience in both software and web development, I am proficient in a variety of programming languages and technologies including C/C++, Python, C#, HTML, CSS, JavaScript/TypeScript, React (NextJS), TailwindCSS, Bootstrap, and PHP.
                I am also skilled in using development tools such as Visual Studio, VS Code, QT IDE, Eclipse, and Notepad++, as well as version control systems like GitHub and GitLab.
            </p>
            <p className="text-lg leading-7 mb-4">
                I am fluent in German (C2) and English (C1), and have a strong passion for music, playing the trumpet since 2006 and the piano since 2010. I am currently seeking opportunities in software or web/mobile development.
            </p>
        </div>
      </section>
    </>
  )
}

export default About