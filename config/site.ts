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
  MuseScore: profileData.MuseScore,
  Repository: profileData.Repository,
  License: profileData.License,
} as const;

export const site = {
  /** Canonical origin. The apex domain 308-redirects here, so every absolute URL must use www. */
  url: "https://www.thomasmoserdev.com",
  name: "thomasmoserdev.com",
  title: "Thomas Moser | Full-Stack Developer",
  description:
    "Thomas Moser, full-stack developer in the avenit group in Offenburg, Germany, living near Strasbourg. Projects built end to end and tutorials on Next.js, TypeScript and web APIs.",
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
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Activities", href: "/activities" },
    ],
  },
  {
    title: "Extra",
    links: [
      { label: "Resume", href: "/pdf/CV_Thomas_Moser_EN.pdf", external: true },
      { label: "Source Code", href: profile.Repository, external: true },
    ],
  },
];

export const cvDownloads = [
  { label: "English", lang: "en", href: "/pdf/CV_Thomas_Moser_EN.pdf" },
  { label: "Français", lang: "fr", href: "/pdf/CV_Thomas_Moser_FR.pdf" },
  { label: "Deutsch", lang: "de", href: "/pdf/CV_Thomas_Moser_DE.pdf" },
] as const;
