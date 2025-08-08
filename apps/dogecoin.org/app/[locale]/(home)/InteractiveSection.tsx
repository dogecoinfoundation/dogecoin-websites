'use client';

import React from 'react';
import { Carousel, CarouselControls } from '@/components/specific/Carousel';
import type { CarouselApi } from '@/components/specific/Carousel';
import { RainbowContainer } from '@repo/design-system/components/ui/rainbow-container';
import { DonationButton } from '@/components/specific/DonationButton';

interface InteractiveSectionProps {
  t: any;
  DOGE_ADDRESS: string;
}

export function InteractiveSection({ t, DOGE_ADDRESS }: InteractiveSectionProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  const [selectedDonation, setSelectedDonation] = React.useState<string>('69');
  const [customAmount, setCustomAmount] = React.useState<string>('');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <RainbowContainer className="carousel-wrapper">
        <Carousel setApi={setApi} />
      </RainbowContainer>
      <div className="carousel-controls-wrapper">
        <CarouselControls api={api} current={current} count={count} />
      </div>

      <div className="donation-section">
        <div className="donation-section-grid">
          <div>
            <h3 className="donation-section-heading">{t.sections.donation.steps.select}</h3>
            <div className="donation-buttons-container">
              <DonationButton
                amount="69"
                quote={t.sections.donation.buttons["69"].quote}
                quoteColor="#FF46CE"
                isSelected={selectedDonation === '69'}
                onSelect={() => {
                  setSelectedDonation('69');
                  setCustomAmount('');
                }}
              />
              <DonationButton
                amount="1337"
                quote={t.sections.donation.buttons["1337"].quote}
                quoteColor="#62FF46"
                isSelected={selectedDonation === '1337'}
                onSelect={() => {
                  setSelectedDonation('1337');
                  setCustomAmount('');
                }}
              />
              <DonationButton
                amount="9999.99"
                quote={t.sections.donation.buttons["9999"].quote}
                quoteColor="#FF7D47"
                isSelected={selectedDonation === '9999.99'}
                onSelect={() => {
                  setSelectedDonation('9999.99');
                  setCustomAmount('');
                }}
              />
              <div>
                <DonationButton
                  amount=""
                  quote=""
                  isCustom={true}
                  isSelected={selectedDonation === 'custom'}
                  hasError={customAmount ? !/^[0-9]*\.?[0-9]*$/.test(customAmount) : false}
                  customValue={customAmount}
                  onSelect={() => setSelectedDonation('custom')}
                  onAmountChange={(amount) => {
                    setCustomAmount(amount);
                    if (amount) setSelectedDonation('custom');
                  }}
                  onFocus={() => setSelectedDonation('custom')}
                />
                {customAmount && !/^[0-9]*\.?[0-9]*$/.test(customAmount) && (
                  <div className="validation-error">
                    {t.sections.donation.buttons.custom.validationError}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="donation-qr-container">
            <h3 className="donation-section-heading">{t.sections.donation.steps.scan}</h3>
            <div className="donation-qr-code">
              {(!customAmount || /^[0-9]*\.?[0-9]*$/.test(customAmount)) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<doge-qr
                      address="${DOGE_ADDRESS}"
                      amount="${selectedDonation === 'custom' ? (customAmount || '69') : (selectedDonation || '69')}"
                      size="md"
                      background="transparent"
                      fill="#FFFFFF">
                    </doge-qr>`
                  }}
                />
              )}
            </div>
            <h3 className="donation-section-heading">{t.sections.donation.steps.walletAddress}</h3>
            <div className="wallet-address-container">
              <p className="donation-section-text">{DOGE_ADDRESS}</p>
              <button 
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(DOGE_ADDRESS).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }).catch(err => {
                    console.error('Failed to copy:', err);
                  });
                }}
              >
                {copied ? (
                  <div className="copy-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#62FF46"/>
                    </svg>
                    <span className="copy-text">{t.sections.donation.copy.success}</span>
                  </div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M34 8.44189C36.2091 8.44187 38 10.2327 38 12.4419L38 26.6921C38 27.7966 38.8954 28.6921 40 28.6921C41.1046 28.6921 42 27.7966 42 26.6921L42 12.4419C42 8.02358 38.4182 4.44184 33.9999 4.44189L19.75 4.44206C18.6454 4.44207 17.75 5.33751 17.75 6.44208C17.75 7.54665 18.6455 8.44207 19.75 8.44206L34 8.44189ZM34.5 18.4421C34.5 14.8522 31.5899 11.9421 28 11.9421L14.5 11.9421C10.9101 11.9421 8 14.8522 8 18.4421V37.9421C8 41.5319 10.9102 44.4421 14.5 44.4421L28 44.4421C31.5899 44.4421 34.5 41.5319 34.5 37.9421L34.5 18.4421ZM28 15.9421C29.3807 15.9421 30.5 17.0613 30.5 18.4421L30.5 37.9421C30.5 39.3228 29.3807 40.4421 28 40.4421L14.5 40.4421C13.1193 40.4421 12 39.3228 12 37.9421L12 18.4421C12 17.0613 13.1193 15.9421 14.5 15.9421L28 15.9421Z" fill="white"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 