import type {
  Blog,
  BlogPosting,
  BreadcrumbList,
  CollectionPage,
  CreativeWork,
  Graph,
  Person,
  ProfilePage,
  WebSite,
} from "schema-dts";
import { profile, site } from "@/config/site";
import { currentRole, education, intro, languages, location, stack } from "@/content/about";
import { absoluteUrl } from "@/lib/seo/metadata";
import { postShareImage, projectScreenshot } from "@/lib/media";
import type { PostMeta } from "@/types/post";
import type { Project } from "@/types/project";

/**
 * schema.org JSON-LD for the site. Every fact comes from content/about.ts,
 * content/profile.json or content/projects.ts (see AGENTS.md, content accuracy).
 */

const PERSON_ID = absoluteUrl("/#person");
const WEBSITE_ID = absoluteUrl("/#website");
const BLOG_ID = absoluteUrl("/blog#blog");
const personRef = { "@id": PERSON_ID } as const;
const BLOG_NAME = `${site.author}'s blog`;

const LANGUAGE_CODES: Record<string, string> = { French: "fr", German: "de", English: "en" };

function person(): Person {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.author,
    url: site.url,
    email: `mailto:${profile.Email}`,
    jobTitle: intro.role,
    description: site.description,
    worksFor: {
      "@type": "Organization",
      name: currentRole.organization,
      parentOrganization: { "@type": "Organization", name: currentRole.group },
      address: { "@type": "PostalAddress", addressLocality: currentRole.city, addressCountry: "DE" },
    },
    homeLocation: { "@type": "Place", name: location.home },
    alumniOf: education.map(({ organization, place }) => ({
      "@type": "CollegeOrUniversity",
      name: organization,
      address: place,
    })),
    knowsAbout: [...new Set(stack.flatMap(({ items }) => items))],
    knowsLanguage: languages.map(({ name }) => ({
      "@type": "Language",
      name,
      alternateName: LANGUAGE_CODES[name],
    })),
    sameAs: [profile.LinkedIn, profile.Github, profile.Youtube, profile.Instagram, profile.MuseScore],
  };
}

function website(): WebSite {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    alternateName: site.author,
    description: site.description,
    inLanguage: ["en", "fr"],
    publisher: personRef,
  };
}

/** Site-wide graph: who the site is about and what the site is. */
export function siteGraph(): Graph {
  return graph(person(), website());
}

function graph(...nodes: Graph["@graph"]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function profilePage(): Graph {
  const page: ProfilePage = {
    "@type": "ProfilePage",
    "@id": absoluteUrl("/about"),
    url: absoluteUrl("/about"),
    name: `About ${site.author}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: personRef,
  };
  // Google reads mainEntity from this page's own data: repeat the Person node (same @id, so it merges).
  return graph(page, person());
}

function breadcrumbs(items: { name: string; path: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

export function blogPosting(post: PostMeta, translation?: PostMeta): Graph {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const translationRef = translation && { "@id": absoluteUrl(`/blog/${translation.slug}`) };
  const posting: BlogPosting = {
    "@type": "BlogPosting",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    image: postShareImage(post.slug),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: post.lang,
    keywords: post.tags,
    author: { ...personRef, name: site.author, url: absoluteUrl("/about") },
    publisher: personRef,
    isPartOf: { "@type": "Blog", "@id": BLOG_ID, name: BLOG_NAME, url: absoluteUrl("/blog") },
    // An English post is the original, a French one its translation.
    ...(translationRef &&
      (post.lang === "en" ? { workTranslation: translationRef } : { translationOfWork: translationRef })),
  };
  const crumbs = breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  return graph(posting, crumbs);
}

/** The blog itself, which every BlogPosting's `isPartOf` points to. */
export function blogPage(posts: PostMeta[]): Graph {
  const blog: Blog = {
    "@type": "Blog",
    "@id": BLOG_ID,
    url: absoluteUrl("/blog"),
    name: BLOG_NAME,
    author: personRef,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: ["en", "fr"],
    blogPost: posts.map((post) => ({ "@id": absoluteUrl(`/blog/${post.slug}`) })),
  };
  return graph(blog);
}

function creativeWork(project: Project): CreativeWork {
  return {
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: project.links.live ?? project.links.repo,
    ...(project.links.live && project.links.repo && { sameAs: project.links.repo }),
    ...(project.screenshot && { image: projectScreenshot(project.screenshot) }),
    ...(project.period && { dateCreated: project.period.start }),
    keywords: project.stack,
    creator: project.credits.developedBy.map((name) =>
      name === site.author ? personRef : { "@type": "Person" as const, name },
    ),
  };
}

export function projectsPage(projects: Project[]): Graph {
  const page: CollectionPage = {
    "@type": "CollectionPage",
    "@id": absoluteUrl("/projects"),
    url: absoluteUrl("/projects"),
    name: `Projects by ${site.author}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: personRef,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: creativeWork(project),
      })),
    },
  };
  return graph(page);
}
