'use client'
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Link, Button, Dropdown, Switch } from "@nextui-org/react";
import Image from 'next/image';
import { useTheme as useNextTheme } from 'next-themes';
import { GithubIcon } from './icons/GitHubIcon';
import { ThemeSwitcher } from './ThemeSwitcher';

const Navigation = () => {
  const { setTheme } = useNextTheme();
  //  const {isDark, type} = useTheme();
  const collapseItems = [
    'Features',
    'Customers',
    'Pricing',
    'Company',
    'Legal',
  ];

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarBrand className='gap-2'>
        <Image src={'/logos/logo.svg'} alt='Logo' width={42} height={42} />
        <p className="font-bold text-inherit">Thomas</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Competencies
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="foreground" href="https://github.com/Eragon67360" target='_blank'>
            <GithubIcon />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Navigation