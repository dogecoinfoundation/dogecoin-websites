import React from 'react';
import DogePaw from '../icons/DogePaw';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export function NavItem({ href, isActive = false, children }: NavItemProps) {
  return (
    <Link 
      href={href}
      className={`font-bold text-base flex items-center gap-2 px-4 py-3 transition-all transition-duration(200ms) ${
        isActive ? 'text-[var(--color-link)]' : 'text-white hover:text-[var(--color-link)]'
      }`}
    >
      {isActive && <DogePaw className="w-4 h-4 text-[var(--color-link)]" />}
      {children}
    </Link>
  );
} 