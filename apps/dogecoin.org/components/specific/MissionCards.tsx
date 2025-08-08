'use client';

import React from 'react';

interface MissionCard {
  id: number;
  title: string;
  description: string;
}

interface MissionCardsProps {
  cards: MissionCard[];
}

export function MissionCards({ cards }: MissionCardsProps) {
  return (
    <div className="mission-cards-container">
      <div className="mission-cards-grid">
        {/* Left Column */}
        <div className="mission-cards-column">
          {[1, 3, 5, 7].map(id => {
            const card = cards.find(c => c.id === id);
            if (!card) return null;
            
            const rotationAngles: Record<number, string> = {
              1: '1.624deg', 
              2: '-3.857deg',
              3: '1.361deg', 
              4: '0.344deg', 
              5: '-0.616deg',
              6: '-3.251deg',
              7: '1.94deg',  
              8: '0deg'      
            };

            return (
              <div 
                key={card.id} 
                className="mission-card" 
                data-card={card.id}
                style={{ transform: `rotate(${rotationAngles[id] ?? '0deg'})` }}
              >
                <div className="mission-card-number">{card.id}</div>
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
          {[2, 4, 6, 8].map(id => {
            const card = cards.find(c => c.id === id);
            if (!card) return null;
            
            const rotationAngles: Record<number, string> = {
              1: '1.624deg',
              2: '-3.857deg',
              3: '1.361deg',
              4: '0.344deg',
              5: '-0.616deg',
              6: '-3.251deg',
              7: '1.94deg',
              8: '0deg'
            };

            return (
              <div 
                key={card.id} 
                className="mission-card" 
                data-card={card.id}
                style={{ transform: `rotate(${rotationAngles[id] ?? '0deg'})` }}
              >
                <div className="mission-card-number">{card.id}</div>
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