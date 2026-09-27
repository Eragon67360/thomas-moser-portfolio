/** Cloudinary locations of the site's images, shared by pages, metadata and structured data. */

const CLOUDINARY = "https://res.cloudinary.com/dluezegi8/image/upload";
const POSTS_FOLDER = "v1714491226/images/upload/thomasmoserdev.com/blog";
const PROJECTS_FOLDER = "v1715078393/images/upload/thomasmoserdev.com/projects";

/** Full-size header image of a post. */
export function postHeaderImage(slug: string): string {
  return `${CLOUDINARY}/${POSTS_FOLDER}/${slug}/header`;
}

/**
 * The header cropped to 1200x630 JPEG: the size social cards expect, in a format
 * every consumer (including next/og) can decode.
 */
export function postShareImage(slug: string): string {
  return `${CLOUDINARY}/c_fill,w_1200,h_630,f_jpg,q_auto/${POSTS_FOLDER}/${slug}/header`;
}

/** Project screenshot; `id` is the project's `screenshot` field. */
export function projectScreenshot(id: string): string {
  return `${CLOUDINARY}/${PROJECTS_FOLDER}/${id}`;
}
