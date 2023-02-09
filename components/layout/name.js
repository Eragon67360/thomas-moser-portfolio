import { useEffect, useState } from 'react'


export const Name = () => {

    var classNames = require('classnames');
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 90) {
        setIsVisible(true)
        } else {
        setIsVisible(false)
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)

        return () => {
        window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <div className="fixed top-12 left-5 ">
            <a href='https://linktr.ee/thomasmoser' className={classNames(isVisible ? 'opacity-100 pointer-events transition-{text} translate-x-0 ease-in-out duration-1000 text-xl md:text-3xl lg:text-4xl' : 'opacity-0 pointer-events-none transition-{text} translate-x-96 ease-in-out duration-1000 text-md md:text-lg lg:text-xl','bg-gradient-to-tr from-teal-300 via-violet-600 to-amber-300 text-transparent bg-clip-text font-bold ')}>Thomas</a>
        
        </div>
    )
}