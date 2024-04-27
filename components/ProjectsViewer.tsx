import React from 'react'
import app from "@/public/img/app.png";
import chatgpt from '@/public/img/chatgpt.png';
import musescore from '@/public/img/musescore.png';
import curefab from '@/public/img/curefab.png'
import Image from 'next/image';

const ProjectsViewer = () => {
    const projects = [
        {
            title: "Curefab",
            explanation: "An Android app to help people, especially women, wherever they are. Developped with Android Studio (Java) and Love 💜.",
            screenshot: curefab,
            link: 'projects/project1',
            code:['Java', 'XML'],
            from:'#21B79B',
            to:'#2F4858',
        },
        {
            title: "Stop'Violence",
            explanation: "An Android app to help people, especially women, wherever they are. Developped with Android Studio (Java) and Love 💜.",
            screenshot: app,
            link: 'projects/project1',
            code:['Java', 'XML'],
            from:'#efdff7',
            to:'#F9F871'
        },
        {
            title: "OpenAI Clone",
            explanation: "A ChatGPT and DALL·E clone in one tool. Developped with Flet (Flutter for Python) and OpenAI API.",
            screenshot: chatgpt,
            link: 'projects/project2',
            code:['Python', 'Flutter'],
            from:'#efdff7',
            to:'#717171'
        },
        {
            title: "Musescore",
            explanation: "Music creation with Musescore. Arrangements of existing songs/musics for duets, orchestra, etc...",
            screenshot: musescore,
            code:[],
            from:'#efdff7',
            to:'#717171'
        },        
      ];

    return (
        <>
            <section className="mt-12 mx-auto max-w-screen-xl w-screen h-screen transition-all duration-150">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 h-full transition-all duration-150">
                    {
                        projects.map((items, key) => (
                            <div key={key}
                            style={{ background: `linear-gradient(to right, ${items.from}, ${items.to})` }} 
         
                            className={`group w-full aspect-video rounded-3xl pt-8 px-8 transition-all duration-150 hover:px-0 hover:pt-0 hover:shadow-2xl cursor-none`}>
                                <Image src={items.screenshot} className='cursor-none transition-all duration-150 w-full h-full rounded-t-3xl bg-slate-200 shadow-none group-hover:shadow-lg group-hover:rounded-3xl' alt={'Project screenshot'}/>
                            </div>

                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default ProjectsViewer