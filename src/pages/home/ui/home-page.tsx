import { getPublishedPosts } from '@/shared/lib/notion';
import { PostListSuspense } from '@/widgets/post-list';
import { Suspense } from 'react';
import { PostCardSkeleton as PostListSkeleton } from '@/entities/post';
import { Metadata } from 'next';
import { BLOG_CONFIG } from '@/blog.config';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export const metadata: Metadata = {
  title: 'Home',
  description: `프론트엔드 개발자 ${BLOG_CONFIG.author.name}의 블로그입니다. ${BLOG_CONFIG.description}`,
  alternates: {
    canonical: '/',
  },
};

export async function HomePage({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  const postsPromise = getPublishedPosts({
    tag: selectedTag,
    sort: selectedSort,
    isThought: false,
  });
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        {/* <aside className="order-2 md:order-none">
          좌측 사이드바
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSectionClient tags={tags} selectedTag={selectedTag} />
          </Suspense>
        </aside>
        <HeaderSection selectedTag={selectedTag} /> */}
        <Suspense fallback={<PostListSkeleton />}>
          <PostListSuspense postsPromise={postsPromise} isThought={false} />
        </Suspense>

        {/* 우측 사이드바
        <aside className="order-1 flex flex-col gap-6 md:order-none">
          <ProfileSection />
          <ContactSection />
        </aside> */}
      </div>
    </div>
  );
}
