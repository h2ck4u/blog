import Image from 'next/image';
import { BLOG_CONFIG } from '@/blog.config';

export function ProfileImage() {
  return (
    <Image
      src={BLOG_CONFIG.author.avatarUrl}
      alt={BLOG_CONFIG.author.name}
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
