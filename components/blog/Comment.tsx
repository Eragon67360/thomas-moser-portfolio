"use client"
import React from 'react';

import Giscus from '@giscus/react';

const Comment = () => {
  return (
    <Giscus
      repo='Eragon67360/thomas-moser-portfolio'
      repoId={process.env.NEXT_PUBLIC_COMMENT_REPOID!}
      category='Announcements'
      categoryId={process.env.NEXT_PUBLIC_COMMENT_CATEGORYID}
      mapping='title'
      reactionsEnabled='1'
      emitMetadata='0'
      theme='preferred_color_scheme'
      inputPosition='top'
    />
  );
};

export default Comment;
