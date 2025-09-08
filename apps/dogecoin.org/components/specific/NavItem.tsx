import React from 'react';
import DogePaw from '../icons/DogePaw';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavItem({ href, isActive = false, children, onClick }: NavItemProps) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`font-bold text-base flex items-center gap-2 px-4 py-3 transition-all transition-duration(200ms) ${
        isActive ? 'text-[var(--brand-primary-500)]' : 'text-white hover:text-[var(--brand-primary-500)]'
      }`}
    >
      {isActive && <DogePaw className="w-4 h-4 text-[var(--brand-primary-500)] flex-shrink-0" />}
      {children}
    </Link>
  );
} 