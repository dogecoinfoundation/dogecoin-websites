import React from 'react';
import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className = '' }) => {
  return (
    <main className={`flex-1 ${className}`}>
      {children}
    </main>
  );
};

export default Main;
