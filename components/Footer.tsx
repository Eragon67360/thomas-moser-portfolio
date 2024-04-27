import Link from 'next/link';
import React from 'react'
import profile from '@/public/json/personal_data.json'
export const Footer = () => {
    function getYear() {
        return new Date().getFullYear();
    }
    return (
        <>
            <div className='w-full flex justify-center bg-transparent'>
                <div className='max-w-[1440px] w-full h-[260px] flex justify-between'>
                    <div className='flex flex-col'>
                        <p className='text-sm'>
                            Content licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target='_blank' className='text-primary hover:underline'>CC BY-NC-SA 4.0.</a>&nbsp;
                            <a href="https://github.com/Eragon67360/thomas-moser-portfolio/blob/main/LICENSE.md" target='_blank' className='text-primary hover:underline'>MIT License</a> © {getYear()} Thomas Moser.</p>
                    </div>
                    <div className='flex justify-evenly gap-16'>
                        <div className='flex flex-col gap-4'>
                            <p className='uppercase font-bold'>Social</p>
                            <Link href={profile.Github} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Github</Link>
                            <Link href={profile.Instagram} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Instagram</Link>
                            <Link href={profile.LinkedIn} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>LinkedIn</Link>
                            <Link href={profile.Youtube} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Youtube</Link>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className='uppercase font-bold'>General</p>
                            <Link href={'/'} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Home</Link>
                            <Link href={'/#about'} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>About</Link>
                            <Link href={'/#projects'} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Projects</Link>
                            <Link href={'/activities'} target='_blank' className='font-extralight hover:text-primary hover:underline transition-all duration-200'>Activities</Link>
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
