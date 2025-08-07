import React from 'react';
import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export function Header({ children, className = '' }: HeaderProps) {
  return (
    <header className={`flex flex-col gap-8 items-center px-6 md:px-12 lg:px-12 xl:px-20 ${className}`}>
      {children}
    </header>
  );
};