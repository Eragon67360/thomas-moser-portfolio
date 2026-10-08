"use client";

import { useMemo, useState } from "react";
import { Button, SearchField, Tag, TagGroup } from "@heroui/react";
import { PostList } from "@/components/blog/PostList";
import { POST_TYPE_LABELS } from "@/components/blog/postTypes";
import { POST_TYPES, type PostLang, type PostMeta, type PostType } from "@/types/post";

const ALL = "all";

const LANGUAGE_OPTIONS: { id: PostLang | typeof ALL; label: string }[] = [
  { id: ALL, label: "All languages" },
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
];

/** Lower case without accents, so "temperament" finds "Tempérament". */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function matchesQuery(post: PostMeta, words: string[]): boolean {
  const haystack = normalize([post.title, post.description, POST_TYPE_LABELS[post.type].one, ...post.tags].join(" "));
  return words.every((word) => haystack.includes(word));
}

function FilterGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <TagGroup
      aria-label={label}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[value]}
      onSelectionChange={(keys) => {
        const option = keys === "all" ? undefined : options.find(({ id }) => keys.has(id));
        if (option) onChange(option.id);
      }}
      size="lg"
      variant="surface"
    >
      <TagGroup.List className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Tag key={option.id} id={option.id}>
            {option.label}
          </Tag>
        ))}
      </TagGroup.List>
    </TagGroup>
  );
}

/**
 * The blog index with a text search and type and language filters. Every post is in the server-rendered
 * HTML (the filters start at "all"), so crawlers that don't run JavaScript still see the full list.
 */
export function PostBrowser({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<PostType | typeof ALL>(ALL);
  const [lang, setLang] = useState<PostLang | typeof ALL>(ALL);

  const typeOptions = useMemo(
    (): { id: PostType | typeof ALL; label: string }[] => [
      { id: ALL, label: "All posts" },
      ...POST_TYPES.filter((id) => posts.some((post) => post.type === id)).map((id) => ({
        id,
        label: POST_TYPE_LABELS[id].many,
      })),
    ],
    [posts],
  );

  const words = normalize(query).split(/\s+/).filter(Boolean);
  const visible = posts.filter(
    (post) => (type === ALL || post.type === type) && (lang === ALL || post.lang === lang) && matchesQuery(post, words),
  );
  const filtered = visible.length !== posts.length;

  function reset() {
    setQuery("");
    setType(ALL);
    setLang(ALL);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 px-4 sm:ml-auto sm:w-2/3 sm:px-8">
        <SearchField aria-label="Search posts" value={query} onChange={setQuery} fullWidth>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search posts" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <FilterGroup label="Post type" value={type} onChange={setType} options={typeOptions} />
        <FilterGroup label="Language" value={lang} onChange={setLang} options={LANGUAGE_OPTIONS} />
        <p aria-live="polite" className="text-sm text-muted">
          {filtered ? `${visible.length} of ${posts.length} posts` : `${posts.length} posts`}
        </p>
      </div>

      {visible.length > 0 ? (
        <PostList posts={visible} />
      ) : (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-muted">No post matches your search.</p>
          <Button variant="tertiary" onPress={reset}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
