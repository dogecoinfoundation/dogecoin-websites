import React, { ReactNode } from 'react';

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  target?: '_blank' | '_self';
  rel?: string;
  size?: 'sm' | 'base' | 'lg';
}

const sizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg'
};

export const Link: React.FC<LinkProps> = ({ 
  children, 
  href, 
  className = '',
  target = '_self',
  rel,
  size = 'base'
}) => {
  const defaultRel = target === '_blank' ? 'noopener noreferrer' : undefined;
  
  return (
    <a 
      href={href}
      target={target}
      rel={rel || defaultRel}
      className={`
        ${sizeClasses[size]}
        text-black/70 dark:text-white/70 
        hover:text-black dark:hover:text-white 
        transition-colors
        ${className}
      `}
    >
      {children}
    </a>
  );
};

export default Link;
