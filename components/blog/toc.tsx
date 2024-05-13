'use client'
import React, { useEffect } from 'react';
import CustomLink from '@/components/shared/customLink';

import useTocObserver from '@/hooks/useTocObserver';
import { TocProps } from '@/lib/types';
import { usePathname } from 'next/navigation';


const Toc = () => {
  const { tocActiveId, setActiveId } = useTocObserver();
  const [toc, setToc] = React.useState([] as Array<TocProps>);

  const pathname = usePathname();

  useEffect(() => {
    const HeadingArr: TocProps[] = [];
    const headings = document.querySelectorAll('article h2, article h3');
    headings.forEach((heading) => {
      HeadingArr.push({
        id: heading.id,
        name: heading.textContent,
        level: +heading.tagName.replace('H', ''),
      });
    });
    setToc(HeadingArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <ul className='list-none prose-a:no-underline'>
      {toc.length > 0 &&
        toc.map((item) => (
          <div key={item.id}>
            {item.level === 2 && (
              <li>
                <CustomLink href={`#${item.id}`}>
                  <span
                    onClick={() => setActiveId(item.id)}
                    className={`my-0.5 text-sm hover:text-primary ${tocActiveId == item.id ? 'text-primary' : 'text-white'}`}
                  >
                    {item.name}
                  </span>
                </CustomLink>
              </li>
            )}

            <ul className='list-none'>
              {item.level === 3 && (
                <li>
                  <CustomLink href={`#${item.id}`}>
                    <span
                      onClick={() => setActiveId(item.id)}
                      className={`my-0.5 text-sm hover:text-primary ${tocActiveId == item.id ? 'text-primary' : 'text-gray-400'}`}
                    >
                      {item.name}
                    </span>
                  </CustomLink>
                </li>
              )}
            </ul>
          </div>
        ))}
    </ul>
  );
};

export default Toc;
