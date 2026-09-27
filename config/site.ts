import profileData from "@/content/profile.json";

/**
 * Public contact details. This module is imported by client components, so only
 * list fields that are fine to ship in the browser bundle.
 */
export const profile = {
  Name: profileData.Name,
  Email: profileData.Email,
  WhatsApp: profileData.WhatsApp,
  LinkedIn: profileData.LinkedIn,
  Github: profileData.Github,
  Instagram: profileData.Instagram,
  Calendly: profileData.Calendly,
  Youtube: profileData.Youtube,
  Repository: profileData.Repository,
  License: profileData.License,
} as const;

export const site = {
  url: "https://thomasmoserdev.com",
  name: "thomasmoserdev.com",
  title: "Thomas Moser | Software Developer",
  description: "My personal website to share my projects, blogs, and other stuff.",
  author: profile.Name,
} as const;

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Activities", href: "/activities" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Social",
    links: [
      { label: "Github", href: profile.Github, external: true },
      { label: "Instagram", href: profile.Instagram, external: true },
      { label: "Linkedin", href: profile.LinkedIn, external: true },
      { label: "Youtube", href: profile.Youtube, external: true },
    ],
  },
  {
    title: "General",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Activities", href: "/activities" },
    ],
  },
  {
    title: "Extra",
    links: [
      { label: "Resume", href: "/pdf/CV_Thomas_MOSER.pdf", external: true },
      { label: "Source Code", href: profile.Repository, external: true },
    ],
  },
];
