'use client';

import React from 'react';
import { Section } from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { BlurEffect } from '@/components/common/BlurEffect';
import Image from 'next/image';
import { DonationButton } from '@/components/specific/DonationButton';

interface DonationSectionProps {
  t: any;
  DOGE_ADDRESS: string;
}

export function DonationSection({ t, DOGE_ADDRESS }: DonationSectionProps) {
  const [selectedDonation, setSelectedDonation] = React.useState<string>('69');
  const [customAmount, setCustomAmount] = React.useState<string>('');
  const [copied, setCopied] = React.useState(false);

  return (
    <Section>
      <Container>
        <div className="section-heading-container">
          <h3 className="section-heading">
            {t.sections.donation.title}
          </h3>
          <p className="section-description">
            {t.sections.donation.description}
          </p>
          
          <div className="donation-container">
            <div className="donation-blur-effect">
              <BlurEffect color="#FF46CE" scale={{ x: 5, y: 3 }} transparency={0.75}/>
            </div>
            <div className="donation-content">
              <h3 className="donation-title">
                {t.sections.donation.whyDonate.title}
              </h3>
              
              <div className="donation-grid">
                <div className="donation-card">
                  <Image
                    src="/assets/images/placeholder.jpg"
                    alt="Donation reason 1"
                    width={400}
                    height={200}
                    className="donation-card-image"
                  />
                  <h4 className="donation-card-title">
                    {t.sections.donation.whyDonate.reasons.development.title}
                  </h4>
                  <p className="donation-card-text">
                    {t.sections.donation.whyDonate.reasons.development.text}
                  </p>
                </div>
                
                <div className="donation-card">
                  <Image
                    src="/assets/images/placeholder.jpg"
                    alt="Donation reason 2"
                    width={400}
                    height={200}
                    className="donation-card-image"
                  />
                  <h4 className="donation-card-title">
                    {t.sections.donation.whyDonate.reasons.community.title}
                  </h4>
                  <p className="donation-card-text">
                    {t.sections.donation.whyDonate.reasons.community.text}
                  </p>
                </div>
                
                <div className="donation-card">
                  <Image
                    src="/assets/images/placeholder.jpg"
                    alt="Donation reason 3"
                    width={400}
                    height={200}
                    className="donation-card-image"
                  />
                  <h4 className="donation-card-title">
                    {t.sections.donation.whyDonate.reasons.education.title}
                  </h4>
                  <p className="donation-card-text">
                    {t.sections.donation.whyDonate.reasons.education.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="155" 
            height="79" 
            viewBox="0 0 155 79" 
            fill="none"
            className="donation-decoration"
          >
            <path d="M117.873 29.0459C115.849 26.6824 113.496 24.6676 110.908 23.0869C110.15 22.6242 109.346 22.1908 108.528 21.7785C106.224 20.6316 103.13 19.2629 99.8693 18.6886C96.9123 18.1842 94.1401 18.3709 91.396 19.2688C91.3632 19.1332 91.3305 18.9975 91.2849 18.8829C91.009 17.9626 90.7868 17.1908 90.5015 16.3804C88.6484 11.2295 85.819 7.53544 81.8203 5.0937C81.4835 4.88808 81.1129 4.69066 80.7633 4.5061C76.5682 2.29141 72.2772 0.94351 68.0505 0.531258C64.2295 0.164336 60.6073 0.844107 57.247 2.60911C47.5612 7.68279 38.5745 20.4124 40.9982 33.9505C42.58 42.8105 44.3864 50.5932 46.464 57.7897C48.0155 63.1034 50.2042 68.6039 53.1459 74.6219C53.8533 76.0659 54.729 77.0923 55.7813 77.7348C56.9388 78.4416 58.3535 78.7272 60.1015 78.609C66.9238 78.1773 73.7754 77.2719 80.3944 76.3689C83.2952 75.9716 86.2848 75.5706 89.2488 75.2118C92.8394 74.773 96.1916 74.0151 99.2842 72.9251C106.517 70.4018 112.478 66.1764 116.494 60.7347C120.497 55.3142 122.565 48.7113 122.504 41.6186C122.458 36.8197 120.915 32.5808 117.873 29.0459ZM51.1856 18.166C52.6542 15.4772 54.8231 13.0136 57.8713 10.6242C61.9285 7.4341 66.4533 6.55367 71.3569 7.98654C73.6568 8.66799 76.104 9.43942 78.1875 10.7117C79.7659 11.6755 80.9959 12.8314 81.9488 14.2519C83.9259 17.1652 84.9408 20.3296 85.0238 23.6478C85.0448 24.7016 85.1746 25.9086 86.0666 27.0027C86.3975 27.4072 86.7459 27.7356 87.1669 27.9926C88.4717 28.7894 89.9449 28.648 91.1586 27.6541C94.4721 24.8774 98.2183 24.5625 103.286 26.6736C104.921 27.3544 106.333 28.0716 107.616 28.8555C109.658 30.1021 111.309 31.515 112.695 33.1714C114.484 35.3047 115.434 37.6773 115.506 40.2083C115.665 45.1055 114.737 49.5122 112.777 53.2891C110.817 57.0661 107.758 60.3736 103.666 63.0515C99.5625 65.7504 95.0224 67.46 90.1059 68.1302C87.654 68.4547 85.1765 68.8214 82.7667 69.1717C75.5375 70.2224 68.0499 71.3178 60.6149 71.6645L60.526 71.6681C59.925 71.7059 59.3708 71.7145 59.2317 71.6585C59.1183 71.5603 58.8353 70.9827 58.619 70.5326C56.0947 65.2031 53.9469 59.3517 52.0681 52.6814C50.4932 47.1221 49.1931 41.0654 47.9515 33.5409C47.029 27.8594 48.0638 22.8526 51.1552 18.2632L51.1681 18.2421L51.1856 18.166Z" fill="#E3A849"/>
            <path d="M16.3418 40.1189C16.2997 40.0932 16.2365 40.0547 16.1944 40.029C13.7274 38.5803 10.249 38.2202 7.1541 39.0774C4.7502 39.7493 2.92505 41.0348 1.97213 42.7373C-0.577959 47.3393 -0.637656 54.156 5.30658 58.1905C5.43285 58.2677 5.53807 58.3319 5.66435 58.409C7.76891 59.6941 10.4733 60.0443 13.097 59.391C15.8225 58.713 18.1329 57.0587 19.4494 54.8554C20.856 52.5046 21.3412 49.5333 20.7508 46.7149C20.1522 43.8626 18.5516 41.4683 16.3418 40.1189ZM13.1638 51.1906C12.3488 52.5725 10.457 53.2101 9.04929 52.5819C8.95225 52.5515 8.88908 52.513 8.8049 52.4616C7.58425 51.7162 6.98329 49.6721 7.49542 48.0763C7.83801 47.0421 8.653 46.1807 9.70997 45.7273C10.7669 45.2739 11.9174 45.2825 12.8656 45.7169C12.9077 45.7426 12.9499 45.7683 12.9919 45.794C13.3497 46.0125 13.6046 46.3995 13.7648 46.9888C14.1798 48.4857 13.9998 49.8216 13.1638 51.1906Z" fill="#E3A849"/>
            <path d="M149.708 14.4803L149.624 14.4289C147.225 12.9638 144.052 12.5298 141.173 13.3167C138.693 13.9711 136.71 15.4205 135.637 17.3675C134.134 20.0646 133.531 22.9926 133.941 25.5854C134.367 28.3899 135.888 30.6778 138.337 32.2025C138.379 32.2282 138.422 32.2539 138.464 32.2796C140.863 33.7446 143.51 34.3779 145.949 34.0744C148.735 33.7227 151.049 32.1573 152.644 29.5455C154.337 26.8202 154.857 23.6969 154.145 20.7464C153.52 18.0801 151.897 15.8168 149.708 14.4803ZM144.237 27.1303C143.433 27.2174 142.702 27.0893 142.092 26.7166C141.755 26.5109 141.478 26.255 141.273 25.9276C140.337 24.575 140.992 23.1242 141.455 22.3659C141.532 22.2396 141.609 22.1132 141.72 21.9786L141.733 21.9576C141.771 21.8944 141.81 21.8312 141.836 21.7891L141.849 21.768C143.113 19.7928 144.521 19.2362 146.054 20.0854C146.096 20.1111 146.138 20.1368 146.181 20.1625C146.854 20.5738 147.218 21.1139 147.288 21.8507C147.419 22.9138 147.313 23.8905 146.993 24.7937C146.508 26.2035 145.613 26.9585 144.237 27.1303Z" fill="#E3A849"/>
          </svg>
        </div>

        <div className="section-content">
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
        </div>
      </Container>
    </Section>
  );
}
