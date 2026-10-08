"use client";

import { useEffect, useRef, useState } from "react";
import { Button, SearchField, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { PostList } from "@/components/blog/PostList";
import { POST_TYPE_LABELS } from "@/components/blog/postTypes";
import { POST_TYPES, type PostLang, type PostMeta, type PostType } from "@/types/post";

const ALL = "all";

/** Text-link look shared by every toggle: the menu's font, amber and underlined when selected. */
const LINK =
  "h-auto min-w-0 rounded-md bg-transparent px-1 py-1 font-jet text-sm text-foreground/70 hover:text-foreground data-[selected=true]:bg-transparent data-[selected=true]:text-accent data-[selected=true]:underline data-[selected=true]:decoration-2 data-[selected=true]:underline-offset-8";

/** Lower case without accents, so "temperament" finds "Tempérament". */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function matchesQuery(post: PostMeta, words: string[]): boolean {
  const haystack = normalize([post.title, post.description, ...post.tags].join(" "));
  return words.every((word) => haystack.includes(word));
}

/**
 * The blog index with a type menu, an EN / FR switch and a search behind an icon. Every post is in the
 * server-rendered HTML (nothing is filtered at first), so crawlers that don't run JavaScript see the full list.
 */
export function PostBrowser({ posts }: { posts: PostMeta[] }) {
  const [type, setType] = useState<PostType | typeof ALL>(ALL);
  const [lang, setLang] = useState<PostLang | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  // Opening the search moves focus into it; done here rather than with autoFocus so it only happens on a click.
  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  const types = POST_TYPES.filter((id) => posts.some((post) => post.type === id));
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const visible = posts.filter(
    (post) =>
      (type === ALL || post.type === type) && (lang === null || post.lang === lang) && matchesQuery(post, words),
  );

  function reset() {
    setType(ALL);
    setLang(null);
    setQuery("");
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3 px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/15 pb-2">
          {types.length > 1 ? (
            <ToggleButtonGroup
              aria-label="Post type"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[type]}
              onSelectionChange={(keys) => {
                const [key] = keys;
                setType(types.find((id) => id === key) ?? ALL);
              }}
              isDetached
              className="flex flex-wrap justify-start gap-x-4 gap-y-1"
            >
              <ToggleButton id={ALL} variant="ghost" className={LINK}>
                All
              </ToggleButton>
              {types.map((id) => (
                <ToggleButton key={id} id={id} variant="ghost" className={LINK}>
                  {POST_TYPE_LABELS[id]}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          ) : (
            <span />
          )}

          <div className="ml-auto flex items-center gap-3">
            <ToggleButtonGroup
              aria-label="Language"
              selectionMode="single"
              selectedKeys={lang ? [lang] : []}
              onSelectionChange={(keys) => {
                const [key] = keys;
                setLang(key === "en" || key === "fr" ? key : null);
              }}
              isDetached
              className="flex items-center gap-1"
            >
              <ToggleButton id="en" variant="ghost" className={LINK} aria-label="English only">
                EN
              </ToggleButton>
              <span aria-hidden className="font-jet text-sm text-foreground/70">
                /
              </span>
              <ToggleButton id="fr" variant="ghost" className={LINK} aria-label="French only">
                FR
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButton
              isSelected={searchOpen}
              onChange={(open) => {
                setSearchOpen(open);
                if (!open) setQuery("");
              }}
              isIconOnly
              variant="ghost"
              aria-label="Search posts"
              className="size-8 text-foreground/70 hover:text-foreground data-[selected=true]:bg-transparent data-[selected=true]:text-accent"
            >
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </ToggleButton>
          </div>
        </div>

        {searchOpen && (
          <SearchField aria-label="Search posts" value={query} onChange={setQuery} fullWidth>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input ref={searchInput} placeholder="Search by title, topic or tag" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        )}

        <p aria-live="polite" className="sr-only">
          {`${visible.length} of ${posts.length} posts shown`}
        </p>
      </div>

      {visible.length > 0 ? (
        <PostList posts={visible} />
      ) : (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-muted">No post matches.</p>
          <Button variant="tertiary" onPress={reset}>
            Show all posts
          </Button>
        </div>
      )}
    </div>
  );
}
