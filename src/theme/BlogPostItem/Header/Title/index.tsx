import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogPostItem/Header/Title';

import styles from './styles.module.css';

export default function BlogPostItemHeaderTitle({className}: Props): ReactNode {

  const {metadata, frontMatter, isBlogPostPage} = useBlogPost();
  const {permalink, title} = metadata;
  const subtitle = frontMatter.description;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  const SubtitleHeading = isBlogPostPage ? 'h2' : 'p';

  return (
    <div>
      <TitleHeading className={clsx(styles.title, className)}>
        {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
      </TitleHeading>

      {subtitle && <SubtitleHeading className={clsx(styles.subtitle, className)}>
        {subtitle}
      </SubtitleHeading>}
    </div>
  );
}
