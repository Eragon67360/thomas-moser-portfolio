import React, { } from "react";
import MostViewedPages from "./MostViewedPages";
import HeroComponent from "./HeroComponent";

const Hero = () => {
    return (
        <>
            <div className="prose prose-invert my-8 max-w-none flex-none items-center space-x-0 text-white prose-a:no-underline sm:my-16 md:my-20 lg:flex lg:space-x-8 xl:my-24">
                <HeroComponent/>
                <MostViewedPages />                
            </div>
        </>
    );
}

export default Hero