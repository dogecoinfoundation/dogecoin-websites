'use client';

import React from 'react';
import { Logo } from '@/components/common/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '@/lib/assets';
import type { DogecoinDictionary } from '@/types/dictionary';
import { isSoftLaunchMode } from '@/lib/config/softlaunch';

interface FooterProps {
  t: DogecoinDictionary["dogecoin.org"]["home"];
}

export function Footer({ t }: FooterProps) {
  // Check if we should show simplified footer based on SOFTLAUNCH flag
  const showSimplifiedFooter = isSoftLaunchMode();
  
  if (showSimplifiedFooter) {
    return (
      <footer 
        className="footer" 
        style={{
          borderTop: '1px solid #2f2f2f',
          padding: '10px 20px',
          flexGrow: 0,
          color: '#696969'
        }}
      >
        <div className="footer__inner">
          <div className="footer__content flex justify-between items-center">
            <div className="footer__content-left flex items-center space-x-4">
              <div className="social-media-icons tooltip flex items-center">
                <a href="https://twitter.com/dogecoinfdn" target="_blank" rel="noopener" title="Twitter" style={{ color: '#696969' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#696969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="https://github.com/dogecoinfoundation" target="_blank" rel="noopener" title="Github" className="ml-2" style={{ color: '#696969' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#696969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77 5.44 5.44 0 003.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://www.reddit.com/r/dogecoindev" target="_blank" rel="noopener" title="Reddit" className="ml-2" style={{ color: '#696969' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#696969" stroke="none">
                    <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87s-7.004-2.176-7.004-4.87c0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249S9.937 12 9.249 12zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248S16 13.937 16 13.249c0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913s2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"></path>
                  </svg>
                </a>
              </div>
              <div style={{ color: '#696969' }}>© 2014-2025 Dogecoin foundation <a href="https://dogecoin.com" target="_blank" rel="nofollow noopener noreferrer" style={{ color: '#696969' }}>Dogecoin.com</a></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Original footer (when showSimplifiedFooter is false)
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
            <div className="footer-links-row">
              <div className="footer-links-item">
                <h4 className="footer-links-title">{t.footer.sections.main.title}</h4>
                <div className="footer-links">
                  <Link href="/" className="footer-link">{t.footer.sections.main.links.home}</Link>
                  <Link href="/about" className="footer-link">{t.footer.sections.main.links.about}</Link>
                  <Link href="/news" className="footer-link">{t.footer.sections.main.links.news}</Link>
                </div>
              </div>

              <div className="footer-links-item">
                <h4 className="footer-links-title">{t.footer.sections.social.title}</h4>
                <div className="footer-links">
                  <a href="https://x.com/DogecoinFdn" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer.sections.social.links.x}</a>
                  <a href="https://github.com/dogecoinfoundation" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer.sections.social.links.github}</a>
                  <a href="https://discord.com/invite/VEUMWpThg9" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer.sections.social.links.discord}</a>
                </div>
              </div>

              <div className="footer-links-item">
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
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <div className="footer-divider"></div>
              <p className="footer-copyright-text">
                {t.footer.copyright}
              </p>
            </div>
            <div className="footer-back-to-top">
              <button 
                className="back-to-top-button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Image
                  src={getAssetPath("/assets/images/back-to-top.png")}
                  alt={t.footer.backToTop}
                  width={242}
                  height={190}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
