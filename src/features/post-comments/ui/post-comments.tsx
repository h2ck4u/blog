'use client';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
export default function GiscusComments() {
  const { theme } = useTheme();
  return (
    <Giscus
      repo="h2ck4u/blog"
      repoId="R_kgDOQnWp7A"
      category="Announcements"
      categoryId="DIC_kwDOQnWp7M4CzsZh"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  );
}
