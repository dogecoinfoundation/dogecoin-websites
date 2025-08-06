import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section className={`flex flex-col gap-6 items-center px-6 md:px-10 lg:px-10 xl:px-16 py-8 md:py-14 ${className}`} id={id}>
      {children}
    </section>
  );
};

export default Section;
