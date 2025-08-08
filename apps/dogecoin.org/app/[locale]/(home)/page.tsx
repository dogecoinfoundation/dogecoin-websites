'use client';

import React from 'react';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import { H1, H2 } from '@/components/typography';
import { P } from '@/components/typography';
import { Link } from '@/components/typography';
import { BlurEffect } from '@/components/common/BlurEffect';
import { Carousel, CarouselControls } from '@/components/specific/Carousel';
import type { CarouselApi } from '@/components/specific/Carousel';
import { RainbowContainer } from '@repo/design-system/components/ui/rainbow-container';
import Image from 'next/image';
import DogePaw from '@/components/icons/DogePaw';
import { Activity } from '@/components/specific/Activity';
import { DonationButton } from '@/components/specific/DonationButton';
import { MissionCards } from '@/components/specific/MissionCards';
import { ProfileImage } from '@/components/specific/ProfileImage';
import { PartnerBanner } from '@/components/specific/PartnerBanner';

export default function Home() {
  const DOGE_ADDRESS = 'D8r9gCj8YncjQmxBJmQzS6Ef7TCTonC1Nm';
  
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  // Use state for selection to trigger re-renders
  const [selectedDonation, setSelectedDonation] = React.useState<string>('69');
  const [customAmount, setCustomAmount] = React.useState<string>('');

  React.useEffect(() => {
    console.log('API changed:', api);
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Header>
        <Container>
          <div>
          </div>
        </Container>
      </Header>

      <Main>
        <Section>
          <Container className="flex flex-col relative">
            <BlurEffect className="text-[var(--color-link)] -top-150 -left-150 absolute" />
            <div className="hero-container">
              <div className="hero-content">
                <H1 className="hero-title">ÐOGECOIN</H1>
                <div className="inline-block mt-1">
                  <H2 className="hero-subtitle">Foundation</H2>
                  <Image
                    src="/assets/images/underline-header-cta.svg"
                    alt="Underline"
                    width={400}
                    height={400}
                    className="hero-underline"
                  />
                  <div className="hero-tagline">Do Only Good Everyday <DogePaw className="hero-tagline-icon" /></div>
                </div>
              </div>
              <div>
                <Image
                  src="/assets/images/Doge.png"
                  alt="Doge"
                  width={400}
                  height={400}
                  className="hero-image"
                />
              </div>
            </div>
            <RainbowContainer className="carousel-wrapper">
              <Carousel setApi={setApi} />
            </RainbowContainer>
            <div className="carousel-controls-wrapper">
              <CarouselControls api={api} current={current} count={count} />
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                Much activity
              </h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="146" 
                height="26" 
                viewBox="0 0 146 26" 
                fill="none"
                className="section-heading-underline"
              >
                <path 
                  d="M2.75 2.44189H143.25L41.75 15.9419L102.25 23.9419" 
                  stroke="var(--Base-Brand-color-primary-500, #E3A849)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="section-content">
              <Activity
                title="#GigaWallet"
                subtitle="Open source project"
                text="Dogecoin GigaWallet is a backend service which provides a convenient integration API for platforms such as online shops, exchanges, social media platforms etc, to accept and transact Dogecoin on behalf of their users.<br /><br />The purpose of the GigaWallet is to promote the rapid uptake of Dogecoin as a payment option, by taking the complexity and risk out of integrating Dogecoin payments into business."
                primaryText="Download"
                secondaryText="Learn More"
                imageSrc="/assets/images/activity-gigawallet.gif"
                imageAlt="GigaWallet animation"
                imagePosition="right"
                color="#FF46A5"
                onPrimary={() => console.log(' Download clicked')}
                onSecondary={() => console.log('Learn More clicked')}
              />

              <Activity
                title="#Dogecoin Core"
                subtitle="Open source project"
                text="The Dogecoin Core software allows anyone to operate a node in the Dogecoin blockchain networks and uses the Scrypt hashing method for Proof of Work. It is adapted from Bitcoin Core and other cryptocurrencies.<br /><br />We contribute to the Dogecoin Core open source project via development, evangelism and education - and encourage you to as well."
                primaryText="Download"
                secondaryText="Learn More"
                imageSrc="/assets/images/activity-dogecoin.png"
                imageAlt="Dogecoin Core logo"
                imagePosition="left"
                color="#FFFC36"
                onPrimary={() => console.log('Download clicked')}
                onSecondary={() => console.log('Learn More clicked')}
              />

              <Activity
                title="#TeamSeas"
                subtitle="Charitable"
                text="The Dogecoin Foundation and community collaborated with MrBeast in 2021 on the #TeamSeas campaign (also known as CleanSeas). The initiative aimed to remove trash from oceans, rivers, and beaches."
                primaryText="Watch video"
                secondaryText="Read press"
                imageSrc="/assets/images/activity-teamseas.png"
                imageAlt="TeamSeas logo"
                imagePosition="right"
                color="#2BF9FF"
                imageBorderRadius={32}
                keyPoints={[
                  "The goal was to raise funds to help remove 30 million pounds of trash from oceans",
                  "Each $1 donated removed 1 pound of trash",
                  "The Dogecoin community participated by donating DOGE",
                  "The campaign partnered with Ocean Conservancy and The Ocean Cleanup",
                ]}
                onPrimary={() => console.log('Watch video clicked')}
                onSecondary={() => console.log('Read press clicked')}
              />

              <Activity
                title="#Kabosu Statue"
                subtitle="Fun!"
                text="The Dogecoin Foundation helped fund the permanent bronze statue of the Kabosu Shiba Inu (the original &quot;doge&quot; from the meme) in Sakura, Japan. This initiative took place in 2023."
                primaryText="Open in maps"
                imageSrc="/assets/images/activity-kabosu.png"
                imageAlt="Kabosu statue"
                imagePosition="left"
                color="#62FF46"
                imageBorderRadius={32}
                keyPoints={[
                  "Kabosu is the real Shiba Inu dog from the original meme that inspired Dogecoin",
                  "The statue was placed in Sakura City, Japan (where Kabosu lives)",
                  "The project was a collaboration between the local government, the Dogecoin community, and Kabosu's owner Atsuko Sato",
                  "It was funded through community donations",
                ]}
                onPrimary={() => console.log('Open in maps clicked')}
              />
            </div>
          </Container>
        </Section>

<Section>
  <Container>
    <div className="section-heading-container">
      <h3 className="section-heading">
        Dogecoin Inspires Generosity
      </h3>
      <p className="section-description">
        Lorem ipsum dolor sit amet consectetur. Suspendisse quam odio neque nulla sed.. Diam feugiat cras sollicitudin id. Nec viverra vel et morbi integer.. Neque commodo urna pharetra fames. Eu massa non bibendum egestas.
      </p>
      
      <div className="donation-container">
        <div className="donation-content">
          <h3 className="donation-title">
            Why donate?
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
                Development
              </h4>
              <p className="donation-card-text">
                Help fund ongoing development and maintenance of the Dogecoin network infrastructure.
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
                Community Projects
              </h4>
              <p className="donation-card-text">
                Contribute to charitable initiatives and community-driven projects that spread kindness.
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
                Educational Resources
              </h4>
              <p className="donation-card-text">
                Support educational content and resources to help people learn about cryptocurrency.
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

    <div className="donation-section">
      <div className="donation-section-grid">
        <div>
          <h3 className="donation-section-heading">1. Select donation</h3>
          <div className="donation-buttons-container">
            <DonationButton
              amount="69"
              quote="hehe"
              quoteColor="#FF46CE"
              isSelected={selectedDonation === '69'}
              onSelect={() => {
                setSelectedDonation('69');
                setCustomAmount('');
                console.log('Selected donation: 69');
              }}
            />
            <DonationButton
              amount="1337"
              quote="POWER MOVE!"
              quoteColor="#62FF46"
              isSelected={selectedDonation === '1337'}
              onSelect={() => {
                setSelectedDonation('1337');
                setCustomAmount('');
                console.log('Selected donation: 1337');
              }}
            />
            <DonationButton
              amount="9999.99"
              quote="Don't pay 10k"
              quoteColor="#FF7D47"
              isSelected={selectedDonation === '9999.99'}
              onSelect={() => {
                setSelectedDonation('9999.99');
                setCustomAmount('');
                console.log('Selected donation: 9999.99');
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
                onSelect={() => {
                  setSelectedDonation('custom');
                  console.log('Selected donation: custom');
                }}
                onAmountChange={(amount) => {
                  setCustomAmount(amount);
                  if (amount) {
                    setSelectedDonation('custom');
                    console.log('Custom amount changed:', amount);
                  }
                }}
                onFocus={() => {
                  setSelectedDonation('custom');
                  console.log('Custom field focused');
                }}
              />
              {customAmount && !/^[0-9]*\.?[0-9]*$/.test(customAmount) && (
                <div className="validation-error">
                  Please enter a valid number (e.g., 420 or 420.69)
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="donation-qr-container">
          <h3 className="donation-section-heading">2. Scan to send</h3>
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
          <h3 className="donation-section-heading">Wallet address:</h3>
          <div className="wallet-address-container">
            <p className="donation-section-text">
              {DOGE_ADDRESS}
            </p>
            <button 
              className="copy-button"
              onClick={() => {
                // Copy to clipboard using modern API
                eval(`navigator.clipboard.writeText('${DOGE_ADDRESS}').then(() => {
                  console.log('Address copied to clipboard: ${DOGE_ADDRESS}');
                }).catch(err => {
                  console.error('Failed to copy:', err);
                });`);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M34 8.44189C36.2091 8.44187 38 10.2327 38 12.4419L38 26.6921C38 27.7966 38.8954 28.6921 40 28.6921C41.1046 28.6921 42 27.7966 42 26.6921L42 12.4419C42 8.02358 38.4182 4.44184 33.9999 4.44189L19.75 4.44206C18.6454 4.44207 17.75 5.33751 17.75 6.44208C17.75 7.54665 18.6455 8.44207 19.75 8.44206L34 8.44189ZM34.5 18.4421C34.5 14.8522 31.5899 11.9421 28 11.9421L14.5 11.9421C10.9101 11.9421 8 14.8522 8 18.4421V37.9421C8 41.5319 10.9102 44.4421 14.5 44.4421L28 44.4421C31.5899 44.4421 34.5 41.5319 34.5 37.9421L34.5 18.4421ZM28 15.9421C29.3807 15.9421 30.5 17.0613 30.5 18.4421L30.5 37.9421C30.5 39.3228 29.3807 40.4421 28 40.4421L14.5 40.4421C13.1193 40.4421 12 39.3228 12 37.9421L12 18.4421C12 17.0613 13.1193 15.9421 14.5 15.9421L28 15.9421Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="section-content">
      
    </div>
  </Container>
</Section>

<Section>
  <Container>
    <div className="section-heading-container">
      <div className="relative">
        <h3 className="section-heading">
          Foundation members
        </h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="95" 
          height="117" 
          viewBox="0 0 95 117" 
          fill="none"
          className="absolute -right-[200px] top-1/2 transform -translate-y-1/2"
        >
          <path d="M93.2856 91.2655C94.146 90.6422 95.1322 89.7072 94.9854 88.1489C94.8385 86.5698 93.6423 85.988 92.5301 85.5517C91.1871 85.0323 89.7602 84.679 88.3963 84.3258C87.8926 84.2012 87.368 84.0557 86.8643 83.9311C86.4237 83.8064 85.983 83.7025 85.5424 83.5779C82.3527 82.726 79.0582 81.8533 76.0364 80.3366C74.2528 79.4431 73.3923 78.2381 73.3294 76.5135C73.3084 75.8071 73.1825 75.1215 73.0776 74.4358C73.0357 74.228 72.9937 73.9995 72.9727 73.7917C72.9097 73.3761 72.8468 72.9814 72.7839 72.5658C72.1333 68.3896 71.4618 64.0679 70.0559 59.954C69.5942 58.6034 69.1115 57.5646 68.545 56.6712C67.9364 55.7154 66.9501 55.1544 65.8799 55.1544C64.9776 55.1544 64.0963 55.5492 63.4038 56.2764C62.8162 56.8997 62.5014 57.6477 62.2286 58.4164C60.2141 63.8809 57.9268 69.3453 55.7024 74.6228L55.3248 75.4955C54.968 76.3473 54.5274 77.1784 54.0867 77.9887C53.9398 78.2588 53.7929 78.5289 53.667 78.7991C53.2054 79.6717 52.5968 80.0665 51.6525 80.0665C51.5056 80.0665 51.3378 80.0457 51.1699 80.0457L49.9108 79.9002C46.0287 79.4224 42.0416 78.9445 38.1175 78.2381C36.082 77.8641 33.9836 77.5316 31.9691 77.22C31.0458 77.0745 30.1435 76.9291 29.2201 76.7836L28.8005 76.7213L28.7794 76.8668C28.7585 76.8668 28.7584 76.8668 28.7374 76.8668C28.6535 76.8668 28.5696 76.8668 28.4857 76.8668C26.5341 76.9706 25.2541 77.8433 24.8973 79.3393C24.4776 81.0846 25.8836 82.0819 26.9958 82.6844C28.3807 83.4324 29.7447 84.2635 31.0877 85.0738C32.9344 86.175 34.8439 87.3385 36.8164 88.3151C38.3693 89.0838 40.3838 90.0812 42.3773 91.1824C42.9019 91.4732 43.5105 91.8057 43.5525 91.9719C43.5944 92.1381 43.2587 92.6783 42.9229 93.177C42.1255 94.4236 41.2861 95.691 40.4887 96.9169C40.0061 97.6441 39.5445 98.3713 39.0618 99.0985C38.2854 100.283 37.425 101.675 36.9424 103.254C36.5437 104.501 36.2079 105.955 37.3621 107.202C37.9916 107.887 38.81 108.22 39.8173 108.22C40.3839 108.22 40.9714 108.116 41.475 108.033C41.6849 107.991 41.8738 107.908 42.0207 107.846C42.1256 107.804 42.2095 107.763 42.2934 107.742C43.9722 107.202 45.567 106.516 47.1618 105.789L47.7494 105.519C50.8341 104.127 54.0237 102.693 57.4232 101.966C57.9058 101.862 58.3255 101.82 58.6823 101.82C59.8364 101.82 60.6548 102.298 61.4103 103.462C63.11 106.017 64.9776 108.511 66.8033 110.921C67.3279 111.627 67.8734 112.334 68.398 113.04C69.0276 113.892 69.9089 114.972 71.0421 115.845C71.8395 116.448 72.6369 116.759 73.4343 116.759C73.896 116.759 74.3576 116.655 74.7983 116.448C76.0783 115.866 76.7498 114.785 76.7918 113.248C76.8128 112.77 76.7918 112.251 76.7289 111.731C76.624 110.734 76.498 109.737 76.3931 108.76C76.2882 107.763 76.1623 106.745 76.0574 105.747C76.0154 105.415 75.9944 105.062 75.9524 104.729C75.6796 102.298 75.4069 99.7842 75.3439 97.2909C75.3229 96.6676 75.4489 96.5014 76.1414 96.3559C79.8556 95.5664 83.4859 94.7353 86.9484 93.8626C89.1307 93.3432 91.355 92.6576 93.2856 91.2655ZM84.9548 89.4786C81.5134 90.3512 77.967 91.2447 74.4206 91.868C74.2737 91.8888 74.1268 91.9096 73.9589 91.9303C73.77 91.9511 73.5602 91.9719 73.3714 92.0135C71.0841 92.4498 70.1607 93.5302 70.0978 95.7949C70.0558 97.7064 70.2237 99.618 70.3915 101.467C70.4755 102.257 70.5384 103.088 70.6014 103.898C70.6853 104.999 70.8323 106.121 70.9792 107.202C71.0002 107.43 71.0421 107.659 71.0631 107.887C71.0211 107.825 70.9791 107.742 70.9162 107.659C70.8532 107.576 70.8113 107.493 70.7483 107.389C70.1817 106.599 69.5941 105.81 69.0276 105.041C67.7895 103.337 66.4885 101.592 65.2714 99.8465C63.9074 97.8934 62.0817 96.9377 59.7105 96.9377C59.3328 96.9377 58.934 96.9585 58.5353 97.0208C55.4087 97.3948 52.24 98.3505 48.253 100.117C46.931 100.698 45.588 101.28 44.182 101.883C43.7833 102.049 43.3636 102.236 42.9439 102.423C43.1118 101.966 43.3637 101.613 43.6155 101.259C43.7204 101.093 43.8462 100.927 43.9512 100.761C44.6227 99.6803 45.3362 98.5999 46.0287 97.5402C46.7632 96.4182 47.5186 95.2755 48.2321 94.1327C49.722 91.7641 49.3862 89.9773 47.1408 88.1904C46.0287 87.297 44.7486 86.6529 43.5315 86.0296C43.2167 85.8633 42.881 85.6971 42.5663 85.5309C42.0417 85.2608 41.496 84.9907 40.9714 84.7414C40.0691 84.305 39.1247 83.8687 38.2854 83.3285C38.3483 83.2454 38.4113 83.2454 38.4533 83.2454C38.5792 83.2454 38.747 83.2869 38.9149 83.3493C39.0828 83.3908 39.2297 83.4532 39.3976 83.474C40.5098 83.5986 41.6219 83.744 42.7131 83.8687C45.1683 84.1596 47.7074 84.4297 50.2046 84.8037C50.7082 84.8868 51.2118 84.9076 51.6735 84.9076C54.7792 84.9076 57.0875 83.3285 58.7243 80.108C60.1722 77.2407 61.3893 74.228 62.5854 71.2984C63.152 69.9271 63.7185 68.5142 64.3061 67.1429C64.7048 66.2287 65.0406 65.3146 65.4183 64.3588C65.5022 64.151 65.5861 63.9225 65.6701 63.6939C65.9009 64.1926 66.0058 64.712 66.0897 65.2522C66.1317 65.5015 66.1737 65.7509 66.2367 66.021C67.0551 69.4285 67.5377 72.9814 68.0203 76.4097C68.1043 76.9499 68.1673 77.4901 68.2512 78.051C68.6289 80.6898 69.9929 82.6844 72.4061 84.118C75.0711 85.6971 78.0509 86.5698 80.9048 87.4217C81.2195 87.5048 81.5343 87.6086 81.8491 87.6917C82.9822 88.0242 84.1573 88.3359 85.2905 88.606C85.7522 88.7306 86.2348 88.8345 86.6965 88.9592L86.7804 88.98C86.8014 88.98 86.8224 89.0007 86.8434 89.0007C86.2349 89.1462 85.6054 89.3124 84.9548 89.4786Z" fill="#E3A849"/>
          <path d="M13.5237 45.3059C13.4188 45.8877 13.2929 46.4695 13.167 47.0305C12.8523 48.4849 12.5375 49.9601 12.5165 51.4976C12.4955 52.5572 12.7893 53.4299 13.3979 54.0324C13.9645 54.5934 14.7408 54.9051 15.6642 54.9051H15.6852C16.7763 54.9051 17.7416 54.4272 18.5181 53.4922C18.9377 52.9936 19.3364 52.4949 19.7141 51.9963C20.0499 51.5807 20.3857 51.1444 20.7214 50.7288C23.0927 47.8408 25.275 45.2436 27.7512 42.8334C29.0103 41.6076 29.7447 41.1505 30.4792 41.1505C31.2136 41.1505 32.053 41.6283 33.1652 42.3971C34.8019 43.5399 36.4177 44.7449 37.9916 45.9293C40.1949 47.5914 42.4823 49.2952 44.8535 50.8119L44.8954 50.8535C45.8817 51.4768 46.889 52.1417 48.0641 52.5365C48.5467 52.7027 49.0294 52.7858 49.4491 52.7858C50.3934 52.7858 51.1908 52.391 51.7574 51.6638C52.7017 50.4587 52.1981 49.2952 51.5896 48.3394C51.1699 47.6746 50.7292 47.0305 50.3095 46.4071C49.9318 45.8462 49.5541 45.2644 49.1763 44.7034C47.2877 41.7322 45.1892 38.1378 43.9721 34.0238C43.8043 33.4629 43.6574 32.9226 43.7204 32.7564C43.8043 32.611 44.245 32.424 44.8535 32.1747L44.9164 32.1539C45.9027 31.7591 46.91 31.3851 47.8963 31.0111C49.9318 30.2424 52.0512 29.4528 54.0447 28.4763C55.4087 27.8114 56.8146 27.0219 57.9058 25.7337C58.5563 24.9857 58.8292 24.1546 58.7033 23.3651C58.5983 22.5755 58.1157 21.9106 57.3183 21.3912C56.7307 20.9964 56.0592 20.8302 55.4087 20.7055C53.3312 20.29 51.2327 20.29 49.1972 20.29C48.6097 20.29 48.0221 20.29 47.4346 20.2692C47.0988 20.2692 46.7631 20.2692 46.4064 20.2692C45.6509 20.2692 44.8954 20.29 44.161 20.29C43.4265 20.3108 42.6712 20.3108 41.9367 20.3108C40.132 20.3108 38.747 20.2484 37.467 20.0822C35.6833 19.8537 34.8019 19.1057 34.2144 17.2773C33.7108 15.6774 33.2701 14.036 32.8294 12.4569C32.1789 10.0468 31.5074 7.55349 30.6051 5.14332C30.2274 4.10445 29.7866 3.02401 29.0522 2.08903C28.4017 1.25794 27.4155 0.759277 26.3872 0.759277C25.7157 0.759277 25.1072 0.946289 24.5825 1.32028C23.5333 2.06827 23.3025 3.25258 23.1556 4.10445C22.8199 5.93286 22.5471 7.82359 22.2743 9.63122L22.2113 10.0468C21.8756 12.3531 21.5398 14.6801 21.225 16.9448C21.0991 17.7967 20.9942 18.6486 20.8683 19.5005C20.6794 19.5005 20.4906 19.4381 20.2807 19.3758H20.2597C16.2307 18.0045 11.9499 17.2981 7.58514 17.2981C6.55691 17.2981 5.50768 17.3396 4.43748 17.4227C3.55613 17.4851 2.54892 17.5889 1.64659 18.0876C0.849179 18.5239 0.303502 19.1265 0.0936573 19.8537C-0.116187 20.5809 0.0307859 21.3912 0.492444 22.16C0.891148 22.8456 1.45769 23.4689 2.23411 24.113C5.33981 26.7102 8.4245 29.5775 11.6561 32.9019C12.6843 33.9407 13.5867 35.0627 14.3422 36.247C14.9297 37.1612 15.0766 37.93 14.8458 38.865C14.3212 40.9635 13.9014 43.2074 13.5237 45.3059ZM10.6908 24.9857C9.87241 24.2377 9.03309 23.4689 8.13076 22.6378L7.50123 22.0561C7.92092 22.0353 8.36161 22.0145 8.7813 22.0145C10.586 22.0145 12.3486 22.2015 14.3002 22.6378C16.8603 23.1781 19.3574 24.0299 21.4349 24.7779C21.9385 24.9649 22.4421 25.048 22.9248 25.048C23.8691 25.048 24.7084 24.6948 25.317 24.0715C25.9675 23.4066 26.2823 22.4508 26.2403 21.412C26.1773 19.8537 26.3872 18.2954 26.5971 16.7994C26.723 15.8437 26.8699 14.8671 26.9328 13.8906C26.9748 13.2465 27.1007 12.6024 27.2476 11.9167C27.2476 11.896 27.2475 11.8752 27.2685 11.8544C27.2685 11.8959 27.2895 11.9375 27.3105 11.9791C27.4994 12.6231 27.7092 13.2673 27.898 13.9114C28.4017 15.5528 28.9054 17.2357 29.346 18.9187C30.1015 21.9106 32.0949 23.739 35.4734 24.5078C36.9004 24.8402 38.4533 24.9857 40.237 24.9857H40.3419C41.6219 24.9857 43.0279 24.9857 44.7276 24.9857C45.7349 24.9857 46.7631 24.9857 47.7703 24.9857C48.4838 24.9857 49.2182 24.9857 49.9317 24.9857C49.8687 25.0065 49.7848 25.0272 49.7219 25.048C48.3159 25.609 46.868 26.1492 45.4831 26.6894C44.3919 27.105 43.2377 27.5413 42.1256 27.9776C38.9149 29.2243 37.9916 30.928 38.6841 34.2732C39.1248 36.3509 40.0061 38.2832 40.8665 40.1739L40.9504 40.3817C41.1393 40.7765 41.3281 41.1505 41.5379 41.5245C41.7688 41.9608 41.9996 42.3763 42.1675 42.7919C41.7058 42.4594 41.2232 42.1478 40.7616 41.8361C39.1458 40.7142 37.4669 39.5714 35.8721 38.3663C34.0045 36.9534 32.3468 36.2886 30.668 36.2886C28.9263 36.2886 27.1007 37.0158 24.9183 38.6156C23.4704 39.6753 22.3162 41.0258 21.204 42.3348C20.5745 43.062 19.924 43.8308 19.2525 44.5164C19.1896 44.5995 19.1266 44.6618 19.0637 44.745C19.1056 44.5164 19.1475 44.2671 19.1895 44.0385C19.3993 42.9165 19.6093 41.7322 19.9031 40.6103C20.6585 37.6807 20.0918 35.0835 18.1403 32.6733C15.6641 29.6398 12.8522 26.9595 10.6908 24.9857Z" fill="#E3A849"/>
        </svg>
      </div>
      <p className="section-description">
        Lorem ipsum dolor sit amet consectetur.
      </p>
      
      <div className="profile-grid">
        <ProfileImage
          imageSrc="/assets/images/dp-1.jpg"
          imageAlt="Donna"
          name="Donna"
          description="Front-end extaordinaire"
          color="#2BF9FF"
        />
        <ProfileImage
          imageSrc="/assets/images/dp-2.jpg"
          imageAlt="Dereck"
          name="Dereck"
          description="Tries to design"
          color="#9780FF"
        />
        <ProfileImage
          imageSrc="/assets/images/dp-3.jpg"
          imageAlt="David"
          name="David"
          description="Not sure what he does"
          color="#FF46CE"
        />
        <ProfileImage
          imageSrc="/assets/images/dp-4.jpg"
          imageAlt="Debbie"
          name="Debbie"
          description="Back end ninja"
          color="#FFFC36"
        />
        <ProfileImage
          imageSrc="/assets/images/dp-5.jpg"
          imageAlt="Dick"
          name="Dick"
          description="Something to do with front-end"
          color="#FF7D47"
        />
        <ProfileImage
          imageSrc="/assets/images/dp-6.png"
          imageAlt="Erick"
          name="Erick"
          description="Junior Assistant"
          color="#62FF46"
        />
      </div>
    </div>
  </Container>
</Section>

<Section>
  <Container>
    <div className="section-heading-container">
      <h3 className="section-heading">
        Our partners
      </h3>
      <p className="section-description">
        Lorem ipsum dolor sit amet consectetur. Suspendisse quam odio neque nulla sed.
      </p>
      
      <div className="partners-list">
        <PartnerBanner
          icon="/assets/images/houseofdoge-logo.png"
          name="House of Doge"
          description="Official corporate partners of the Dogecoin Foundation, committed to transforming Dogecoin into a fully integrated and accessible global payment platform and currency. Their mission is to advance the mainstream adoption of Dogecoin by enhancing its utility through real-world application."
          buttonText="Visit House of Doge"
          buttonLink="https://www.houseofdoge.com/"
          backgroundImage="/assets/images/houseofdoge-stars.jpeg"
          lowerImage="/assets/images/houseofdoge-wave.png"
        />
      </div>
    </div>
  </Container>
</Section>

      </Main>

      <Footer>
        <Container>
          <div className="footer-container">
            <P.Caption>
              © 2024 Your Company. All rights reserved.
            </P.Caption>
            <div className="footer-links">
              <Link href="#" size="sm">Privacy</Link>
              <Link href="#" size="sm">Terms</Link>
            </div>
          </div>
        </Container>
      </Footer>
    </>
  );
}
