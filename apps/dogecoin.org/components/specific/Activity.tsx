import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { BlurEffect } from '@/components/common/BlurEffect';

interface ActivityProps {
  title: string;
  subtitle: string;
  text: string;
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  color?: string;
  keyPoints?: string[];
  imageBorderRadius?: number;
}

export function Activity({
  title,
  subtitle,
  text,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  color = '#FF46CE',
  keyPoints,
  imageBorderRadius
}: ActivityProps) {
  const content = (
    <div className="flex flex-col justify-center flex-1">
      <div className="relative z-10">
        <h2 
          className="align-self-stretch text-white font-comic-neue text-5xl font-bold leading-[56px] mb-4"
          style={{
            fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
            fontSize: 'var(--Typography-Heading-H2-font-size, 48px)',
            fontWeight: 700,
            lineHeight: 'var(--Typography-Heading-H2-line-height, 56px)'
          }}
        >
          {title}
        </h2>
              <h4 
        className="align-self-stretch font-comic-neue text-2xl font-bold leading-8 mb-4"
        style={{
          fontFamily: '"Comic Neue"',
          fontSize: 'var(--Typography-Heading-H4-Font-size, 24px)',
          fontWeight: 700,
          lineHeight: 'var(--Typography-Heading-H4-Line-height, 32px)',
          color: color
        }}
      >
        {subtitle}
      </h4>
        <p 
          className="text-white font-comic-neue text-xl leading-[30px] mb-6"
          style={{
            fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
            fontSize: 'var(--Typography-Paragraph-Body-font-size, 20px)',
            fontWeight: 400,
            lineHeight: 'var(--Typography-Paragraph-Body-line-height, 30px)'
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        
        {keyPoints && keyPoints.length > 0 && (
          <div className="mb-6">
            <h5 
              className="font-comic-neue text-xl font-bold"
              style={{
                fontFamily: '"Comic Neue"',
                fontSize: '20px',
                fontWeight: 700,
                color: 'white'
              }}
            >
              Key Points
            </h5>
            <ul className="space-y-0.5">
              {keyPoints.map((point, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    display: 'flex',
                    paddingTop: '9px',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full border-2"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: `2px solid ${color}`,
                      backgroundColor: 'transparent'
                    }}
                  />
                  <span 
                    className="text-white font-comic-neue text-lg"
                    style={{
                      fontFamily: '"Comic Neue"',
                      fontSize: '18px',
                      fontWeight: 400,
                      lineHeight: '24px',
                      color: 'white'
                    }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex gap-4">
          {primaryText && (
            <button
              onClick={onPrimary}
              style={{
                display: 'flex',
                height: '64px',
                padding: '0 32px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '1000px',
                backgroundColor: color,
                color: 'var(--Colour-Text-text-primary-light, #201F1D)',
                fontFamily: 'var(--Typography-font-family-button, "Comic Neue")',
                fontSize: 'var(--Typography-Button-XLarge-font-size, 24px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--Typography-Button-XLarge-line-height, 32px)'
              }}
            >
              {primaryText}
            </button>
          )}
          {secondaryText && (
            <button
              onClick={onSecondary}
              style={{
                display: 'flex',
                height: '60px',
                padding: '0 32px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '1000px',
                border: `2px solid ${color}`,
                color: color,
                backgroundColor: 'transparent',
                fontFamily: 'var(--Typography-font-family-button, "Comic Neue")',
                fontSize: 'var(--Typography-Button-XLarge-font-size, 24px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--Typography-Button-XLarge-line-height, 32px)'
              }}
            >
              {secondaryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const image = (
    <div className="flex-shrink-0">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={400}
        height={400}
        className="w-[400px] h-[400px] object-cover"
        style={{
          width: '400px',
          height: '400px',
          aspectRatio: '1/1',
          borderRadius: imageBorderRadius ? `${imageBorderRadius}px` : '0px'
        }}
      />
    </div>
  );

  return (
    <div className="flex items-center gap-8 py-12 relative">
      <div className={`absolute -z-10 ${
        imagePosition === 'right' ? '-left-100 -top-120' : 'left-20 -top-120'
      }`}>
        <BlurEffect color={color} />
      </div>
      {imagePosition === 'left' ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
} 