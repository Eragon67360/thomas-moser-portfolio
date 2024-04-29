import glob from "fast-glob";
import { ComponentType } from "react";

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface ArticleWithSlug extends Article {
  slug: string;
}
export async function importArticle(
  articleFilename: string
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../articles/${articleFilename}`)) as {
    default: ComponentType;
    article: Article;
  };
  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ""),
    ...article,
  };
}

export async function getAllArticles() {
  let articleFilenames = await glob("*/page.mdx", {
    cwd: "./src/app/articles",
  });
  let articles = await Promise.all(articleFilenames.map(importArticle));
  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}
