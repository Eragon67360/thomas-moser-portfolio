'use client'
import { Button, Modal, useDisclosure } from '@nextui-org/react'
import React from 'react'
import ContactButton from '../ui/ContactButton'
import { H1 } from '../ui/Typography'
import ModalForm from '../ModalForm'

const HeroComponent = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <div className="mx-auto w-full text-center lg:w-3/4 lg:text-left">
                <H1>Thomas Moser</H1>
                <h2 className="transition-all duration-250 mb-6 font-light text-gray-500 lg:mb-8 text-sm sm:text-base">Embracing curiosity and a passion for learning, I craft dynamic software and web solutions that drive innovation and efficiency.</h2>
                <div className="mb-10 space-x-2 md:mb-20 lg:mb-0 flex items-center">
                    <Button onPress={onOpen} color="primary" radius="sm" className="inline-flex items-center justify-center text-white hover:text-primary text-sm sm:text-base md:text-lg lg:text-xl font-medium border-primary hover:bg-transparent hover:border">
                        Project request
                    </Button>
                    <ContactButton />
                </div>
            </div>
            <Modal scrollBehavior='outside' isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
                <ModalForm />
            </Modal>
        </>
    )
}

export default HeroComponent