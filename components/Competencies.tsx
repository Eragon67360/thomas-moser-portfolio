import React from 'react'
import { H2, H3 } from './ui/Typography'
import { HorizontalDivider } from './ui/HorizontalDivider'

const Competencies = () => {
  return (
    <>
      <div id='competencies' className='py-8 w-full max-w-[1440px] px-8'>
        <div className='flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
          <H2>Competencies</H2>
          <H3>My cross-disciplinary and technical skills </H3>

          <div className="w-full max-w-4xl">
            <h3 className="text-2xl font-semibold mb-2">Programming Languages</h3>
            <ul className="list-disc pl-8 mb-4">
              <li>C/C++</li>
              <li>Python</li>
              <li>C#</li>
              <li>HTML, CSS</li>
              <li>JavaScript/TypeScript</li>
              <li>React (NextJS)</li>
              <li>TailwindCSS, Bootstrap</li>
              <li>PHP</li>
            </ul>
            <h3 className="text-2xl font-semibold mb-2">Software and Tools</h3>
            <ul className="list-disc pl-8 mb-4">
              <li>Visual Studio, VS Code</li>
              <li>QT IDE, Eclipse, Notepad++</li>
              <li>GitHub, GitLab</li>
              <li>Confluence, Gantt</li>
              <li>Office Suite, Canva</li>
              <li>Adobe Suite (After Effects, Premiere Pro)</li>
            </ul>
            <h3 className="text-2xl font-semibold mb-2">Languages</h3>
            <ul className="list-disc pl-8 mb-4">
              <li>German: C2 (Oral and Written)</li>
              <li>English: C1 (Oral and Written)</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}

export default Competencies;