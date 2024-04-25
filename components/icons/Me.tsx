import React, { useContext } from 'react';
import Image from 'next/image';
export const Me = () => {

    return (
        <Image src={'/logos/logo.svg'} alt='Logo' width={42} height={42}/>
    );
};