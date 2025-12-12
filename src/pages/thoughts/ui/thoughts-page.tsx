import { getPublishedPosts } from '@/shared/lib/notion';
import { PostListSuspense } from '@/widgets/post-list';
import { Suspense } from 'react';
import { PostCardSkeleton as PostListSkeleton } from '@/entities/post';

interface ThoughtsProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export async function ThoughtsPage({ searchParams }: ThoughtsProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  const postsPromise = getPublishedPosts({
    tag: selectedTag,
    sort: selectedSort,
    isThought: true,
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <Suspense fallback={<PostListSkeleton />}>
          <PostListSuspense postsPromise={postsPromise} isThought={true} />
        </Suspense>
      </div>
    </div>
  );
}
