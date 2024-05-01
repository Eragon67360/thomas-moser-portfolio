'use client'
import React, { } from "react";
import { H1 } from "./ui/Typography";
import { Modal, Button, useDisclosure, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import ModalForm from "./ModalForm";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import profile from '@/public/json/personal_data.json'

const Hero = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className="flex h-[50dvh] md:h-[60dvh] lg:h-[60dvh] xl:h-[100dvh] items-center justify-center w-full px-4 bg-white dark:bg-hero  bg-no-repeat bg-cover bg-center bg-fixed bg-blend-multiply dark:bg-overlay">
                <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center px-8">
                    <H1>Thomas Moser - Full-Stack Developer</H1>
                    <h2 className="transition-all duration-250 text-center mb-6 font-light text-gray-500 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-xl">Embracing curiosity and a passion for learning, I craft dynamic software and web solutions that drive innovation and efficiency.</h2>
                    <div className="flex gap-4">
                        <Button onPress={onOpen} color="primary" className="inline-flex items-center justify-center text-white hover:text-primary text-sm sm:text-base md:text-lg lg:text-xl font-medium border-primary hover:hover:bg-transparent">
                            Start a project request
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Button>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="px-8 bg-secondary data-[hover=true]:bg-transparent hover:border hover border-secondary group"
                                    radius="sm"
                                    variant="light"
                                >
                                    <p className='text-sm md:text-base text-white group-hover:text-secondary'>Contact</p>
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
                    </div>

                </div>
                <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
                    <ModalForm />
                </Modal>

            </div>
        </>
    );
}

export default Hero