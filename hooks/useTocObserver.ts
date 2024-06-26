'use client'
import React, { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

const useTocObserver = () => {
  const observer = useRef<IntersectionObserver | undefined>();
  const [activeId, setActiveId] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleObsever = (
      entries: { isIntersecting?: boolean; target: { id: string } }[],
    ) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: '-20% 0% -35% 300px',
    });

    const elements = document.querySelectorAll('article h2, article h3');
    elements.forEach((elem) => observer.current!.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  useEffect(() => {
    const hash = pathname.split('#')[1];
    if (hash) {
      setActiveId(hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tocActiveId: activeId,
    setActiveId: (id: string) => {
      setActiveId(id);
    },
  };
};

export default useTocObserver;
