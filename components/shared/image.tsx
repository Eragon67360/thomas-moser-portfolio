'use client';

import React, { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { usePathname } from 'next/navigation';

export type Props = {
    src: string;
} & ImageProps;

const Image: React.FC<Props> = ({ src, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const pathname = usePathname();

    const onLoadCallback = () => {
        setIsReady(true);
    };

    const convertToWebp = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
    const source = `https://res.cloudinary.com/dluezegi8/image/upload/v1714491226/images/upload${convertToWebp}`;
    return (
        <>
            <figure
                className={`${className ? className : 'rounded-md'
                    } flex overflow-hidden`}
            >
                <NextImage
                    src={source}
                    onClick={() =>
                        (pathname === '/blog/[slug]' || pathname === '/projects/[slug]') &&
                        setIsOpen(true)
                      }
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    placeholder='blur'
                    width={1920}
                    height={1080}
                    blurDataURL={source}
                    className={`${!isReady && 'animate-pulse bg-zinc-600'} ${className ? className : 'rounded-md'
                        }`}
                    {...props}
                    onLoadingComplete={onLoadCallback}
                    unoptimized={true}
                />
                {isOpen && (
                    <Lightbox
                        slides={[
                            {
                                src: source.replace(
                                    '/c_limit%2Cf_auto%2Cfl_progressive%2Cq_75%2Cw_800',
                                    '',
                                )
                            },

                        ]}
                        close={() => setIsOpen(false)}
                    />
                )}
            </figure>
        </>
    );
};

export default Image;
