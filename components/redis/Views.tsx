import React from 'react';

import { getPostViews } from '@/hooks/useViewCount';

export interface Props {
    views: number;
}

const Views: React.FC<Props> = ({ views }) => {
    if (!views) return <>-- views</>;

    return <>{views} views</>;
};

export default Views;
