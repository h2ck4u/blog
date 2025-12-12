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
  other: {
    google: 'notranslate',
  },
};

export const revalidate = 60;

import { MouseSpotlight } from '@/shared/ui/mouse-spotlight';
import { Texture } from '@/shared/ui/texture';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
