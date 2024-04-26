import React, { ReactNode } from 'react'

interface TypographyProps {
    children: ReactNode;
}

export const H1: React.FC<TypographyProps> = ({ children }) => {
    return <h1 className='transition-all duration-250 text-center mb-4 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight leading-none'>{children}</h1>;
};

export const H2: React.FC<TypographyProps> = ({ children }) => {
    return <h2 className='text-center transition-all duration-250 uppercase font-bold text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl'>{children}</h2>;
};

export const H3: React.FC<TypographyProps> = ({ children }) => {
  return <h2 className='w-4/5 text-center transition-all duration-250 text-secondary text-xs md:text-sm lg:text-md xl:text-lg'>{children}</h2>;
};