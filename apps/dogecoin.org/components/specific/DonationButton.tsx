import React from 'react';

interface DonationButtonProps {
  amount: string;
  quote: string;
  quoteColor?: string;
  isSelected?: boolean;
  isCustom?: boolean;
  hasError?: boolean;
  customValue?: string;
  onSelect: () => void;
  onAmountChange?: (amount: string) => void;
  onFocus?: () => void;
}

export function DonationButton({ 
  amount, 
  quote, 
  quoteColor = '#62FF46',
  isSelected = false, 
  isCustom = false, 
  hasError = false,
  customValue = '',
  onSelect, 
  onAmountChange,
  onFocus
}: DonationButtonProps) {
  return (
    <div 
      className={`donation-button ${isSelected ? 'donation-button-selected' : ''}`}
      onClick={!isCustom ? onSelect : undefined}
    >
      {/* D SVG */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="25" 
        viewBox="0 0 28 25" 
        fill="none"
        className="donation-button-icon"
      >
        <path 
          d="M14.6846 0.441895C17.3061 0.441895 19.6175 0.947694 21.6182 1.95947C23.6188 2.94828 25.1827 4.33969 26.3096 6.1333C27.4364 7.92703 28 10.0545 28 12.5151C28 14.9528 27.4364 17.0802 26.3096 18.897C25.1827 20.6907 23.6188 22.0931 21.6182 23.105C19.6174 24.0938 17.3062 24.5884 14.6846 24.5884H3.71484V14.9175H0V9.98975H3.71484V0.441895H14.6846ZM9.30371 9.98975H12.9355V14.9175H9.30371V20.0005H14.4092C16.0188 20.0004 17.4102 19.7019 18.583 19.104C19.7788 18.4831 20.6989 17.6087 21.3428 16.4819C22.0095 15.3552 22.3428 14.0328 22.3428 12.5151C22.3428 10.9745 22.0096 9.65212 21.3428 8.54834C20.6989 7.42159 19.7787 6.55934 18.583 5.96143C17.4102 5.34055 16.0188 5.02983 14.4092 5.02979H9.30371V9.98975Z" 
          fill="var(--Base-Brand-color-primary-500, #E3A849)"
        />
      </svg>
      
      {/* Amount */}
      <span className="donation-button-amount">
        {isCustom ? (
          <input
            type="text"
            inputMode="decimal"
            placeholder="Enter amount"
            value={customValue}
            className={`donation-button-input ${hasError ? 'error' : ''}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onAmountChange?.(e.target.value);
            }}
            onFocus={() => {
              onFocus?.();
            }}
          />
        ) : (
          amount
        )}
      </span>
      
      {/* Quote */}
      <span 
        className={`donation-button-quote ${amount === '69' ? 'donation-button-quote-rotated' : ''}`}
        style={{ color: quoteColor }}
      >
        {quote}
      </span>
    </div>
  );
} 