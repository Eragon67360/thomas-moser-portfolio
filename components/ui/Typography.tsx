'use client'
import React, { ReactNode, useEffect, useRef } from 'react'
import styles from './TextComponent.module.css'
interface TypographyProps {
    children: ReactNode;
}
interface AutoScrollTextProps {
    text: string;
}


export const H1: React.FC<TypographyProps> = ({ children }) => {
    return <h1 className='transition-all duration-250 text-center mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-primary-500 via-secondary to-indigo-500 inline-block text-transparent bg-clip-text dark:text-white'>{children}</h1>;
};

export const H2: React.FC<TypographyProps> = ({ children }) => {
    return <h2 className='text-center transition-all duration-250 uppercase font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>{children}</h2>;
};

export const H3: React.FC<TypographyProps> = ({ children }) => {
    return <h3 className='w-4/5 text-center transition-all duration-250 text-secondary text-xs md:text-sm lg:text-base xl:text-lg'>{children}</h3>;
};

export const Title: React.FC<TypographyProps> = ({ children }) => {
    return <h3 className='transition-all duration-250 text-sm md:text-base lg:text-lg xl:text-xl'>{children}</h3>;
};

export const FooterText: React.FC<TypographyProps> = ({ children }) => {
    return <h3 className='transition-all duration-250 text-xs lg:text-base'>{children}</h3>;
};

export const TrackText: React.FC<TypographyProps> = ({ children }) => {
    return <p className='transition-all duration-250 text-xs md:text-sm lg:text-base font-semibold truncate'>{children}</p>;
};

export const ArtistText: React.FC<TypographyProps> = ({ children }) => {
    return <p className='transition-all duration-250 text-xs md:text-sm lg:text-base font-light opacity-80 truncate'>{children}</p>;
};

