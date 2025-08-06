'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';
import Button from '@/components/common/Button';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

interface CarouselProps {
  className?: string;
}

const cards = [
  { id: 1, content: 'Card 1' },
  { id: 2, content: 'Card 2' },
  { id: 3, content: 'Card 3' },
  { id: 4, content: 'Card 4' },
  { id: 5, content: 'Card 5' },
];

const CARD_WIDTH = 260;
const CARD_GAP = 24;
const VISIBLE_CARDS = 3;

export function Carousel({ className = '' }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const maxIndex = cards.length - VISIBLE_CARDS;
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
    <div className={`flex flex-col items-center w-full ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full mb-8"
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

        {/* Carousel content, clipped to match SVG */}
        <div
          className="relative flex items-center justify-center w-full p-8 overflow-hidden"
          style={{
            minHeight,
            zIndex: 2,
            clipPath: 'polygon(2px 24px, 100% 0px, calc(100% - 10px) calc(100% - 20px), 24px calc(100% - 4px))',
            WebkitClipPath: 'polygon(2px 24px, 100% 0px, calc(100% - 10px) calc(100% - 20px), 24px calc(100% - 4px))',
          }}
        >
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${index * (CARD_WIDTH + CARD_GAP)}px)`,
              gap: CARD_GAP,
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            {cards.map((card, i) => (
              <div
                key={card.id}
                className="flex-shrink-0 bg-white/10 rounded-xl shadow-lg flex items-center justify-center text-xl font-bold"
                style={{
                  width: CARD_WIDTH,
                  height: 180,
                  marginRight: i === cards.length - 1 ? 0 : CARD_GAP,
                  opacity: i < index || i > index + 3 ? 0.5 : 1,
                  border: '2px solid rgba(255,255,255,0.1)',
                }}
              >
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          icon={<ChevronLeft />}
          size="lg" // Or any size you prefer
        />
        {/* Pagination dots */}D
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${i === index ? 'bg-link scale-125' : 'bg-white/30'
                }`}
            />
          ))}
        </div>
        <Button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          icon={<ChevronRight />}
          size="lg" // Or any size you prefer
        />
      </div>
    </div>
  );
}