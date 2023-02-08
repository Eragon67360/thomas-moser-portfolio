import { useEffect, useState } from 'react'
import { BiArrowFromBottom } from 'react-icons/bi'


export const AnimatedName = () => {

    var classNames = require('classnames');
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
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
        <div className={classNames(
            isVisible ? 'opacity-0 md:opacity-100' : 'opacity-0',"fixed bottom-10 left-10 transition-opacity duration-500")}>
        <div className="unselectable flex-1 text-white text-center pt-20">
            <h1 className="pulse1 text-xl lg:text-3xl font-bold text-center text-violet-500">{"Stop' Violence"}</h1>
            <h1 className="pulse2 text-xl lg:text-3xl font-bold text-center text-indigo-500">{"Stop' Violence"}</h1>
            <h1 className="pulse3 text-xl lg:text-3xl font-bold text-center text-blue-500">{"Stop' Violence"}</h1>
            <h1 className="pulse4 text-xl lg:text-3xl font-bold text-center text-green-500">{"Stop' Violence"}</h1>
            <h1 className="pulse5 text-xl lg:text-3xl font-bold text-center text-yellow-400">{"Stop' Violence"}</h1>
            <h1 className="pulse6 text-xl lg:text-3xl font-bold text-center text-orange-500">{"Stop' Violence"}</h1>
            <h1 className="pulse7 text-xl lg:text-3xl font-bold text-center text-red-500">{"Stop' Violence"}</h1>
        </div>
        </div>
    )
}