import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/shared/lib/notion';
import { BLOG_CONFIG } from '@/blog.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 URL
  const baseUrl = BLOG_CONFIG.siteUrl;

  // 정적 페이지 목록
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thoughts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ] as const;

  // 블로그 게시물 가져오기
  const { posts } = await getPublishedPosts({ pageSize: 100 });

  // 블로그 게시물 URL 생성
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.modifiedDate ? new Date(post.modifiedDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // NOTE: thoughts는 /thoughts 목록 페이지에서만 노출되고 개별 상세 라우트(/thoughts/[slug])가
  // 존재하지 않으므로 여기서 개별 URL을 생성하지 않는다. 상세 라우트가 추가되면 다시 포함할 것.

  // 정적 페이지와 블로그 게시물 결합
  return [...staticPages, ...blogPosts];
}
