import { ReactNode } from 'react';

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="container py-8">
      <div className="flex gap-8">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
