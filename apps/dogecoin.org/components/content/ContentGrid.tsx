import React from 'react';

interface ContentGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentGrid({ children, className = '' }: ContentGridProps) {
  return (
    <div className={`content-grid ${className}`}>
      {children}
    </div>
  );
}