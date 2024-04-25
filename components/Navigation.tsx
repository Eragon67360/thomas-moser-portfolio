'use client'
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button } from "@nextui-org/react";
import { GithubIcon } from './icons/GitHubIcon';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Me } from './icons/Me';
import { ChevronDown } from './icons/Icons';
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { FaProjectDiagram } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { FaSpotify } from "react-icons/fa";
import { FaSteam } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import profile from '@/public/json/personal_data.json'

const Navigation = () => {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} height={16} width={16} />
  };
  const router = useRouter();

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarBrand
        className='gap-2 cursor-pointer hover:opacity-80 transition-all duration-250'
        onClick={() => { router.push('/') }} >
        <Me />
        <p className="font-bold text-inherit text-xl">Thomas</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link href='/' color='foreground'>
            Home
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                size='lg'
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                About
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Home"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="about"
              href='/#about'
              description="Get to know about me"
              startContent={<IoPersonCircleOutline size={24} />}
            >
              <p>About</p>
            </DropdownItem>

            <DropdownItem
              key="competencies"
              href='/#competencies'
              description="My cross-disciplinary and technical skills"
              startContent={<CiSettings size={24} />}
            >
              <p>Competencies</p>
            </DropdownItem>
            <DropdownItem
              key="projects"
              href='/#projects'
              description="Various projects I've carried out in recent years"
              startContent={<FaProjectDiagram size={24} />}
            >
              <p>Projects</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                size='lg'
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Embedded Projects
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Embedded projects"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="spotify"
              href='/projects/#spotify'
              description="About my listenings"
              startContent={<FaSpotify size={24} />}
            >
              <p>Spotify</p>
            </DropdownItem>

            <DropdownItem
              key="steam"
              href='/projects/#steam'
              description="Yup, I'm a gamer"
              startContent={<FaSteam size={24} />}
            >
              <p>Steam</p>
            </DropdownItem>



          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                size='lg'
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Contact
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Contact"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="email"
              href={`mailto:${profile.Email}`}
              target='_blank'
              description="Send me an email"
              startContent={<MdOutlineEmail size={24} />}
            >
              <p>Email</p>
            </DropdownItem>

            <DropdownItem
              key="whatsapp"
              href={`https://wa.me/${profile.WhatsApp}`}
              target='_blank'
              description="Write from a more direct channel"
              startContent={<FaWhatsapp size={24} />}
            >
              <p>WhatsApp</p>
            </DropdownItem>

            <DropdownItem
              key="others"
              onClick={() => { router.push('/#competencies') }}
              description="Reach to me with other channels"
              startContent={<FaWhatsapp size={24} />}
            >
              <p>WhatsApp</p>
            </DropdownItem>

          </DropdownMenu>
        </Dropdown>

      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="foreground" href="https://github.com/Eragon67360" target='_blank'>
            <GithubIcon />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Navigation