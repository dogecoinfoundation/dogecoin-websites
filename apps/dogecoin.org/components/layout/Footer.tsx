import React, { ReactNode } from 'react';
import Container from './Container';

interface FooterProps {
  children: ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ children, className = '' }) => {
  return (
    <footer className={`flex flex-col gap-8 items-center px-6 md:px-12 lg:px-12 xl:px-20 ${className}`}>
      <Container>
        {children}
      </Container>
    </footer>
  );
};

export default Footer;
