import React from 'react';

interface BlurEffectProps {
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
  color?: string;
  offset?: {
    x?: number; // positive = right, negative = left
    y?: number; // positive = down, negative = up
  };
  scale?: {
    x?: number; // horizontal scaling factor
    y?: number; // vertical scaling factor
  } | number; // also support single number for backward compatibility
  transparency?: number; // 0 = fully transparent, 1 = fully opaque
}

export function BlurEffect({ 
  className = '', 
  width = 1462, 
  height = 1462,
  opacity = 0.2,
  color = 'currentColor',
  offset = { x: 0, y: 0 },
  scale = 1,
  transparency = 1
}: BlurEffectProps) {
  // Handle both object and number scale props
  const scaleX = typeof scale === 'object' ? scale.x ?? 1 : scale;
  const scaleY = typeof scale === 'object' ? scale.y ?? 1 : scale;
  
  // Combine opacity and transparency
  const finalOpacity = opacity * transparency;
  
  const transformStyle = {
    transform: `translate(${offset.x || 0}px, ${offset.y || 0}px) scale(${scaleX}, ${scaleY})`
  };

  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`} style={{ color }}>
      <svg 
        fill="none" 
        viewBox="0 0 1462 1462" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={className}
        style={transformStyle}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
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
        <g filter="url(#blur-filter)" opacity={finalOpacity}>
            <circle cx="731" cy="731" fill="currentColor" r="407"/>
        </g>
      </svg>
    </div>
  );
}