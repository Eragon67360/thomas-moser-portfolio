//Cards for each project
import React from "react";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";


export default function Project2() {
    const title = "Card -- OpenAI"
    return(
        <>
        <NextSeo title={title}/>
        <main>
            <h1 className="text-6xl text-center font-bold">Project 2</h1>
        </main>
        </>
        
    )
}