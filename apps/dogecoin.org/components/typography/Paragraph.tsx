import React from 'react';
import type { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const BaseParagraph: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return (
    <p className={`paragraph ${className}`}>
      {children}
    </p>
  );
};

const Leading: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return (
    <p className={`paragraph-lead leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

const Caption: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-black/70 dark:text-white/70 ${className}`}>
      {children}
    </p>
  );
};

export const P = Object.assign(BaseParagraph, {
  Leading,
  Caption
});