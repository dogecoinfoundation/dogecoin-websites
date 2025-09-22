'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/../../packages/design-system/components/ui/popover';

interface TagsWithOverflowProps {
  tags: string[];
  maxVisibleTags?: number;
  className?: string;
  tagClassName?: string;
  overflowTagClassName?: string;
}

export function TagsWithOverflow({
  tags,
  maxVisibleTags = 5,
  className = 'content-card-tags',
  tagClassName = 'content-card-tag',
  overflowTagClassName = 'content-card-tag'
}: TagsWithOverflowProps) {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const calculateVisibleTags = () => {
    if (tags.length === 0) {
      setIsCalculated(true);
      return;
    }

    if (!containerRef.current || !measureRef.current) {
      // Fallback to simple count-based approach
      const visibleCount = Math.min(maxVisibleTags, tags.length);
      if (visibleCount < tags.length) {
        setVisibleTags(tags.slice(0, visibleCount));
        setHiddenTags(tags.slice(visibleCount));
      } else {
        setVisibleTags(tags);
        setHiddenTags([]);
      }
      setIsCalculated(true);
      return;
    }

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const measureTags = measureRef.current.children;
    
    let totalWidth = 0;
    let visibleCount = 0;
    const gap = 4;
    const overflowButtonWidth = 50; // Approximate width for "..." button

    for (let i = 0; i < Math.min(tags.length, measureTags.length); i++) {
      const tagElement = measureTags[i];
      if (!tagElement) continue;
      const tagWidth = tagElement.getBoundingClientRect().width;
      const widthWithGap = totalWidth + (i > 0 ? gap : 0) + tagWidth;
      
      // Check if we need overflow button space
      const remainingTags = tags.length - (i + 1);
      const needsOverflow = remainingTags > 0;
      const totalWidthWithOverflow = needsOverflow ? widthWithGap + gap + overflowButtonWidth : widthWithGap;

      if (totalWidthWithOverflow <= containerWidth && i < maxVisibleTags) {
        totalWidth = widthWithGap;
        visibleCount = i + 1;
      } else {
        break;
      }
    }

    // Always show at least one tag
    visibleCount = Math.max(1, visibleCount);

    if (visibleCount < tags.length) {
      setVisibleTags(tags.slice(0, visibleCount));
      setHiddenTags(tags.slice(visibleCount));
    } else {
      setVisibleTags(tags);
      setHiddenTags([]);
    }
    
    setIsCalculated(true);
    setHasLoadedOnce(true);
  };

  // Initial calculation
  useEffect(() => {
    setIsCalculated(false);
    setTimeout(calculateVisibleTags, 100);
  }, [tags, maxVisibleTags]);

  // Dynamic resize handling
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // For subsequent calculations, don't show loading if we've loaded once
      if (hasLoadedOnce) {
        // Don't set isCalculated to false - keep old tags visible during recalc
        calculateVisibleTags();
      } else {
        setIsCalculated(false);
        setTimeout(calculateVisibleTags, 50);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (tags.length === 0) return null;

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ minHeight: '32px' }} // Hard-coded space allocation
    >
      {/* Hidden measurement tags */}
      <div 
        ref={measureRef}
        className="absolute -top-full left-0 opacity-0 pointer-events-none flex"
        style={{ gap: '12px' }}
      >
        {tags.map((tag, index) => (
          <span key={`measure-${index}`} className={tagClassName}>
            {tag}
          </span>
        ))}
      </div>

      {/* Placeholder skeleton while calculating - only show on initial load */}
      {!isCalculated && !hasLoadedOnce && (
        <div className="flex animate-pulse" style={{ gap: '12px', minHeight: '32px' }}>
          <div className="bg-gray-200 rounded-full" style={{ 
            height: '32px', 
            minWidth: '60px',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            boxSizing: 'border-box'
          }}></div>
          <div className="bg-gray-200 rounded-full" style={{ 
            height: '32px', 
            minWidth: '48px',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            boxSizing: 'border-box'
          }}></div>
          <div className="bg-gray-200 rounded-full" style={{ 
            height: '32px', 
            minWidth: '72px',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            boxSizing: 'border-box'
          }}></div>
        </div>
      )}
      
      {/* Visible content - show after initial calculation OR keep visible during recalc */}
      {(isCalculated || hasLoadedOnce) && (
        <>
          {/* Visible tags */}
          {visibleTags.map((tag, index) => (
            <span key={`visible-${index}-${tag}`} className={tagClassName}>
              {tag}
            </span>
          ))}
          
          {/* Overflow indicator */}
          {hiddenTags.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <button className={`${overflowTagClassName} cursor-pointer hover:opacity-80 transition-opacity`}>
                  ...
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3 bg-white border border-gray-200 rounded-lg shadow-lg" align="start">
                <div className="flex flex-wrap" style={{ gap: '12px', maxWidth: '300px' }}>
                  {hiddenTags.map((tag, index) => (
                    <span key={`hidden-${index}-${tag}`} className={tagClassName}>
                      {tag}
                    </span>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
    </div>
  );
}