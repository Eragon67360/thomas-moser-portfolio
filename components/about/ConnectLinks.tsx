import type { IconType } from "react-icons";
import { FaCalendarAlt, FaGithub, FaInstagram, FaLinkedin, FaMusic, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { profile } from "@/config/site";

type Channel = { label: string; detail: string; href: string; Icon: IconType; external: boolean };

const CHANNELS: Channel[] = [
  { label: "Email", detail: profile.Email, href: `mailto:${profile.Email}`, Icon: MdOutlineEmail, external: false },
  {
    label: "WhatsApp",
    detail: "Message me directly",
    href: `https://api.whatsapp.com/send?phone=${profile.WhatsApp}`,
    Icon: FaWhatsapp,
    external: true,
  },
  { label: "Book a call", detail: "Calendly", href: profile.Calendly, Icon: FaCalendarAlt, external: true },
  { label: "LinkedIn", detail: "thomas-moser67", href: profile.LinkedIn, Icon: FaLinkedin, external: true },
  { label: "GitHub", detail: "Eragon67360", href: profile.Github, Icon: FaGithub, external: true },
  { label: "Instagram", detail: "th_mr_67", href: profile.Instagram, Icon: FaInstagram, external: true },
  { label: "YouTube", detail: "My channel", href: profile.Youtube, Icon: FaYoutube, external: true },
  { label: "MuseScore", detail: "My arrangements", href: profile.MuseScore, Icon: FaMusic, external: true },
];

const LINK_CLASS =
  "flex items-center gap-4 rounded-xl bg-surface-tint px-4 py-3 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent";

export function ConnectLinks() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {CHANNELS.map(({ label, detail, href, Icon, external }) => {
        const content = (
          <>
            <Icon size={22} className="shrink-0 text-accent" aria-hidden />
            <span className="flex min-w-0 flex-col">
              <span className="font-semibold">{label}</span>
              <span className="truncate text-sm text-foreground/70">{detail}</span>
            </span>
          </>
        );
        return (
          <li key={label}>
            {external ? (
              <ExternalLink href={href} className={LINK_CLASS}>
                {content}
              </ExternalLink>
            ) : (
              <a href={href} className={LINK_CLASS}>
                {content}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
