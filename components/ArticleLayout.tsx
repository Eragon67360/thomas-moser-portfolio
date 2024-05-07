import React, { ComponentPropsWithoutRef, ReactNode, useContext } from "react";
import { ArticleWithSlug } from "@/lib/article";
import { formatDate } from "@/lib/formatDate";

const ArticleLayout = ({
  article,
  children,
}: {
  article: ArticleWithSlug;
  children: ReactNode;
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-20">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-black dark:text-zinc-100">
                {article.title}
              </h1>

              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            <div className="mt-8" data-mdx-content>
              {children}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout;
