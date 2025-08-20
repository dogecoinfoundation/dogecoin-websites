'use client';

import React from 'react';
import { Carousel, CarouselControls } from '@/components/specific/Carousel';
import type { CarouselApi } from '@/components/specific/Carousel';
import { RainbowContainer } from '@repo/design-system/components/ui/rainbow-container';

export function CarouselSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isUserInteracting, setIsUserInteracting] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-progression effect
  React.useEffect(() => {
    if (!api || count === 0) return;

    const startAutoProgression = () => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Start auto-progression only if user is not interacting
      if (!isUserInteracting) {
        intervalRef.current = setInterval(() => {
          if (!isUserInteracting) {
            api.scrollNext();
          }
        }, 15000); // 15 seconds
      }
    };

    startAutoProgression();

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [api, count, isUserInteracting]);

  // Reset user interaction flag after a delay
  React.useEffect(() => {
    if (isUserInteracting) {
      const resetTimer = setTimeout(() => {
        setIsUserInteracting(false);
      }, 30000); // Resume auto-progression after 30 seconds of no interaction

      return () => clearTimeout(resetTimer);
    }
  }, [isUserInteracting]);

  const handleUserInteraction = React.useCallback(() => {
    setIsUserInteracting(true);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-rainbow-container">
        <RainbowContainer className="carousel-wrapper">
          <Carousel setApi={setApi} onUserInteraction={handleUserInteraction} />
        </RainbowContainer>
      </div>
      <div className="carousel-controls-wrapper">
        <CarouselControls 
          api={api} 
          current={current} 
          count={count} 
          onUserInteraction={handleUserInteraction} 
        />
      </div>
    </div>
  );
}
