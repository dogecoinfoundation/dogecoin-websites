'use client';

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Container from './Container';
import { Logo } from '../common/Logo';
import { LanguageSelector } from '../specific/LanguageSelector';
import ArrowLeft from '../icons/ArrowLeft';
import { getNavPath } from '@/lib/assets';

interface NavSoftLaunchProps {
  children?: ReactNode;
  className?: string;
  t?: {
    home: string;
    about: string;
    projects: string;
    activities: string;
    blog: string;
  };
}

export function NavSoftLaunch({ children, className: _className = '', t }: NavSoftLaunchProps) {
  const pathname = usePathname();
  const { locale } = useParams();
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setHasScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="nav-main nav-scrolled">
      <Container className="nav-container flex justify-between items-center">
        {/* Back button */}
        <button 
          className="nav-back-button"
          onClick={handleBackClick}
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Logo - centered */}
        <div className="nav-logo">
          <Logo width={180} height={45} href={getNavPath('/', String(locale))} />
        </div>

        {/* Language selector */}
        <div className="nav-right">
          <LanguageSelector />
        </div>
      </Container>

      {children}
    </nav>
  );
}