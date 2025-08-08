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
            
            // Define rotation angles for each position (not card ID)
            const rotationAngles: { [key: number]: string } = {
              1: '1.624deg',    // Position 1 keeps its rotation
              2: '-3.857deg',   // Position 2 gets card 2's rotation
              3: '1.361deg',    // Position 3 gets card 3's rotation
              4: '0.344deg',    // Position 4 gets card 4's rotation
              5: '-0.616deg',   // Position 5 gets card 5's rotation
              6: '-3.251deg',   // Position 6 gets card 6's rotation
              7: '1.94deg',     // Position 7 gets card 7's rotation
              8: '0deg'         // Position 8 gets card 8's rotation
            };

            return (
              <div 
                key={card.id} 
                className="mission-card" 
                data-card={card.id}
                style={{ transform: `rotate(${rotationAngles[id] || '0deg'})` }}
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
            
            // Define rotation angles for each position (not card ID)
            const rotationAngles: { [key: number]: string } = {
              1: '1.624deg',    // Position 1 keeps its rotation
              2: '-3.857deg',   // Position 2 gets card 2's rotation
              3: '1.361deg',    // Position 3 gets card 3's rotation
              4: '0.344deg',    // Position 4 gets card 4's rotation
              5: '-0.616deg',   // Position 5 gets card 5's rotation
              6: '-3.251deg',   // Position 6 gets card 6's rotation
              7: '1.94deg',     // Position 7 gets card 7's rotation
              8: '0deg'         // Position 8 gets card 8's rotation
            };

            return (
              <div 
                key={card.id} 
                className="mission-card" 
                data-card={card.id}
                style={{ transform: `rotate(${rotationAngles[id] || '0deg'})` }}
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