'use client';

import React from 'react';
import { Carousel, CarouselControls } from '@/components/specific/Carousel';
import type { CarouselApi } from '@/components/specific/Carousel';
import { RainbowContainer } from '@repo/design-system/components/ui/rainbow-container';

interface CarouselSectionProps {
  t: any;
  DOGE_ADDRESS: string;
}

export function CarouselSection({ t, DOGE_ADDRESS }: CarouselSectionProps) {
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
    <>
      <RainbowContainer className="carousel-wrapper">
        <Carousel setApi={setApi} />
      </RainbowContainer>
      <div className="carousel-controls-wrapper">
        <CarouselControls api={api} current={current} count={count} />
      </div>
    </>
  );
}
