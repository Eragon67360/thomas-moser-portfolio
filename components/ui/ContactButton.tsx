import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, useDisclosure, Modal } from '@nextui-org/react'
import profile from '@/public/json/personal_data.json'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { TiMessages } from 'react-icons/ti'
import ModalContentContact from '../ModalContentContact'

const ContactButton = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
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
            </Dropdown >

            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContentContact />
            </Modal>
        </>

    )
}

export default ContactButton