import React from 'react';
import type { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

const sizeClasses = {
  H1: 'text-4xl sm:text-6xl lg:text-8xl',
  H2: 'text-3xl sm:text-4xl lg:text-5xl',
  H3: 'text-2xl sm:text-3xl lg:text-4xl',
  H4: 'text-xl sm:text-2xl lg:text-3xl',
  H5: 'text-lg sm:text-xl lg:text-2xl'
};

const createHeading = (as: 'H1' | 'H2' | 'H3' | 'H4' | 'H5') => {
  const HeadingComponent: React.FC<HeadingProps> = ({ children, className = '' }) => {
    const Component = as.toLowerCase() as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    const baseClasses = `${sizeClasses[as]} font-bold`;
    
    return (
      <Component className={`${baseClasses} ${className}`}>
        {children}
      </Component>
    );
  };
  return HeadingComponent;
};

export const H1 = createHeading('H1');
export const H2 = createHeading('H2');
export const H3 = createHeading('H3');
export const H4 = createHeading('H4');
export const H5 = createHeading('H5');

