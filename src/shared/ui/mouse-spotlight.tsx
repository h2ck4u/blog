'use client';

import { cn } from '@/shared/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface MouseSpotlightProps {
  children?: React.ReactNode;
  className?: string;
  size?: number;
  color?: string; // We'll default to a subtle white/light glow, can be adjusted
}

export const MouseSpotlight = ({
  children,
  className,
  size = 400,
  color = 'var(--spotlight-color)', // Use CSS variable for theme support
}: MouseSpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative w-full overflow-hidden', className)}>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};
