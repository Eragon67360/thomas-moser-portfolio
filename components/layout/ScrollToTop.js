import { useEffect, useState } from 'react'
import { BiArrowFromBottom } from 'react-icons/bi'


export const ScrollToTop = () => {

    var classNames = require('classnames');
    const [isVisible, setIsVisible] = useState(false)
    const [isBottom, setIsBottom] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
        if(document.height == window.pageYOffset + window.innerHeight){
            setIsBottom(true)
        } else {
            setIsBottom(false)
        }    
    }
   
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)

        return () => {
        window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <div className={classNames(isBottom ? "lg:bottom-20":"lg:bottom-2" ,"fixed right-2 lg:right-4")}>
        <button
            type="button"
            onClick={scrollToTop}
            className={classNames(
            isVisible ? 'opacity-100' : 'opacity-0',
            'bg-gray-700 hover:bg-white focus:ring-gray-700 inline-flex items-center rounded-full p-3 text-white hover:text-gray-700 shadow-lg transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2',
            )}
        >
            <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
        </button>
        </div>
    )
}