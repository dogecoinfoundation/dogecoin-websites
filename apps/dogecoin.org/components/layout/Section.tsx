import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section className={`flex flex-col gap-8 items-center px-6 md:px-12 lg:px-12 xl:px-20 ${className}`} id={id}>
      {children}
    </section>
  );
};

export default Section;
