import type { MDXComponents } from 'mdx/types'
// import { Code } from 'bright'
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const mdxComponents: MDXComponents = {
    
  pre: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLPreElement
  >) => {
    return (
      <>{children}</>
    )
  },
}
