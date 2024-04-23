'use client'
import React from "react";
import Spline from '@splinetool/react-spline';
import Link from "next/link";
import { Button } from "@nextui-org/react";

const Hero = () => {

    return (
        <>
            <div className="flex h-[100dvh]">
                <div className="mr-auto place-self-center lg:col-span-7 w-3/5">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Thomas Moser - Full-Stack Developer</h1>
                    <h2 className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">Embracing curiosity and a passion for learning, I craft dynamic software and web solutions that drive innovation and efficiency.</h2>
                    <Link href="#about">
                        <Button color="primary" className="inline-flex items-center justify-center text-white text-base font-medium">
                            Get started
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Button>
                    </Link>
                </div>
                <div className=" w-2/5">
                    <Spline className="scale-50" scene="https://prod.spline.design/iAkJ9isUIS3gwwqc/scene.splinecode" />
                </div>

            </div>
        </>
    );
}

export default Hero