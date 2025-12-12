import { ThoughtsPage } from '@/pages/thoughts/ui/thoughts-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thoughts',
  description: `개발과 삶에 대한 짧은 생각들을 모아둔 공간입니다.`,
  alternates: {
    canonical: '/thoughts',
  },
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}) {
  return <ThoughtsPage searchParams={searchParams} />;
}
