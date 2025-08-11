'use client';

import React from 'react';
import { BlurEffect } from '@/components/common/BlurEffect';

type MissionCard = {
  title: string;
  description: string;
};

interface MissionCardsProps {
  cards: MissionCard[];
}

export function MissionCards({ cards }: MissionCardsProps) {
  return (
    <div className="mission-cards-container">
      <div className="mission-cards-grid">
        <div className="mission-cards-blur-container">
          <div className="mission-cards-blur-columns">
            <div className="mission-cards-blur-column">
              <BlurEffect color="#62FF46" scale={{ x: 3, y: 2 }} transparency={0.5} offset={{ x: -100, y: 200 }}/>
            </div>
            <div className="mission-cards-blur-column">
              <BlurEffect color="#2BF9FF" scale={{ x: 3, y: 2 }} transparency={0.5} offset={{ x: 0, y: -200 }}/>
            </div>
          </div>
        </div>
        {/* Left Column */}
        <div className="mission-cards-column">
          {[0, 2, 4, 6].map(index => {
            const card = cards[index];
            if (!card) return null;
            
            const cardId = index + 1;
            const rotationAngles: Record<number, string> = {
              1: '1.624deg', 
              2: '-3.857deg',
              3: '0deg', 
              4: '1.361deg', 
              5: '0.344deg',
              6: '-3.251deg',
              7: '-0.616deg',  
              8: '1.94deg'      
            };

            return (
              <div 
                key={cardId} 
                className="mission-card" 
                data-card={cardId}
                style={{ transform: `rotate(${rotationAngles[cardId] ?? '0deg'})` }}
              >
                <div className="mission-card-number">{cardId}</div>
                <div className="mission-card-content">
                  <h4 className="mission-card-heading">{card.title}</h4>
                  <p className="mission-card-text">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right Column */}
        <div className="mission-cards-column">
          {[1, 3, 5, 7].map(index => {
            const card = cards[index];
            if (!card) return null;
            
            const cardId = index + 1;
            const rotationAngles: Record<number, string> = {
              1: '1.624deg',
              2: '-3.857deg',
              3: '0deg',
              4: '1.361deg',
              5: '0.344deg',
              6: '-3.251deg',
              7: '-0.616deg',
              8: '1.94deg'
            };

            return (
              <div 
                key={cardId} 
                className="mission-card" 
                data-card={cardId}
                style={{ transform: `rotate(${rotationAngles[cardId] ?? '0deg'})` }}
              >
                <div className="mission-card-number">{cardId}</div>
                <div className="mission-card-content">
                  <h4 className="mission-card-heading">{card.title}</h4>
                  <p className="mission-card-text">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 