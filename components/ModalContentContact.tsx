import React from 'react'
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Link } from "@nextui-org/react";
import { FaInstagram, FaLinkedin, FaCalendarAlt } from 'react-icons/fa';

import profile from '@/public/json/personal_data.json'

const ModalContentContact = () => {
    return (
        <>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Other ways to contact me</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-2'>
                                <Link href={`${profile.Instagram}`} target='_blank' color='foreground' className='flex gap-4 px-4 py-3 items-center rounded-lg hover:bg-black/5 transition-all duration-300'>
                                    <FaInstagram size={24} />
                                    <span>Instagram</span>
                                </Link>
                                <Link href={`${profile.LinkedIn}`} target='_blank' color='foreground' className='flex gap-4 px-4 py-3 items-center rounded-lg hover:bg-black/5 transition-all duration-300'>
                                    <FaLinkedin size={24} />
                                    <span>LinkedIn</span>
                                </Link>
                                <Link href={`${profile.Calendly}`} target='_blank' color='foreground' className='flex gap-4 px-4 py-3 items-center rounded-lg hover:bg-black/5 transition-all duration-300'>
                                    <FaCalendarAlt size={24} />
                                    <span>Book an appointment</span>
                                </Link>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </>
    )
}

export default ModalContentContact