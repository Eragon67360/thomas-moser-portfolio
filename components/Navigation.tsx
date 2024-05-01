'use client'
import React from 'react'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@nextui-org/react";


const Navigation = () => {

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred
      className='transition-all duration-250 font-jet border-b border-white/30'
    >
      <NavbarContent className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 w-full justify-center" justify="center">
        <NavbarItem className=''>
          <Button
            disableRipple
            className="px-0 bg-transparent data-[hover=true]:bg-transparent"
            radius="sm"
            variant="light"
          >
            <Link href='/' color='foreground' className=' mx-0'>
              <p className='text-sm md:text-base'>Home</p>
            </Link>
          </Button>
        </NavbarItem>

        <NavbarItem className=''>
          <Button
            disableRipple
            className="px-0 bg-transparent data-[hover=true]:bg-transparent"
            radius="sm"
            variant="light"
          >
            <Link href='/about' color='foreground' className=' mx-0'>
              <p className='text-sm md:text-base'>About</p>
            </Link>
          </Button>
        </NavbarItem>

        <NavbarItem className=''>
          <Button
            disableRipple
            className="px-4 bg-transparent data-[hover=true]:bg-transparent"
            radius="sm"
            variant="light"
          >
            <Link href='/projects' color='foreground' className=''>
              <p className='text-sm md:text-base'>Projects</p>
            </Link>
          </Button>
        </NavbarItem>

        <NavbarItem className=''>
          <Button
            disableRipple
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            radius="sm"
            variant="light"
          >
            <Link href='/blog' color='foreground'>
              <p className='text-sm md:text-base'>Blog</p>
            </Link>
          </Button>

        </NavbarItem>

        <NavbarItem className=''>
          <Button
            disableRipple
            className="px-4 bg-transparent data-[hover=true]:bg-transparent"
            radius="sm"
            variant="light"
          >
            <Link href='/activities' color='foreground' className=''>
              <p className='text-sm md:text-base'>Activities</p>
            </Link>
          </Button>
        </NavbarItem>

      </NavbarContent>

    </Navbar>

  )
}

export default Navigation