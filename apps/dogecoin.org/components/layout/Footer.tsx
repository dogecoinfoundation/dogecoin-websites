import React from 'react';
import { Logo } from '@/components/common/Logo';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-columns">
          {/* First Column - Logo and Description */}
          <div className="footer-column">
            <Logo width={180} height={45} />
            <p className="footer-description">
              The Shiba Inu is a Japanese breed of dog that was popularized as an online meme and represents Dogecoin. Dogecoin was created by Jackson Palmer & Shibetoshi Nakamoto.
            </p>
          </div>

          {/* Second Column - Navigation Links */}
          <div className="footer-column">
            <div className="footer-links-section">
              <div className="footer-links-group">
                <h4 className="footer-links-title">Main</h4>
                                       <div className="footer-links">
                         <Link href="/" className="footer-link">Home</Link>
                         <Link href="/about" className="footer-link">About</Link>
                         <Link href="/news" className="footer-link">News & Events</Link>
                       </div>
              </div>

              <div className="footer-links-group">
                <h4 className="footer-links-title">Social</h4>
                <div className="footer-links">
                  <a href="https://x.com/DogecoinFdn" target="_blank" rel="noopener noreferrer" className="footer-link">X</a>
                  <a href="https://github.com/dogecoinfoundation" target="_blank" rel="noopener noreferrer" className="footer-link">Github</a>
                  <a href="https://discord.com/invite/VEUMWpThg9" target="_blank" rel="noopener noreferrer" className="footer-link">Discord</a>
                </div>
              </div>

              <div className="footer-links-group">
                <h4 className="footer-links-title">Legal</h4>
                                       <div className="footer-links">
                         <Link href="/trademarks" className="footer-link">Trademarks</Link>
                         <Link href="/privacy" className="footer-link">Privacy Policy</Link>
                       </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright and Back to Top */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p className="footer-copyright-text">
              ©Copyright 2025, Dogecoin Foundation. All rights reserved.
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
              alt="Back to top"
              width={242}
              height={190}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
