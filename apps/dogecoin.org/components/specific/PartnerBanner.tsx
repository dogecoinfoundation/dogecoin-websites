import React from 'react';
import Image from 'next/image';
import { BlurEffect } from '@/components/common/BlurEffect';

interface PartnerBannerProps {
  icon: string;
  name: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  lowerImage: string;
}

export const PartnerBanner: React.FC<PartnerBannerProps> = ({
  icon,
  name,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  lowerImage
}) => {
  return (
    <div className="partner-banner">
      <div className={`partner-blur-effect`}>
        <BlurEffect color="#A88F33" scale={{ x: 3, y: 1.5 }} transparency={1}/>
      </div>
      <div 
        className="partner-banner-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >

        <div className="partner-banner-content">
          <div className="partner-banner-left">
            <div className="partner-logo-container">
              <Image
                src={icon}
                alt={`${name} logo`}
                width={320}
                height={320}
                className="partner-logo"
              />
            </div>
          </div>
          
          <div className="partner-banner-right">
            <div className="partner-info">
              <h3 className="partner-name">{name}</h3>
              <p className="partner-description">{description}</p>
              <a 
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-button"
              >
                {buttonText}
              </a>
            </div>
          </div>
        </div>
        
        <div className="partner-lower-image">
          <Image
            src={lowerImage}
            alt="Partner decoration"
            width={1200}
            height={200}
            className="partner-lower-img"
          />
        </div>
      </div>
    </div>
  );
}; 