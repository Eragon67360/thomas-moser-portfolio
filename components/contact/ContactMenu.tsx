"use client";
import { Button, Description, Dropdown, Label, Modal, useOverlayState } from "@heroui/react";
import type { IconType } from "react-icons";
import { FaCalendarAlt, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { profile } from "@/config/site";

type Channel = { id: string; label: string; description: string; href?: string; Icon: IconType };

const MENU_CHANNELS: Channel[] = [
  {
    id: "email",
    label: "Email",
    description: "Send me an email",
    href: `mailto:${profile.Email}`,
    Icon: MdOutlineEmail,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Write from a more direct channel",
    href: `https://api.whatsapp.com/send?phone=${profile.WhatsApp}`,
    Icon: FaWhatsapp,
  },
  { id: "others", label: "Others", description: "Reach to me with other channels", Icon: TiMessages },
];

const OTHER_CHANNELS = [
  { label: "Instagram", href: profile.Instagram, Icon: FaInstagram },
  { label: "LinkedIn", href: profile.LinkedIn, Icon: FaLinkedin },
  { label: "Book an appointment", href: profile.Calendly, Icon: FaCalendarAlt },
];

export function ContactMenu() {
  const othersModal = useOverlayState();

  return (
    <>
      <Dropdown>
        <Button variant="secondary" className="px-8 text-sm md:text-base">
          Contact
        </Button>
        <Dropdown.Popover className="w-85">
          <Dropdown.Menu aria-label="Contact" onAction={(key) => key === "others" && othersModal.open()}>
            {MENU_CHANNELS.map(({ id, label, description, href, Icon }) => (
              <Dropdown.Item
                key={id}
                id={id}
                textValue={label}
                href={href}
                target={href?.startsWith("https:") ? "_blank" : undefined}
              >
                <Icon size={24} aria-hidden />
                <div className="flex flex-col">
                  <Label>{label}</Label>
                  <Description>{description}</Description>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Modal>
        <Modal.Backdrop
          variant="blur"
          isOpen={othersModal.isOpen}
          onOpenChange={(isOpen) => othersModal.setOpen(isOpen)}
        >
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Other ways to contact me</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="flex flex-col gap-2">
                {OTHER_CHANNELS.map(({ label, href, Icon }) => (
                  <ExternalLink
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-surface-hover"
                  >
                    <Icon size={24} aria-hidden />
                    <span>{label}</span>
                  </ExternalLink>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="ghost">
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
