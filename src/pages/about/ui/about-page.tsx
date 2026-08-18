import { ProfileSection } from '@/features/profile';
import { BLOG_CONFIG } from '@/blog.config';
import { Metadata } from 'next';
import { CareerTimeline } from './career-timeline';
import { CAREER_TIMELINE } from '../model/career';

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
      <div className="mx-auto max-w-2xl space-y-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">소개</h2>

          <ProfileSection />

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>경험한 것을 공유하는 것을 좋아하고, 부족함을 꾸준히 채우려 노력하는 개발자입니다.</p>
            <p>
              10년간 프론트엔드 개발자로서 웹 오피스·에디터, 커머스·결제, 예약 서비스, 보안
              솔루션, 모빌리티 서비스 등 다양한 도메인을 경험하며 역량을 쌓아왔습니다.
            </p>
            <p>
              반복적인 일을 그대로 두기보다는 자동화와 개발 환경 개선을 통해 팀의 DX를 높이는 데
              적극적으로 앞장서 왔습니다.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">경력</h2>
          <CareerTimeline items={CAREER_TIMELINE} />
        </div>
      </div>
    </div>
  );
}
