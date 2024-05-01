'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDetectAdBlock } from 'adblock-detect-react';
import { IoWarningOutline } from 'react-icons/io5';

type AdBannerType = {
  dataAdLayout: string,
  dataAdSlot: string,
  dataAdFormat: string,
  dataFullWidthResponsive: boolean
}

const AdBanner = ({ dataAdLayout, dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdBannerType) => {
  const adUniqueId = uuidv4();
  const adblock = useDetectAdBlock();

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }, []);

  return (
    <>
      {adblock ? (
        <div className='mt-4 rounded-md bg-[#FBBD23] bg-opacity-20 p-4'>
          <div className='flex items-center space-x-2'>
            <IoWarningOutline className='text-xl' />
            <span className='font-bold text-white'>Warning!</span>
          </div>
          <p className='font-light text-gray-200'>
            Please disable your adBlock to support our site and free contents
            from jagad.dev
          </p>
        </div>
      ) : (
        <div className='mt-4'>
          <ins className='adsbygoogle'
            style={{
              display: "block",
              margin: '6px !important',
              textAlign: "center"
            }}
            data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
            data-ad-layout={dataAdLayout}
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
            key={adUniqueId}
          />
        </div>
      )}
    </>

  )
}

export default AdBanner