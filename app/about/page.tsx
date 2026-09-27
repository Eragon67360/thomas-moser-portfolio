import { Card } from "@heroui/react";
import type { Metadata } from "next";
import { FaBriefcase, FaFileDownload, FaMapMarkerAlt } from "react-icons/fa";
import { AboutSection } from "@/components/about/AboutSection";
import { ConnectLinks } from "@/components/about/ConnectLinks";
import { StackGrid } from "@/components/about/StackGrid";
import { Timeline } from "@/components/about/Timeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/Typography";
import { cvDownloads } from "@/config/site";
import { currentRole, education, experience, intro, languages, location, music } from "@/content/about";
import { pageMetadata } from "@/lib/seo/metadata";
import { profilePage } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Thomas Moser, full-stack developer at Vusyon (avenit group) in Offenburg, living near Strasbourg: experience, education, stack and CV.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 px-8 py-8">
      <JsonLd data={profilePage()} />
      <header className="flex w-full flex-col items-center gap-6">
        <SectionHeader as="h1" title="About me" subtitle={intro.role} />
        <ul className="flex flex-wrap justify-center gap-3 text-sm">
          <li className="flex items-center gap-2 rounded-full bg-[#ccdcff1f] px-4 py-2">
            <FaBriefcase className="text-accent" aria-hidden />
            {currentRole.title} at {currentRole.organization}
          </li>
          <li className="flex items-center gap-2 rounded-full bg-[#ccdcff1f] px-4 py-2">
            <FaMapMarkerAlt className="text-accent" aria-hidden />
            {location.home} · Working in {location.work}
          </li>
        </ul>
        <div className="flex max-w-3xl flex-col gap-4 text-lg leading-8">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <nav aria-label="Download my CV" className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="flex items-center gap-2 text-muted">
            <FaFileDownload className="text-accent" aria-hidden />
            CV (PDF):
          </span>
          {cvDownloads.map(({ label, lang, href }) => (
            <a
              key={lang}
              href={href}
              hrefLang={lang}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-accent/60 px-4 py-1.5 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <AboutSection id="experience" title="Experience">
            <Timeline entries={experience} />
          </AboutSection>
        </div>
        <div className="lg:col-span-2">
          <AboutSection id="education" title="Education">
            <Timeline entries={education} />
          </AboutSection>
        </div>
      </div>

      <AboutSection id="stack" title="What I build with">
        <StackGrid />
      </AboutSection>

      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <AboutSection id="languages" title="Languages">
          <Card className="bg-[#ccdcff1f]">
            <Card.Content>
              <ul className="flex flex-col gap-2">
                {languages.map(({ name, level }) => (
                  <li key={name}>
                    <span className="font-semibold">{name}</span> <span className="text-muted">· {level}</span>
                  </li>
                ))}
              </ul>
            </Card.Content>
          </Card>
        </AboutSection>
        <AboutSection id="music" title="Music">
          <Card className="bg-[#ccdcff1f]">
            <Card.Content>
              <p className="leading-relaxed">{music}</p>
            </Card.Content>
          </Card>
        </AboutSection>
      </div>

      <AboutSection id="connect" title="Get in touch">
        <ConnectLinks />
      </AboutSection>
    </div>
  );
}
