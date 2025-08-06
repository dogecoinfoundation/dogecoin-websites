import React from 'react';
import Image from 'next/image';

interface DogeImageProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function DogeImage({ 
  className = '', 
  width = 400, 
  height = 400,
  priority = false 
}: DogeImageProps) {
  return (
    <Image
      src="/assets/images/Doge.png"
      alt="Doge"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
} 