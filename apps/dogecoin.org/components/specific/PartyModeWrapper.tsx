'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

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
      
      // If party image doesn't exist, revert to original immediately
      img.onerror = () => {
        console.log(`Party image not found for ${img.src}, reverting to original: ${originalSrc}`);
        img.onerror = null; // Prevent infinite loops
        img.src = originalSrc;
        if (originalSrcset) {
          img.srcset = originalSrcset;
        }
        img.removeAttribute('data-original-srcset');
        // Keep the image in originalSrcsRef so it can be properly cleaned up later
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
    // Don't add -party if it already exists
    if (path.includes('-party')) {
      return path;
    }
    const lastDotIndex = path.lastIndexOf('.');
    return lastDotIndex !== -1 
      ? `${path.substring(0, lastDotIndex)}-party${path.substring(lastDotIndex)}`
      : `${path}-party`;
  };

  const createConfetti = (buttonElement: HTMLButtonElement) => {
    const colors = ['#FF46CE', '#FFFC36', '#2BF9FF', '#62FF46', '#FF7D47', '#9780FF'];
    
    // Get button position relative to viewport
    const rect = buttonElement.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    // Main confetti burst
    confetti({
      particleCount: 100,
      spread: 180,
      origin: { x, y },
      scalar: 1.5,
      colors: colors
    });
    
    // Add some doge colours
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      scalar: 1.2,
      colors: ['#C9AD49, #DBC977, #D1C579, #F2EFB9 '],
    });
  };

  const activatePartyMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    // If already in party mode, just reset the timer and add confetti
    if (isPartyMode) {
      createConfetti(event.currentTarget);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Reset 10-second timer
      timerRef.current = setTimeout(() => {
        setIsPartyMode(false);
        revertToOriginalImages();
        originalSrcsRef.current.clear();
        timerRef.current = null;
      }, 10000);
      return;
    }
    
    setIsPartyMode(true);
    
    // Trigger confetti from button position
    createConfetti(event.currentTarget);
    
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
      originalSrcsRef.current.clear();
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

interface PartyModeWrapperProps {
  children: React.ReactNode;
}

export function PartyModeWrapper({ children }: PartyModeWrapperProps) {
  const { isPartyMode, activatePartyMode } = usePartyMode();
  
  return (
    <div className={isPartyMode ? 'party-mode' : ''}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === 'button') {
          const props = child.props as any;
          if (props.className?.includes('party-mode-button')) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: activatePartyMode
            });
          }
        }
        return child;
      })}
    </div>
  );
}