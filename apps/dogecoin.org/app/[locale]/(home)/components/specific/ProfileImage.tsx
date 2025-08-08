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
          width={200}
          height={200}
          className="profile-image-img"
        />
      </div>
      <div 
        className="profile-info-box"
        style={{ backgroundColor: color }}
      >
        <h4 className="profile-name">{name}</h4>
        <p className="profile-description">{description}</p>
      </div>
    </div>
  );
}; 