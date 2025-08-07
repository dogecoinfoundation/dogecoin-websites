import React from 'react';
import Image from 'next/image';
import { BlurEffect } from '@/components/common/BlurEffect';

interface ActivityProps {
  title: string;
  subtitle: string;
  text: string;
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  color?: string;
  keyPoints?: string[];
  imageBorderRadius?: number;
}

export function Activity({
  title,
  subtitle,
  text,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  color = '#FF46CE',
  keyPoints,
  imageBorderRadius
}: ActivityProps) {
  const content = (
    <div className="activity-content">
      <div className="activity-content-inner">
        <h2 className="activity-title">
          {title}
        </h2>
        <h4 
          className="activity-subtitle"
          style={{ color: color }}
        >
          {subtitle}
        </h4>
        <p 
          className="activity-description"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        
        {keyPoints && keyPoints.length > 0 && (
          <div className="activity-key-points">
            <h5 className="activity-key-points-title">
              Key Points
            </h5>
            <ul className="activity-key-points-list">
              {keyPoints.map((point, index) => (
                <li key={index} className="activity-key-points-item">
                  <div 
                    className="activity-key-points-bullet"
                    style={{ border: `2px solid ${color}` }}
                  />
                  <span className="activity-key-points-text">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="activity-buttons">
          {primaryText && (
            <button
              onClick={onPrimary}
              className="activity-button-primary"
              style={{ backgroundColor: color }}
            >
              {primaryText}
            </button>
          )}
          {secondaryText && (
            <button
              onClick={onSecondary}
              className="activity-button-secondary"
              style={{ 
                borderColor: color,
                color: color
              }}
            >
              {secondaryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const image = (
    <div className="activity-image-container">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={400}
        height={400}
        className="activity-image"
        style={{
          borderRadius: imageBorderRadius ? `${imageBorderRadius}px` : '0px'
        }}
      />
    </div>
  );

  return (
    <div className="activity-container">
      <div className={`activity-blur-effect ${
        imagePosition === 'right' ? 'activity-blur-effect-right' : 'activity-blur-effect-left'
      }`}>
        <BlurEffect color={color} />
      </div>
      {imagePosition === 'left' ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
} 