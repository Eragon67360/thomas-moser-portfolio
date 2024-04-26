'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { IoIosArrowRoundUp } from 'react-icons/io';
import Spline from '@splinetool/react-spline';

const ScrollToTopButton: React.FC = () => {
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <button
                onClick={scrollToTop}
                className={`z-20 scale-50 md:scale-75 lg:scale-80 xl:scale-100 fixed bottom-5 right-5 w-32 h-32 transition-all duration-250 ${isVisible ? 'opacity-100 cursor-pointer hover:md:scale-80 hover:lg:scale-85 hover:xl:scale-110 hover:scale-[.55]' : 'opacity-0 cursor-default'}`}
                aria-label="Scroll to top"
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <Spline className='w-full h-full' scene="https://prod.spline.design/iAkJ9isUIS3gwwqc/scene.splinecode" />

                </Suspense>
            </button>


        </>

    );
};

export default ScrollToTopButton;
