'use client';

import React, { FC } from 'react';

import Link from 'next/link';
import { LinkProps } from 'next/link';

export type Props = {
  href: string;
  className?: string;
  children:any
} & LinkProps;

const customLink: FC<Props> = ({ href, children, ...props }) => {
  const isExternal = href.startsWith('http') ? false : true;
  if (isExternal) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a {...props} href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );
};

export default customLink;
