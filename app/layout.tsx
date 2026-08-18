import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';
import '@/app/styles/globals.css';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import Providers from '@/app/providers';
import { BLOG_CONFIG } from '@/blog.config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${BLOG_CONFIG.name}`,
    default: BLOG_CONFIG.name,
  },
  description: BLOG_CONFIG.description,
  keywords: ['Next.js', '프론트엔드', '웹개발', '코딩', '프로그래밍', '리액트'],
  authors: [{ name: BLOG_CONFIG.author.name, url: BLOG_CONFIG.social.github }],
  creator: BLOG_CONFIG.author.name,
  publisher: BLOG_CONFIG.author.name,
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(BLOG_CONFIG.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: BLOG_CONFIG.name,
    title: BLOG_CONFIG.og.title,
    description: BLOG_CONFIG.og.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_CONFIG.og.title,
    description: BLOG_CONFIG.og.description,
  },
};

export const revalidate = 60;

import { MouseSpotlight } from '@/shared/ui/mouse-spotlight';
import { Texture } from '@/shared/ui/texture';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: BLOG_CONFIG.name,
      url: BLOG_CONFIG.siteUrl,
      description: BLOG_CONFIG.description,
      inLanguage: 'ko-KR',
    },
    {
      '@type': 'Person',
      name: BLOG_CONFIG.author.name,
      jobTitle: BLOG_CONFIG.author.role,
      url: BLOG_CONFIG.siteUrl,
      sameAs: Object.values(BLOG_CONFIG.social),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <MouseSpotlight className="flex min-h-screen flex-col">
            {/* Header 영역 */}
            <Header />
            {/* Main 영역 */}
            <main className="flex-1">{children}</main>

            {/* Footer 영역 */}
            <Footer />
          </MouseSpotlight>
        </Providers>
        <Texture />
      </body>
    </html>
  );
}
