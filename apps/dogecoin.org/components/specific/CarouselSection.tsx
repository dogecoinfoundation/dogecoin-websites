'use client';

import React from 'react';
import { Carousel, CarouselControls } from '@/components/specific/Carousel';
import type { CarouselApi } from '@/components/specific/Carousel';
import { RainbowContainer } from '@repo/design-system/components/ui/rainbow-container';

export function CarouselSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="carousel-container">
      <div className="carousel-rainbow-container">
        <RainbowContainer className="carousel-wrapper">
          <Carousel setApi={setApi} />
        </RainbowContainer>
      </div>
      <div className="carousel-controls-wrapper">
        <CarouselControls api={api} current={current} count={count} />
      </div>
    </div>
  );
}
