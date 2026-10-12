/** Locations of the site's images (served from public/images), shared by pages, metadata and structured data. */

/** Header image of a post: `public/images/blog/<slug>/header.jpg`. */
export function postHeaderImage(slug: string): string {
  return `/images/blog/${slug}/header.jpg`;
}

/** Project screenshot; `id` is the project's `screenshot` field (`public/images/projects/<id>.jpg`). */
export function projectScreenshot(id: string): string {
  return `/images/projects/${id}.jpg`;
}
