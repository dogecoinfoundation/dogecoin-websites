import React from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/assets';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  color: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  color,
  className = ''
}) => {
  return (
    <div className={`project-card ${className}`}>
      <div className="project-card-image-container">
        <div className="project-card-image-placeholder">
          <Image
            src={getAssetPath(imageSrc)}
            alt={imageAlt}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            quality={100}
            className="project-card-image"
          />
        </div>
      </div>
      <div className="project-card-content">
        <div 
          className="project-card-accent"
          style={{ backgroundColor: color }}
        ></div>
        <h4 className="project-card-title">{title}</h4>
        <p className="project-card-description">{description}</p>
      </div>
    </div>
  );
};