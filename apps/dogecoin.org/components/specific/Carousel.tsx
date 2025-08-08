'use client';

import React from 'react';
import {
  Carousel as DesignSystemCarousel,
  CarouselContent,
  CarouselItem,
} from '@repo/design-system/components/ui/carousel';
import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';
import Image from 'next/image';

export interface CarouselApi {
  scrollSnapList: () => unknown[];
  selectedScrollSnap: () => number;
  on: (event: string, callback: () => void) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
}

interface CarouselProps {
  className?: string;
  setApi?: (api: CarouselApi) => void;
}

const cards = [
  { 
    id: 1, 
    title: 'Card 1',
    text: 'This is some sample text for the first card. It can contain multiple lines of content.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 2, 
    title: 'Card 2',
    text: 'Another card with different content. The text can be longer and wrap to multiple lines.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 3, 
    title: 'Card 3',
    text: 'Third card with its own unique content and description.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 4, 
    title: 'Card 4',
    text: 'Fourth card showcasing different content and layout.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 5, 
    title: 'Card 5',
    text: 'Fifth card with more sample content for demonstration.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 6, 
    title: 'Card 6',
    text: 'Sixth card with additional content and information.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 7, 
    title: 'Card 7',
    text: 'Seventh card with more sample text and content.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 8, 
    title: 'Card 8',
    text: 'Eighth card with different content and layout.',
    image: '/assets/images/placeholder.jpg'
  },
  { 
    id: 9, 
    title: 'Card 9',
    text: 'Ninth card with final sample content and description.',
    image: '/assets/images/placeholder.jpg'
  },
];

export function Carousel({ className = '', setApi: setApiProp }: CarouselProps) {
  const setApi = setApiProp;

  return (
    <div className={`w-full ${className}`}>
      <DesignSystemCarousel
        opts={{
          align: "start",
          loop: true,
          containScroll: "trimSnaps",
          dragFree: true,
          skipSnaps: false,
          inViewThreshold: 0.7,
        }}
        setApi={(newApi) => {
          console.log('Carousel API set:', newApi);
          if (setApi && newApi) {
            setApi(newApi as CarouselApi);
          }
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {cards.map((card) => (
            <CarouselItem key={card.id} className="carousel-item">
              <div className="carousel-card">
                {/* Image */}
                <Image 
                  src={card.image} 
                  alt={card.title}
                  width={400}
                  height={300}
                  className="carousel-card-image"
                />
                
                {/* Content area */}
                <div className="carousel-card-content">
                  {/* Title */}
                  <h3 className="carousel-card-title">
                    {card.title}
                  </h3>
                  
                  {/* Text */}
                  <p className="carousel-card-text">
                    {card.text}
                  </p>
                </div>
                
                {/* Button container - always at bottom */}
                <div className="carousel-card-button-container">
                  <button className="carousel-card-button">
                    Check it out
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </DesignSystemCarousel>
    </div>
  );
}

export function CarouselControls({ api, current, count }: { api: CarouselApi | null; current: number; count: number }) {
  console.log('CarouselControls render:', { api: !!api, current, count });
  
  return (
    <div className="carousel-controls-container">
      <button
        type="button"
        className="carousel-navigation-button"
        onClick={() => {
          console.log('Left button clicked, api:', api);
          if (api && typeof api.scrollPrev === 'function') {
            api.scrollPrev();
          }
        }}
      >
        <ChevronLeft className="carousel-navigation-icon" />
      </button>
      
      {/* Pagination dots */}
      <div className="carousel-pagination-container">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`carousel-pagination-dot ${
              i === current - 1 ? 'carousel-pagination-dot-active' : 'carousel-pagination-dot-inactive'
            }`}
            onClick={() => {
              console.log('Pagination dot clicked:', i);
              if (api && typeof api.scrollTo === 'function') {
                api.scrollTo(i);
              }
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="19" 
              viewBox="0 0 20 19" 
              fill="none"
              className="w-full h-full"
            >
              <path 
                d="M6.55432 0.442041C6.59644 0.442543 6.63964 0.444472 6.68256 0.447615C8.39196 0.723385 9.33186 2.41278 9.46805 3.90254C9.66707 5.25436 9.02967 6.99185 7.44156 7.29475C7.21121 7.33574 6.97185 7.31701 6.74668 7.25991C4.83432 6.66059 3.97852 4.54378 4.25495 2.79039C4.3353 1.65795 5.24869 0.426479 6.55432 0.442041ZM13.8014 0.514512C14.8643 0.538897 15.6922 1.54643 15.8607 2.49353C16.2157 4.36995 15.3025 6.70141 13.2109 7.29475C13.015 7.33457 12.8123 7.33868 12.6144 7.31008C11.2007 7.08988 10.6018 5.60851 10.661 4.41263C10.7035 2.8351 11.5803 1.01102 13.3331 0.567471C13.4934 0.527761 13.6495 0.511028 13.8014 0.514512ZM1.92277 5.84393C3.76152 5.94675 5.02213 7.66146 5.20184 9.26263C5.44518 10.4174 4.78646 11.962 3.37665 12.0542C1.41086 12.0315 0.0698032 10.0683 0.0140839 8.37903C-0.110258 7.2618 0.593895 5.90562 1.92277 5.84393ZM18.0169 6.22441C18.7992 6.21812 19.5685 6.65606 19.8242 7.39928C20.5062 9.3874 19.1366 11.9053 16.8836 12.3231C15.9433 12.4735 15.1171 11.7986 14.884 10.9866C14.3899 9.24976 15.4047 7.23303 17.1222 6.44461C17.402 6.29784 17.7108 6.22687 18.0169 6.22441ZM9.77374 9.78944C11.3073 9.79249 12.865 10.5199 13.858 11.6026C14.9306 12.8646 15.8092 14.3332 16.1529 15.9258C16.5705 17.0722 15.6241 18.3916 14.3128 18.3996C12.7354 18.4405 11.3796 17.4281 9.81102 17.3529C8.48018 17.1633 7.28854 17.8103 6.09206 18.2337C5.07333 18.641 3.66563 18.4849 3.14552 17.4602C2.73642 16.4158 3.33858 15.3022 3.83742 14.3746C4.85486 12.8692 5.94486 11.2869 7.61305 10.3469C8.2817 9.95955 9.02477 9.78794 9.77374 9.78944Z" 
                fill="var(--Base-Brand-color-primary-500, #E3A849)"
              />
            </svg>
          </button>
        ))}
      </div>
      
      <button
        type="button"
        className="carousel-navigation-button"
        onClick={() => {
          console.log('Right button clicked, api:', api);
          if (api && typeof api.scrollNext === 'function') {
            api.scrollNext();
          }
        }}
      >
        <ChevronRight className="carousel-navigation-icon" />
      </button>
    </div>
  );
}