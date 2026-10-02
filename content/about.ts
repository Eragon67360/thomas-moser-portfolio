/**
 * Facts for the /about page. Sources: Thomas's own answers (current role, location,
 * professional stack), his CV (experience, education, languages) and his repositories
 * (build stack). Do not add anything that cannot be traced to one of these.
 */

export type TimelineEntry = {
  title: string;
  organization: string;
  place: string;
  period: string;
  description?: string;
};

/** Current position, shown on /about and published as structured data. */
export const currentRole = {
  // The CV's headline title (resources/cv/cv.html); the timeline keeps the employment title.
  title: "Full-Stack Developer",
  organization: "Vusyon",
  group: "avenit group",
  city: "Offenburg",
  country: "Germany",
};

export const location = { home: "Near Strasbourg, France", work: "Offenburg, Germany" };

export const intro = {
  role: "Full-Stack Developer",
  paragraphs: [
    "I'm Thomas Moser, a full-stack developer. Since July 2024 I've been a software developer in the avenit group: first at avenit, and since September 2025 at Vusyon, where I work on web development.",
    "I live in France, near Strasbourg, and work across the border in Offenburg, Germany.",
    "Outside work I build and ship my own projects end to end: websites, admin dashboards, mobile apps and the occasional AI experiment. With designer Cristina Andrés I ran a micro-enterprise, MOCA, and we worked on several projects together.",
  ],
};

export const experience: TimelineEntry[] = [
  {
    title: "Software Developer (Softwareentwickler)",
    organization: "avenit group",
    place: "Offenburg, Germany",
    period: "Jul 2024 – present",
    description:
      "Web development at Vusyon since September 2025. At avenit from July 2024 to August 2025: Vue.js and NestJS projects, as well as TYPO3 websites.",
  },
  {
    title: "Web Developer (freelance)",
    organization: "MOCA, micro-enterprise with designer Cristina Andrés",
    place: "France",
    period: "Oct 2023 – Jul 2024",
    description:
      "Designed and built websites with Cristina Andrés. First client: Curefab Technologies (Munich), whose company website I built with ConcreteCMS and PHP (Oct 2023 – Feb 2024).",
  },
  {
    title: "Software Developer",
    organization: "BMG LABTECH",
    place: "Ortenberg, Germany",
    period: "May 2023 – Sep 2023",
    description:
      "Developed .NET (C#) software for the PC interface of the company's microplate reader, in a team of eight developers.",
  },
  {
    title: "Bachelor's Thesis",
    organization: "BMG LABTECH",
    place: "Ortenberg, Germany",
    period: "Sep 2022 – Mar 2023",
    description:
      "Built a Python framework with a graphical interface to test the accuracy of data acquired with the MARS software against reference datasets.",
  },
  {
    title: "Bachelor's Thesis",
    organization: "SwissTiming",
    place: "Corgémont, Switzerland",
    period: "Apr 2022 – Jul 2022",
    description: "Image processing on FPGA, with the accompanying software written in C++.",
  },
];

export const education: TimelineEntry[] = [
  {
    title: "Bachelor of Engineering, Computer Science and Communication Systems",
    organization: "Haute-École ARC",
    place: "Neuchâtel, Switzerland",
    period: "2021 – 2022",
  },
  {
    title: "Bachelor in Electrical Engineering and Information Technology",
    organization: "Fachhochschule Offenburg",
    place: "Offenburg, Germany",
    period: "2019 – 2021",
  },
  {
    title: "DUT in Electrical Engineering and Industrial Computing",
    organization: "IUT de Haguenau",
    place: "Haguenau, France",
    period: "2018 – 2019",
  },
];

/** Combined professional and personal stack. */
export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Dart", "Swift", "Java", "C#", "C/C++", "PHP"] },
  { group: "Frontend", items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "HeroUI"] },
  { group: "Backend & data", items: ["NestJS", "TYPO3", "Payload CMS", "Supabase", "PostgreSQL", "Prisma"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Swift", "Android (Jetpack Compose)"] },
  { group: "Platforms & tools", items: ["Turborepo", "Docker", "Vercel", "Stripe", "Clerk", "Cloudinary", "Git"] },
];

export const languages = [
  { name: "French", level: "Native" },
  { name: "German", level: "C2, spoken and written" },
  { name: "English", level: "C1, spoken and written" },
];

export const music = "I have played the trumpet since 2006 and the piano since 2010, and I publish arrangements on MuseScore.";
