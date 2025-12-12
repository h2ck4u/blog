'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { BLOG_CONFIG } from '@/blog.config';

export function ProfileImage() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'light' ? '/images/profile-light.png' : '/images/profile-dark.png'}
      alt={BLOG_CONFIG.author.name}
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
