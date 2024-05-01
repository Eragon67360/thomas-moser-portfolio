'use client'
import React from 'react'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';


const Navigation = () => {
  const router = useRouter()

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred
      className='font-jet border-b border-white/30'
    >
      <NavbarContent className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 w-full justify-center transition-all duration-250 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl " justify="center">
        <NavbarItem className=''>
          <Link
            className="bg-transparent data-[hover=true]:bg-transparent text-foreground "
            href='/'
          >
            Home
          </Link>
        </NavbarItem>

        <NavbarItem className=''>
          <Link
            className="bg-transparent data-[hover=true]:bg-transparent text-foreground "
            href='/about'
          >
            About
          </Link>
        </NavbarItem>

        <NavbarItem className=''>
          <Link
            className=" bg-transparent data-[hover=true]:bg-transparent text-foreground "
            href='/projects'
          >
            Projects
          </Link>
        </NavbarItem>

        <NavbarItem className=''>
          <Link
            className="bg-transparent data-[hover=true]:bg-transparent text-foreground "
            href='/blog'
          >
            Blog
          </Link>

        </NavbarItem>

        <NavbarItem className=''>
          <Link
            className="bg-transparent data-[hover=true]:bg-transparent text-foreground "
            href='/activities'
          >
            Activities
          </Link>
        </NavbarItem>

      </NavbarContent>

    </Navbar>

  )
}

export default Navigation