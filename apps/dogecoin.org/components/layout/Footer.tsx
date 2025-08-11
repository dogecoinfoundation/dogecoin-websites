'use client';

import React from 'react';
import { Logo } from '@/components/common/Logo';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  t: any; // Dictionary object for translations
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-column">
            <Logo width={180} height={45} />
            <p className="footer-description">
              {t.footer.description}
            </p>
          </div>

          <div className="footer-column">
            <div className="footer-links-section">
              <div className="footer-links-group">
                <h4 className="footer-links-title">{t.footer.sections.main.title}</h4>
                <div className="footer-links">
                  <Link href="/" className="footer-link">{t.footer.sections.main.links.home}</Link>
                  <Link href="/about" className="footer-link">{t.footer.sections.main.links.about}</Link>
                  <Link href="/news" className="footer-link">{t.footer.sections.main.links.news}</Link>
                </div>
              </div>

              <div className="footer-links-group">
                <h4 className="footer-links-title">{t.footer.sections.social.title}</h4>
                <div className="footer-links">
                  <a href="https://x.com/DogecoinFdn" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer.sections.social.links.x}</a>
                  <a href="https://github.com/dogecoinfoundation" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer.sections.social.links.github}</a>
                  <a href="https://discord.com/invite/VEUMWpThg9" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer.sections.social.links.discord}</a>
                </div>
              </div>

              <div className="footer-links-group">
                <h4 className="footer-links-title">{t.footer.sections.legal.title}</h4>
                <div className="footer-links">
                  <Link href="/trademarks" className="footer-link">{t.footer.sections.legal.links.trademarks}</Link>
                  <Link href="/privacy" className="footer-link">{t.footer.sections.legal.links.privacy}</Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p className="footer-copyright-text">
              {t.footer.copyright}
            </p>
          </div>
          <button 
            className="back-to-top-button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Image
              src="/assets/images/back-to-top.png"
              alt={t.footer.backToTop}
              width={242}
              height={190}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
