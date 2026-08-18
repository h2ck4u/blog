import { ProfileSection } from '@/features/profile';
import { BLOG_CONFIG } from '@/blog.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description: `${BLOG_CONFIG.author.name} (${BLOG_CONFIG.author.role}) 소개 페이지입니다. ${BLOG_CONFIG.description}`,
  alternates: {
    canonical: '/about',
  },
};

export function AboutPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">소개</h2>

        <ProfileSection />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {/* TODO: 실제 자기소개 문구로 교체해주세요. */}
          <p>
            안녕하세요, {BLOG_CONFIG.author.role}로 일하고 있는 {BLOG_CONFIG.author.name}
            입니다. {BLOG_CONFIG.description}
          </p>
        </div>
      </div>
    </div>
  );
}
