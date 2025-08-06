'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface RainbowContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function RainbowContainer({ className = '', children }: RainbowContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(0);

  useLayoutEffect(() => {
    function updateHeight() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setMinHeight(width * (6 / 16));
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className={cn("relative w-full mb-8", className)}>
      <div
        ref={containerRef}
        className="relative w-full"
      >
        {/* Rainbow SVG border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 1440 518"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ zIndex: 3 }}
        >
          <path
            d="M1407.21 2.47363C1424.07 2.23018 1437.83 15.9345 1437.64 32.8008L1432.84 469.041C1432.66 485.334 1419.51 498.505 1403.22 498.709L54.3271 515.613C38.1885 515.816 24.7819 503.213 23.9873 487.093L2.62891 53.7988C1.79303 36.8416 15.1832 22.5705 32.1592 22.3252L1407.21 2.47363Z"
            stroke="url(#paint0_linear_998_10128)"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <defs>
            <linearGradient id="paint0_linear_998_10128" x1="1426" y1="7.28111" x2="20.2652" y2="471.497" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF0000" />
              <stop offset="0.28" stopColor="#FFBF00" />
              <stop offset="0.46" stopColor="#04FF00" />
              <stop offset="0.675" stopColor="#00A2FF" />
              <stop offset="0.835" stopColor="#FF00BB" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Carousel Background SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 1439 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ zIndex: 2 }}
        >
          <path
            d="m22.0318 509.109-21.472042-454.4131c-.853197-18.0562 13.408242-33.2346 31.482442-33.5068l1374.1278-20.69473c18-.270962 32.67 14.34073 32.48 32.33363l-4.82 457.487c-.18 17.378-14.2 31.433-31.58 31.66l-1347.8355 17.621c-17.2465.225-31.5686-13.258-32.3827-30.487z"
            fill="var(--background-secondary)" />
        </svg>

        {/* Content container, clipped to match SVG */}
        <div
          className="relative flex items-center justify-center w-full p-8 overflow-hidden"
          style={{
            minHeight,
            zIndex: 2,
            clipPath: 'polygon(2px 24px, 100% 0px, calc(100% - 10px) calc(100% - 20px), 24px calc(100% - 4px))',
            WebkitClipPath: 'polygon(2px 24px, 100% 0px, calc(100% - 10px) calc(100% - 20px), 24px calc(100% - 4px))',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
} 