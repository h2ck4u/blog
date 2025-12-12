import { getPublishedPosts } from '@/shared/lib/notion';

export async function getPosts(
  tag?: string,
  sort?: string,
  startCursor?: string,
  pageSize?: number
) {
  const posts = await getPublishedPosts({ tag, sort, startCursor, pageSize });
  return posts;
}
