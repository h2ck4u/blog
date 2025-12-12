'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/features/theme/theme-toggle';
import { BLOG_CONFIG } from '@/blog.config';
import { cn } from '@/shared/lib/utils';
export default function Header() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { href: '/', label: 'POSTS' },
    { href: '/thoughts', label: 'THOUGHTS' },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <div className="grid w-full grid-cols-3 items-center">
          <div className="flex items-center justify-start">
            <Link href="/" className="text-l text-primary font-semibold">
              <span className="font-bold">{BLOG_CONFIG.name}</span>
            </Link>
          </div>
          <nav className="flex items-center justify-center gap-4">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href} className="flex items-center gap-4">
                {index > 0 && <span className="text-muted-foreground">|</span>}
                <Link
                  href={item.href}
                  className={cn(
                    'hover:text-primary font-medium transition-colors',
                    pathname === item.href ? 'text-foreground font-bold' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
