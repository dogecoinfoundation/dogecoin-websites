'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Container from './Container';
import { NavItem } from '../specific/NavItem';
import { Logo } from '../common/Logo';
import { LanguageSelector } from '../specific/LanguageSelector';

interface NavProps {
  children?: ReactNode;
  className?: string;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export function Nav({ children, className: _className = '' }: NavProps) {
  const pathname = usePathname();
  const { locale } = useParams();
  
  // Remove locale prefix for active state comparison
  const pathnameWithoutLocale = pathname.replace(`/${String(locale)}`, '') || '/';

  return (
    <nav className="flex flex-col gap-8 items-center px-6 md:px-12 lg:px-12 xl:px-20 py-6">
      <Container className="flex justify-between items-center">
        <Logo width={180} height={45} />
        <div className="nav-right">
          <ul className="list-none flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavItem 
                  href={item.href} 
                  isActive={pathnameWithoutLocale === item.href || (item.href !== '/' && pathnameWithoutLocale.startsWith(item.href))}
                >
                  {item.label}
                </NavItem>
              </li>
            ))}
          </ul>
          <LanguageSelector />
        </div>
      </Container>
      {children}
    </nav>
  );
}
