import Link from 'next/link';
import React from 'react'
import profile from '@/public/json/personal_data.json'
import SpotifyNowPlaying from './spotify/SpotifyNowPlaying';
import { FooterText } from './ui/Typography';
export const Footer = () => {
    function getYear() {
        return new Date().getFullYear();
    }
    return (
        <>
            <div className='w-full flex justify-center bg-transparent border-t border-gray-500/30 py-4 px-8'>
                <div className='max-w-[1440px] w-full h-[260px] flex flex-col md:flex-row gap-8 justify-between'>
                    <div className='flex flex-col w-full md:w-1/2 order-2 md:order-1 gap-4'>
                        <SpotifyNowPlaying />
                        <FooterText>
                            Content licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target='_blank' className='text-primary hover:underline'>CC BY-NC-SA 4.0.</a>&nbsp;
                            <a href="https://github.com/Eragon67360/thomas-moser-portfolio/blob/main/LICENSE.md" target='_blank' className='text-primary hover:underline'>MIT License</a> © {getYear()} Thomas Moser.
                        </FooterText>
                    </div>
                    <div className='flex justify-between gap-4 md:gap-8 lg:gap-16 text-sm md:text-base order-1 md:order-2'>
                        <div className='flex flex-col gap-4'>
                            <p className='uppercase font-bold'>Social</p>
                            <Link href={profile.Github} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Github</Link>
                            <Link href={profile.Instagram} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Instagram</Link>
                            <Link href={profile.LinkedIn} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>LinkedIn</Link>
                            <Link href={profile.Youtube} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Youtube</Link>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className='uppercase font-bold'>General</p>
                            <Link href={'/'} className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Home</Link>
                            <Link href={'/#about'} className='font-extralight hover:text-primary hover:underline transition-all duration-200'>About</Link>
                            <Link href={'/#projects'} className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Projects</Link>
                            <Link href={'/activities'} className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Activities</Link>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className='uppercase font-bold'>Extra</p>
                            <Link href={'/pdf/CV_Thomas_MOSER.pdf'} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Resume</Link>
                            <Link href={'/not-built'} className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Analytics</Link>
                            <Link href={'https://github.com/Eragon67360/thomas-moser-portfolio.git'} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Source code</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
