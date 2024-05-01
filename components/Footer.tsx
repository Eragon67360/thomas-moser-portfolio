import Link from 'next/link';
import React from 'react'
import profile from '@/public/json/personal_data.json'
import SpotifyNowPlaying from './spotify/SpotifyNowPlaying';
import { FooterText } from './ui/Typography';
import { dataFooter } from '@/lib/data';

export const Footer = () => {
    function getYear() {
        return new Date().getFullYear();
    }
    return (
        <>
            <div className='mx-auto max-w-[80rem] flex justify-center bg-transparent py-8 px-8'>
                <div className='w-full h-[260px] flex flex-col md:flex-row gap-8 justify-between'>
                    <div className='flex flex-col w-full md:w-1/2 order-2 md:order-1 gap-4'>
                        <SpotifyNowPlaying />
                        <FooterText>
                            Content licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target='_blank' className='text-primary hover:underline'>CC BY-NC-SA 4.0.</a>&nbsp;
                            <a href={profile.License} target='_blank' className='text-primary hover:underline'>MIT License</a> © {getYear()} Thomas Moser.
                        </FooterText>
                    </div>
                    <div className='flex justify-between gap-4 md:gap-8 lg:gap-16 text-sm md:text-base order-1 md:order-2'>
                        {dataFooter.map((item) => {
                            return (
                                <div key={item.menu} className='flex flex-col gap-4'>
                                    <p className='uppercase font-bold'>{item.menu.toUpperCase()}</p>
                                    {item.content.map((item, index) => (
                                        <div key={index}>
                                            <Link href={item.href} target={item.target} className='bg-black'>
                                                <p className='font-extralight hover:text-primary hover:underline transition-all duration-200'>
                                                    {item.name}
                                                </p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
