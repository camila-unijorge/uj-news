import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
import BlogPostItemHeaderAuthors from './Authors';
import { Props } from '@docusaurus/types';

export default function BlogPostItemFooter(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;

  const tagsExists = tags.length > 0;

  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  return (
    <footer className="docusaurus-mt-lg">

      <BlogPostItemHeaderAuthors />

      <div className={clsx('row','margin-top--sm',ThemeClassNames.blog.blogFooterEditMetaRow)}>

        {tagsExists && (
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        )}

        {!isBlogPostPage && (
          <div className={clsx('col text--right', {'col--3': tagsExists,})}>
            <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
          </div>
        )}
      </div>

      <EditMetaRow
        className={clsx('margin-top--sm',ThemeClassNames.blog.blogFooterEditMetaRow)}
        lastUpdatedAt={lastUpdatedAt}
        lastUpdatedBy={lastUpdatedBy}
      />

    </footer>
  );
}

type EditMetaRowProps = {
  className?: string;
  lastUpdatedAt?: number;
  lastUpdatedBy?: string;
};
function EditMetaRow(props: EditMetaRowProps): ReactNode {
  const { className, lastUpdatedAt, lastUpdatedBy } = props;

  if (!lastUpdatedAt && !lastUpdatedBy) { return null; }

  const formattedDate = lastUpdatedAt
    ? new Date(lastUpdatedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className={clsx('edit-meta-row', className)}>
      <em>
        Última atualização
        {lastUpdatedBy && ` por ${lastUpdatedBy}`}
        {formattedDate && ` em ${formattedDate}`}
      </em>
    </div>
  );
}
