'use client'
import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
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
      "name": "About me",
      "href": "/#about"
    },
    {
      "name": "Competencies",
      "href": "/#competencies"
    },
    {
      "name": "Projects",
      "href": "/#projects"
    },
    {
      "name": "Activities",
      "href": "/activities"
    },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      className='transition-all duration-250'
    >

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand
          className='gap-2 w-full cursor-pointer hover:opacity-80 transition-all duration-250'
          onClick={() => { router.push('/') }} >
          <Me />

          <p className="flex font-bold text-inherit text-base lg:text-xl">Thomas</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6" justify="center">
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
                Activities
              </Button>
            </DropdownTrigger>
          </NavbarItem>
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

        <NavbarItem>
          <Link href='/blog' color='foreground'>
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
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