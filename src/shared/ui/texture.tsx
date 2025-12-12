import React from 'react';

export function Texture() {
  return (
    <svg
      className="pointer-events-none visible fixed inset-0 z-50 h-screen w-full translate-y-0 opacity-60 dark:opacity-30"
      id="texture"
    >
      <filter id="noise">
        <feTurbulence baseFrequency=".8" numOctaves="4" stitchTiles="stitch" type="fractalNoise" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect filter="url(#noise)" height="100%" width="100%" />
    </svg>
  );
}
