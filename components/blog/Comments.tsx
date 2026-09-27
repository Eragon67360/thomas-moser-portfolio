"use client";
import Giscus from "@giscus/react";

export function Comments() {
  const repoId = process.env.NEXT_PUBLIC_COMMENT_REPOID;
  const categoryId = process.env.NEXT_PUBLIC_COMMENT_CATEGORYID;
  if (!repoId || !categoryId) return null;

  return (
    <Giscus
      repo="Eragon67360/thomas-moser-portfolio"
      repoId={repoId}
      category="Announcements"
      categoryId={categoryId}
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="0"
      theme="preferred_color_scheme"
      inputPosition="top"
    />
  );
}
