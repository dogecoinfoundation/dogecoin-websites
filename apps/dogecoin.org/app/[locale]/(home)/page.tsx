'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import { H1, H2 } from '@/components/typography';
import { BlurEffect } from '@/components/common/BlurEffect';
import Image from 'next/image';
import DogePaw from '@/components/icons/DogePaw';
import { Activity } from '@/components/specific/Activity';
import { ProfileImage } from '@/components/specific/ProfileImage';
import { PartnerBanner } from '@/components/specific/PartnerBanner';
import { MissionCards } from '@/components/specific/MissionCards';
import { DonationSection } from '@/components/specific/DonationSection';
import { CarouselSection } from '@/components/specific/CarouselSection';
import { DogeImage } from '@/components/specific/DogeImage';
// Removed server-only imports for client component
import { getAssetPath } from '@/lib/assets';

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

function usePartyMode() {
  const [isPartyMode, setIsPartyMode] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const originalSrcsRef = useRef<Map<HTMLImageElement, string>>(new Map());

  const switchToPartyImages = () => {
    const allImages = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    let convertedCount = 0;
    
    allImages.forEach((img) => {
      // Skip invalid images, SVGs, foundation logo, and flags
      if (!img.src || 
          img.src.includes('.svg') || 
          img.src.includes('logo-doge-foundation') ||
          img.src.includes('%2Fflags%2F') || // URL encoded /flags/
          img.src.includes('/flags/') ||
          img.className.includes('language-flag') ||
          originalSrcsRef.current.has(img)) {
        return;
      }
      
      // Store originals
      originalSrcsRef.current.set(img, img.src);
      if (img.srcset) {
        img.setAttribute('data-original-srcset', img.srcset);
      }
      
      // Convert both src and srcset to party versions
      const originalSrc = img.src;
      const originalSrcset = img.srcset;
      
      img.src = convertToPartySrc(img.src);
      if (img.srcset) {
        img.srcset = img.srcset.replace(/url=([^&]+)/g, (match, url) => {
          const decodedUrl = decodeURIComponent(url);
          const partyUrl = addPartyToFilename(decodedUrl);
          return `url=${encodeURIComponent(partyUrl)}`;
        });
      }
      
      // If party image doesn't exist, revert to original
      img.onerror = () => {
        img.src = originalSrc;
        if (originalSrcset) {
          img.srcset = originalSrcset;
        }
        img.removeAttribute('data-original-srcset');
        originalSrcsRef.current.delete(img);
      };
      
      convertedCount++;
    });
    
    console.log(`Party mode: Converted ${convertedCount} images to party versions`);
  };

  const revertToOriginalImages = () => {
    originalSrcsRef.current.forEach((originalSrc, img) => {
      // Revert src
      img.src = originalSrc;
      
      // Revert srcset if it exists
      const originalSrcset = img.getAttribute('data-original-srcset');
      if (originalSrcset) {
        img.srcset = originalSrcset;
        img.removeAttribute('data-original-srcset');
      }
      
      // Clear event handlers
      img.onload = null;
      img.onerror = null;
    });
    
    console.log(`Reverted ${originalSrcsRef.current.size} images to original versions`);
  };

  const convertToPartySrc = (src: string) => {
    if (src.includes('/_next/image')) {
      const url = new URL(src);
      const originalPath = decodeURIComponent(url.searchParams.get('url') || '');
      url.searchParams.set('url', addPartyToFilename(originalPath));
      url.searchParams.set('v', Date.now().toString());
      return url.toString();
    }
    return addPartyToFilename(src);
  };

  const addPartyToFilename = (path: string) => {
    const lastDotIndex = path.lastIndexOf('.');
    return lastDotIndex !== -1 
      ? `${path.substring(0, lastDotIndex)}-party${path.substring(lastDotIndex)}`
      : `${path}-party`;
  };

  const activatePartyMode = () => {
    setIsPartyMode(true);
    
    // Clear existing timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Fix any flags that were previously converted
    const flagImages = document.querySelectorAll('img[class*="flag"], img[src*="flags"]') as NodeListOf<HTMLImageElement>;
    flagImages.forEach(img => {
      const originalSrcset = img.getAttribute('data-original-srcset');
      if (originalSrcset) {
        img.srcset = originalSrcset;
        img.src = img.src.replace('-party', '');
        img.removeAttribute('data-original-srcset');
      }
    });
    
    // Clear previous image references for fresh start
    originalSrcsRef.current.clear();
    
    // Switch images to party versions  
    setTimeout(switchToPartyImages, 100);
    
    // Set 10-second timer to deactivate party mode
    timerRef.current = setTimeout(() => {
      setIsPartyMode(false);
      revertToOriginalImages();
      timerRef.current = null;
    }, 10000);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle image switching when party mode changes
  useEffect(() => {
    if (!isPartyMode) {
      // Only revert when party mode ends
      revertToOriginalImages();
    }
  }, [isPartyMode]);

  return { isPartyMode, activatePartyMode };
}

export default function Home({ params }: HomeProps) {
  const [dictionary, setDictionary] = useState<any>(null);
  const [locale, setLocale] = useState<string>('');
  const { isPartyMode, activatePartyMode } = usePartyMode();
  
  const DOGE_ADDRESS = 'D8r9gCj8YncjQmxBJmQzS6Ef7TCTonC1Nm';

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      const { locale: paramLocale } = resolvedParams;
      
      // Dynamic import for client-side dictionary loading
      console.log('Attempting to load dictionary for locale:', paramLocale);
      try {
        const dictionaryModule = await import(`@repo/internationalization/dictionaries/${paramLocale}.json`);
        const dict = dictionaryModule.default || dictionaryModule;
        
        console.log('Loaded dictionary for', paramLocale, ':', dict);
        if (dict && Object.keys(dict).length > 0) {
          setLocale(paramLocale);
          setDictionary(dict); // The dictionary already has the full structure including "dogecoin.org"
        } else {
          throw new Error('Dictionary is empty or invalid');
        }
      } catch (error) {
        console.error('Failed to load dictionary for', paramLocale, ':', error);
        // Fallback to English
        try {
          const enModule = await import(`@repo/internationalization/dictionaries/en.json`);
          const enDict = enModule.default || enModule;
          
          console.log('Fallback to English dictionary:', enDict);
          if (enDict && Object.keys(enDict).length > 0) {
            setLocale('en');
            setDictionary(enDict); // The English dictionary also has the full structure
          } else {
            throw new Error('English fallback dictionary is also empty');
          }
        } catch (enError) {
          console.error('Failed to load English fallback:', enError);
          // Final fallback with minimal structure
          setDictionary({ 
            'dogecoin.org': { 
              home: { 
                hero: { title: 'Loading Error', subtitle: 'Please refresh', tagline: '' }, 
                sections: {} 
              } 
            } 
          });
        }
      }
    };
    loadData();
  }, [params]);

  if (!dictionary) {
    return <div>Loading...</div>;
  }

  // Add safety check for dictionary structure
  if (!dictionary["dogecoin.org"] || !dictionary["dogecoin.org"].home) {
    console.error('Dictionary structure error:', dictionary);
    return <div>Error loading content. Please refresh the page.</div>;
  }

  const t = dictionary["dogecoin.org"].home;

  return (
    <>
      <Head>
        {/* Font imports will be handled via CSS @font-face with TTF files */}
      </Head>
      <div className={isPartyMode ? 'party-mode' : ''}>
        <Main>
        <Section>
          <Container className="flex flex-col relative">
            
            {/* Party Mode Test Button */}
            <button 
              onClick={activatePartyMode}
              className="party-test-button"
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
                padding: '10px 20px',
                backgroundColor: '#FF46CE',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🎉 PARTY MODE
            </button>
            
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-text-container relative">
                  <H1 className="hero-title">{t.hero.title}</H1>
                  <div className="hero-subtitle-wrap">
                    <H2 className="hero-subtitle">{t.hero.subtitle}</H2>
                  </div>
                  <div className="hero-tagline">{t.hero.tagline} <DogePaw className="hero-tagline-icon" /></div>
                  <div className="hero-blur-effect">
                    <BlurEffect color="#A88F33" scale={{ x: 3, y: 5 }} />
                  </div>
                </div>
              </div>
              <div className="hero-image-section">
                <DogeImage className="hero-image" width={400} height={400} />
              </div>
            </div>
            <CarouselSection />
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                {t.sections.activity.title}
              </h3>
              <Image
                src={getAssetPath("/assets/svg/home/activity-heading.svg")}
                alt="Section heading underline"
                width={146}
                height={26}
                className="section-heading-underline"
              />
            </div>

            <div className="section-content">
              <Activity
                title={t.sections.activity.gigawallet.title}
                subtitle={t.sections.activity.gigawallet.subtitle}
                text={t.sections.activity.gigawallet.text}
                primaryText={t.sections.activity.gigawallet.primaryText}
                secondaryText={t.sections.activity.gigawallet.secondaryText}
                imageSrc="/assets/images/activity-gigawallet.gif"
                imageAlt="GigaWallet animation"
                imagePosition="right"
                color="#FF46A5"
              />

              <Activity
                title={t.sections.activity.core.title}
                subtitle={t.sections.activity.core.subtitle}
                text={t.sections.activity.core.text}
                primaryText={t.sections.activity.core.primaryText}
                secondaryText={t.sections.activity.core.secondaryText}
                imageSrc="/assets/images/activity-dogecoin.png"
                imageAlt="Dogecoin Core logo"
                imagePosition="left"
                color="#FFFC36"
              />

              <Activity
                title={t.sections.activity.teamseas.title}
                subtitle={t.sections.activity.teamseas.subtitle}
                text={t.sections.activity.teamseas.text}
                primaryText={t.sections.activity.teamseas.primaryText}
                secondaryText={t.sections.activity.teamseas.secondaryText}
                imageSrc="/assets/images/activity-teamseas.png"
                imageAlt="TeamSeas logo"
                imagePosition="right"
                color="#2BF9FF"
                imageBorderRadius={32}
                keyPoints={t.sections.activity.teamseas.keyPoints}
              />

              <Activity
                title={t.sections.activity.kabosu.title}
                subtitle={t.sections.activity.kabosu.subtitle}
                text={t.sections.activity.kabosu.text}
                primaryText={t.sections.activity.kabosu.primaryText}
                imageSrc="/assets/images/activity-kabosu.png"
                imageAlt="Kabosu statue"
                imagePosition="left"
                color="#62FF46"
                imageBorderRadius={32}
                keyPoints={t.sections.activity.kabosu.keyPoints}
              />
            </div>
          </Container>
        </Section>

        <DonationSection t={t} DOGE_ADDRESS={DOGE_ADDRESS} />

        <Section>
          <Container>
            <div className="section-heading-container">
              <div className="mission-heading-with-svg">
                <Image
                  src={getAssetPath("/assets/svg/home/mission-heading.svg")}
                  alt="Mission heading"
                  width={131}
                  height={88}
                  className="mission-heading-svg"
                />
                <h3 className="section-heading">
                  {t.sections.mission.title}
                </h3>
              </div>
              <p className="section-description">
                {t.sections.mission.description}
              </p>
              
              <MissionCards cards={t.sections.mission.cards} />
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                {t.sections.members.title}
              </h3>
              <p className="section-description">
                {t.sections.members.description}
              </p>
              
              <div className="profile-grid">
                <ProfileImage
                  imageSrc="/assets/images/dp-1.jpg"
                  imageAlt="Donna"
                  name="Donna"
                  description={t.sections.members.profiles.donna.description}
                  color="#2BF9FF"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-2.jpg"
                  imageAlt="Dereck"
                  name="Dereck"
                  description={t.sections.members.profiles.dereck.description}
                  color="#9780FF"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-3.jpg"
                  imageAlt="David"
                  name="David"
                  description={t.sections.members.profiles.david.description}
                  color="#FF46CE"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-4.jpg"
                  imageAlt="Debbie"
                  name="Debbie"
                  description={t.sections.members.profiles.debbie.description}
                  color="#FFFC36"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-5.jpg"
                  imageAlt="Dick"
                  name="Dick"
                  description={t.sections.members.profiles.dick.description}
                  color="#FF7D47"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-6.png"
                  imageAlt="Erick"
                  name="Erick"
                  description={t.sections.members.profiles.erick.description}
                  color="#62FF46"
                />
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                {t.sections.partners.title}
              </h3>
              <p className="section-description">
                {t.sections.partners.description}
              </p>
              
              <div className="partners-list">
                <PartnerBanner
                  icon="/assets/images/houseofdoge-logo.png"
                  name={t.sections.partners.houseOfDoge.name}
                  description={t.sections.partners.houseOfDoge.description}
                  buttonText={t.sections.partners.houseOfDoge.buttonText}
                  buttonLink="https://www.houseofdoge.com/"
                  backgroundImage="/assets/images/houseofdoge-stars.jpeg"
                  lowerImage="/assets/images/houseofdoge-wave.png"
                />
              </div>
            </div>
          </Container>
        </Section>

      </Main>

      <Footer t={t} />
      </div>
    </>
  );
}
