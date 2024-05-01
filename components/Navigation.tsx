'use client'
import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
  Modal,
  useDisclosure,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/react";
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
import { TiMessages } from "react-icons/ti";
import ModalContentContact from './ModalContentContact';

import profile from '@/public/json/personal_data.json'

const Navigation = () => {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} height={16} width={16} />
  };
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const menuItems = [
    {
      "name": "Home",
      "href": "/"
    },
    {
      "name": "Projects",
      "href": "/#projects"
    },
    {
      "name": "Blog",
      "href": "/blog"
    },
    {
      "name": "Activities",
      "href": "/activities"
    },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred
      className='transition-all duration-250 font-jet'
    >
      <NavbarContent className='hidden sm:flex' onClick={() => { router.push('/') }}>
        <Me className='fill-black dark:fill-white' width={42} height={42}/>
        <p className="flex font-bold text-inherit text-base lg:text-xl">Thomas</p>
      </NavbarContent>

      <NavbarContent className="sm:flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 w-full" justify="center">
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

        <NavbarItem className='hidden sm:block'>
          <Dropdown className=''>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                <p className='text-sm md:text-base'>About</p>
              </Button>
            </DropdownTrigger>

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
                About
              </DropdownItem>

              <DropdownItem
                key="competencies"
                href='/#competencies'
                description="My cross-disciplinary and technical skills"
                startContent={<CiSettings size={24} />}
              >
                Competencies
              </DropdownItem>
              <DropdownItem
                key="projects"
                href='/#projects'
                description="Various projects I've carried out in recent years"
                startContent={<FaProjectDiagram size={24} />}
              >
                Projects
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem className=''>
          <Dropdown>
            <DropdownTrigger>
              <Button
                disableRipple
                className="px-4 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                <p className='text-sm md:text-base'>Activities</p>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Activities"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="steam"
                href='/activities/#steam'
                description="Yup, I'm a gamer"
                startContent={<FaSteam size={24} />}
              >
                Steam
              </DropdownItem>
              <DropdownItem
                key="spotify"
                href='/activities/#spotify'
                description="About my listenings"
                startContent={<FaSpotify size={24} />}
              >
                Spotify
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
          <Dropdown>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                <p className='text-sm md:text-base'>Contact</p>
              </Button>
            </DropdownTrigger>
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
                Email
              </DropdownItem>

              <DropdownItem
                key="whatsapp"

                href={`https://api.whatsapp.com/send?phone=${profile.WhatsApp}`}
                target='_blank'
                description="Write from a more direct channel"
                startContent={<FaWhatsapp size={24} />}
              >
                WhatsApp
              </DropdownItem>

              <DropdownItem
                key="others"
                onClick={onOpen}
                description="Reach to me with other channels"
                startContent={<TiMessages size={24} />}
              >
                Others
              </DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className='hidden sm:flex'>
        <NavbarItem>
          <Link color="foreground" href={`${profile.Github}`} target='_blank'>
            <GithubIcon />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContentContact />
      </Modal>
    </Navbar>

  )
}

export default Navigation