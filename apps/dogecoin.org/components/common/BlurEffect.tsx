import React from 'react';

interface BlurEffectProps {
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
  color?: string;  // new prop
}

export function BlurEffect({ 
  className = '', 
  width = 1462, 
  height = 1462,
  opacity = 0.2,
  color = 'currentColor'  // default
}: BlurEffectProps) {
  return (
    <div className="absolute" style={{ color }}>
      <svg 
        fill="none" 
        height={height} 
        viewBox="0 0 1462 1462" 
        width={width} 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={className}
      >
        <filter 
            id="blur-filter" 
            colorInterpolationFilters="sRGB" 
            filterUnits="userSpaceOnUse" 
            height="1462" 
            width="1462" 
            x="0" 
            y="0"
        >
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape"/>
            <feGaussianBlur result="effect1_foregroundBlur_900_10126" stdDeviation="162"/>
        </filter>
        <g filter="url(#blur-filter)" opacity={opacity}>
            <circle cx="731" cy="731" fill="currentColor" r="407"/>
        </g>
      </svg>
    </div>
  );
}
