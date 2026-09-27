"use client";
import { useDetectAdBlock } from "adblock-detect-react";
import { useEffect } from "react";
import { IoWarningOutline } from "react-icons/io5";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdBannerProps = {
  dataAdLayout: string;
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

/** In-article AdSense unit, usable from MDX as `<AdBanner ... />`. */
export function AdBanner({ dataAdLayout, dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdBannerProps) {
  const adBlockDetected = useDetectAdBlock();

  useEffect(() => {
    if (adBlockDetected) return;
    try {
      (window.adsbygoogle ??= []).push({});
    } catch (error) {
      console.error(error);
    }
  }, [adBlockDetected]);

  if (adBlockDetected) {
    return (
      <div className="mt-4 rounded-md bg-warning/20 p-4">
        <div className="flex items-center gap-2">
          <IoWarningOutline className="text-xl" aria-hidden />
          <span className="font-bold text-white">Warning!</span>
        </div>
        <p className="font-light text-gray-200">
          Please disable your adBlock to support my website and free contents from thomasmoserdev.com
        </p>
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle mt-4 block text-center"
      data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
      data-ad-layout={dataAdLayout}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={String(dataFullWidthResponsive)}
    />
  );
}
