const FALLBACK_SITE_URL = 'https://example.com';

export const BLOG_CONFIG = {
  name: '<정은쓰 블로그 />',
  description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL,
  author: {
    name: '정은쓰',
    role: 'Frontend Engineer',
  },
  social: {
    github: 'https://github.com/h2ck4u',
    instagram: 'https://www.instagram.com/jungeuny',
    linkedIn: 'https://www.linkedin.com/in/jeungeuny',
  },
  og: {
    title: '정은쓰 블로그',
    description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다.',
  },
} as const;

export type BlogConfig = typeof BLOG_CONFIG;
