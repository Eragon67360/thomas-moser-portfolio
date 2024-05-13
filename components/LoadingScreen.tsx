'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@nextui-org/react';
import InteractiveImage from './InteractiveImage';

const LoadingScreen = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        requestAnimationFrame(animate);
        const interval = setInterval(() => {
            setValue((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(interval);
                    return 100;
                }
                return Math.min(oldProgress + 2, 100);
            });
            updateImageSplit(value);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    function updateImageSplit(percentage: number) {
        const container = document.querySelector('.image-container');
        if (container instanceof HTMLElement) {
            // Calculate the left starting point of the colored part
            container.style.setProperty('--left', `${percentage}%`);
            // Adjust width of the colored part
            container.style.setProperty('--width', `${100 - percentage}%`);
        } else {
            console.error('Element with class "image-container" not found.');
        }
    }
    let percentage = 0;
    let increasing = true;

    function animate() {
        // Update the percentage based on direction
        if (increasing) {
            percentage++;
            if (percentage >= 100) increasing = false;
        }

        updateImageSplit(percentage);
        requestAnimationFrame(animate);
    }


    return (
        <div className="absolute top-0 left-0 z-40 flex flex-col items-center justify-center min-h-screen bg-gradient-radial from-[#322e15] to-[#16181d] text-white w-screen h-screen">
            <motion.img
                src="/img/code.jpg"
                className="mb-4 w-24 h-24"
                initial={{ filter: "grayscale(100%)" }}
                animate={{ filter: `grayscale(${100 - value}%)` }}
                transition={{ duration: 0.5 }}
            />
            <div className="image-container">
                <img className="image-grey" src="/public/img/cool.webp" />
            </div>
            <Progress
                aria-label="Downloading..."
                size="sm"
                value={value}
                color="success"
                classNames={{
                    indicator: "bg-gradient-to-r from-pink-500 to-primary",
                }}

                showValueLabel={true}
                className="max-w-md"
            />
            <p>{`Web developer - Loading ${value}%`}</p>
        </div>
    );
};

export default LoadingScreen;
