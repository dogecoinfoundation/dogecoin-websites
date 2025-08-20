'use client';

import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Container from './Container';
import { NavItem } from '../specific/NavItem';
import { Logo } from '../common/Logo';
import { LanguageSelector } from '../specific/LanguageSelector';
import Image from 'next/image';
import DogePaw from '../icons/DogePaw';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Remove locale prefix for active state comparison
  const pathnameWithoutLocale = pathname.replace(`/${String(locale)}`, '') || '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex flex-col gap-8 items-center px-6 md:px-12 lg:px-12 xl:px-20 py-6">
      <Container className="nav-container flex justify-between items-center">
        {/* Mobile menu toggle button */}
        <button 
          className="nav-mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <Image 
            src="/assets/svg/icons/menu.svg" 
            alt="Menu" 
            width={24} 
            height={24}
          />
        </button>

        {/* Logo - centered on mobile */}
        <div className="nav-logo">
          <Logo width={180} height={45} />
        </div>

        {/* Desktop navigation and language selector */}
        <div className="nav-right">
          <ul className="nav-items-desktop list-none flex">
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

      {/* Mobile menu overlay */}
      <div 
        className={`nav-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile menu */}
      <div className={`nav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-close">
          <button onClick={closeMobileMenu} aria-label="Close mobile menu">
            <Image 
              src="/assets/svg/icons/close.svg" 
              alt="Close" 
              width={32} 
              height={32}
            />
          </button>
        </div>
        <ul className="nav-mobile-items">
          {navItems.map((item) => (
            <li key={item.href} className="nav-item">
              <NavItem 
                href={item.href} 
                isActive={pathnameWithoutLocale === item.href || (item.href !== '/' && pathnameWithoutLocale.startsWith(item.href))}
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavItem>
            </li>
          ))}
        </ul>
        
        {/* Mobile nav footer */}
        <div className="nav-mobile-footer">
          <span>Do Only Good Everyday</span>
          <DogePaw className="w-4 h-4" />
        </div>
      </div>

      {children}
    </nav>
  );
}
