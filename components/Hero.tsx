'use client'
import React, { } from "react";
import { H1 } from "./ui/Typography";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import ModalForm from "./ModalForm";
import ContactButton from "./ui/ContactButton";

const Hero = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <div className="flex h-[75dvh] items-center justify-center w-full px-4 ">
                <div className="w-full flex flex-col items-center px-8">
                    <H1>Thomas Moser - Full-Stack Developer</H1>
                    <h2 className="transition-all duration-250 text-center mb-6 font-light text-gray-500 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-xl">Embracing curiosity and a passion for learning, I craft dynamic software and web solutions that drive innovation and efficiency.</h2>
                    <div className="flex gap-4">
                        <Button onPress={onOpen} color="primary" radius="sm" className="inline-flex items-center justify-center text-white hover:text-primary text-sm sm:text-base md:text-lg lg:text-xl font-medium border-primary hover:bg-transparent hover:border">
                            Project request
                        </Button>
                        <ContactButton />
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