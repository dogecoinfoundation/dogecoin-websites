import React from 'react';
import Image from 'next/image';

interface ProfileImageProps {
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  color: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  imageSrc,
  imageAlt,
  name,
  description,
  color
}) => {
  return (
    <div className="profile-image-container">
      <div 
        className="profile-image"
        style={{ borderColor: color }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
          quality={100}
          className="profile-image-img"
        />
      </div>
      <div 
        className="profile-info-box"
        style={{ backgroundColor: color }}
      >
        <h4 className="profile-name" style={{ margin: '0 0 0 0' }}>{name}</h4>
        <p className="profile-description" style={{ margin: '0' }}>{description}</p>
      </div>
    </div>
  );
}; 