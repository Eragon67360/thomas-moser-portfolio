import 'tw-elements'
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ai';
import {SiMusescore} from 'react-icons/si';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#know' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'Activites', href: '#activities' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: '#resume' },

];

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}


export default function Header() {
  const router = useRouter();
  var classNames = require('classnames');
  


  const checkSlug = router.pathname.endsWith('/[slug]')
  ? router.pathname.replace('/[slug]', '')
  : router.pathname;

  const [scrolled, setMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const setScrolled = () => {
    if (window.pageYOffset > 20) {
      setMore(true)
    } else {
      setMore(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', setScrolled)

    return () => {
    window.removeEventListener('scroll', setScrolled)
    }
  }, [])

  return (
      <motion.div
        initial={{y: 25, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{
          duration: 0.75,
        }}
      >
      <header className={classNames(scrolled ? 'shadow-xl opacity-90' : 'false opacity-100','w-full backdrop-filter backdrop-blur-lg bg-gradient-to-r from-purple-900 via-sky-900 to-black background-animate fixed z-10 transition-[shadow,opacity] duration-500 ease-in-out')}>
        <div className='max-w-full mx-auto'>
          <div className={classNames(scrolled ? 'py-1 md:py-2' : 'py-2 md:py-4','justify-center flex max-w-screen-xl false mx-auto items-center px-8 transition-p ease-in-out duration-500 ')}>
            <motion.nav className=' flex items-center justify-center'>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
              <div className='hidden text-lg md:text-2xl space-x-3 sm:pr-2 md:ml-10 md:space-x-12 md:pr-4 md:block' id='navbar-default'>
                <ul className="flex flex-col p-4 mt-4 border  rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-transparent ">
                  {navigation.map((item) => (
                    <li>
                      <a legacyBehavior key={item.name} href={item.href}>
                      {item.href === checkSlug ? (
                        <a className='border-b-2 border-primary pb-4 text-white hover:border-primary hover:text-primary'>
                          {item.name}
                        </a>
                      ) : (
                        <a className={classNames(scrolled ? 'pb-1 lg:pb-2' : 'pb-2 lg:pb-4','hover:border-b-2 py-4 text-gray-300 hover:border-primary hover:text-primary transition-[pb] duration-500 ease-in-out')}>{item.name}</a>
                      )}
                    </a>

                    </li>
                    
                  ))}

                </ul>
                
              </div>
            </motion.nav>
          </div>
        </div>

      

    </header>
      </motion.div>

  );

}