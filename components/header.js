import 'tw-elements'
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ai';
import {SiMusescore} from 'react-icons/si';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#know' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'Activites', href: '#activities' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: '#resume' },

];


export default function Header() {
  const router = useRouter();
  var classNames = require('classnames');

  const checkSlug = router.pathname.endsWith('/[slug]')
  ? router.pathname.replace('/[slug]', '')
  : router.pathname;

  const [scrolled, setMore] = useState(false);

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
      <div>
      <header className={classNames(scrolled ? 'shadow-xl opacity-90' : 'false opacity-100','w-full backdrop-filter backdrop-blur-lg bg-gradient-to-r from-purple-900 via-sky-900 to-black background-animate fixed z-10 transition-[shadow,opacity] duration-500 ease-in-out')}>
        <div className='max-w-full mx-auto'>
          <div className={classNames(scrolled ? 'py-1 md:py-2' : 'py-2 md:py-4','justify-center flex max-w-screen-xl false mx-auto items-center px-8 transition-p ease-in-out duration-500 ')}>
            <nav className=' flex items-center justify-center'>
              <div className='text-lg md:text-2xl space-x-3 sm:pr-2 md:ml-10 md:space-x-12 md:pr-4 block'>
                {navigation.map((item) => (
                  <a legacyBehavior key={item.name} href={item.href}>
                    {item.href === checkSlug ? (
                      <a className='border-b-2 border-primary pb-4 text-white hover:border-indigo-400 hover:text-indigo-500'>
                        {item.name}
                      </a>
                    ) : (
                      <a className='hover:border-b-2 pb-2 lg:pb-4 py-4 text-gray-300 hover:border-indigo-400 hover:text-indigo-500'>{item.name}</a>
                    )}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

      

    </header>
      </div>

  );

}