import React from 'react';

import { getPostViews } from '@/hooks/useViewCount';

export interface Props {
    slug: string;
}

const Views: React.FC<Props> = ({ slug }) => {
    const viewCount = getPostViews(slug);
    if (!viewCount) return <>-- views</>;

    return <>{viewCount} views</>;
};

export default Views;
