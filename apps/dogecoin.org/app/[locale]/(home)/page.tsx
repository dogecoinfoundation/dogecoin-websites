'use client';

import React from 'react';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import Button from '@/components/common/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import { H1, H2, H3 } from '@/components/typography';
import { P } from '@/components/typography';
import { Link } from '@/components/typography';
import { BlurEffect } from '@/components/common/BlurEffect';
import { Carousel, CarouselControls } from '@/components/specific/Carousel';
import { RainbowContainer } from '@repo/design-system/components/ui/rainbow-container';
import Image from 'next/image';
import DogePaw from '@/components/icons/DogePaw';
import { Activity } from '@/components/specific/Activity';

export default function Home() {
  const [api, setApi] = React.useState<any>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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
            <div className="flex flex-1">
              <div className="flex flex-col flex-1 justify-center">
                <H1 className="[font-family:var(--font-montserrat)]">ÐOGECOIN</H1>
                <div className="inline-block mt-1">
                  <H2 className="[font-family:var(--font-montserrat)] font-extralight inline-block mb-4">Foundation</H2>
                  <Image
                    src="/assets/images/underline-header-cta.svg"
                    alt="Underline"
                    width={400}
                    height={400}
                    className="w-auto h-auto mt-4"
                  />
                  <div className="text-[var(--color-link)] flex items-center gap-2 text-2xl mt-2">Do Only Good Everyday <DogePaw className="w-6 h-6" /></div>
                </div>
              </div>
              <div>
                <Image
                  src="/assets/images/Doge.png"
                  alt="Doge"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <RainbowContainer className="-mt-2">
              <Carousel setApi={setApi} />
            </RainbowContainer>
            <div className="flex justify-center -mt-8">
              <CarouselControls api={api} current={current} count={count} />
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="relative flex flex-col items-center">
              <h3 
                className="inline-block mb-4 text-center"
                style={{
                  color: 'var(--Dark-Text-Primary, #FFF)',
                  fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                  fontSize: 'var(--Typography-Heading-H1-font-size, 64px)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'var(--Typography-Heading-H1-line-height, 72px)'
                }}
              >
                Much activity
              </h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="146" 
                height="26" 
                viewBox="0 0 146 26" 
                fill="none"
                className="absolute"
                style={{
                  width: '140.5px',
                  height: '21.5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: '-20px',
                  strokeWidth: '4px',
                  stroke: 'var(--Base-Brand-color-primary-500, #E3A849)'
                }}
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

            <div className="mt-16 space-y-16">
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
    <div className="relative flex flex-col items-center">
      <h3 
        className="inline-block mb-4 text-center"
        style={{
          color: 'var(--Dark-Text-Primary, #FFF)',
          fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
          fontSize: 'var(--Typography-Heading-H1-font-size, 64px)',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'var(--Typography-Heading-H1-line-height, 72px)'
        }}
      >
        Dogecoin Inspires Generosity
      </h3>
      <p 
        className="text-center mb-8"
        style={{
          color: 'var(--Dark-Text-Primary, #FFF)',
          textAlign: 'center',
          fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
          fontSize: 'var(--Typography-Paragraph-Body-Lead-font-size, 24px)',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'var(--Typography-Paragraph-Body-Lead-line-height, 34px)'
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Suspendisse quam odio neque nulla sed.. Diam feugiat cras sollicitudin id. Nec viverra vel et morbi integer.. Neque commodo urna pharetra fames. Eu massa non bibendum egestas.
      </p>
      
      <div 
        className="mb-8"
        style={{
          display: 'flex',
          padding: '80px',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          alignSelf: 'stretch',
          borderRadius: '32px',
          background: 'var(--Base-Brand-color-primary-500, #E3A849)',
          position: 'relative',
          width: '1280px',
          height: '624px',
          margin: '0 auto'
        }}
      >
        <div 
          style={{
            width: '1224px',
            height: '568px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            border: '16px dotted var(--Dark-Background-Secondary, #201F1D)'
          }}
        />
      </div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="155" 
        height="79" 
        viewBox="0 0 155 79" 
        fill="none"
        className="absolute"
        style={{
          width: '120px',
          height: '60px',
          right: '180px',
          top: '-35px'
        }}
      >
        <path d="M117.873 29.0459C115.849 26.6824 113.496 24.6676 110.908 23.0869C110.15 22.6242 109.346 22.1908 108.528 21.7785C106.224 20.6316 103.13 19.2629 99.8693 18.6886C96.9123 18.1842 94.1401 18.3709 91.396 19.2688C91.3632 19.1332 91.3305 18.9975 91.2849 18.8829C91.009 17.9626 90.7868 17.1908 90.5015 16.3804C88.6484 11.2295 85.819 7.53544 81.8203 5.0937C81.4835 4.88808 81.1129 4.69066 80.7633 4.5061C76.5682 2.29141 72.2772 0.94351 68.0505 0.531258C64.2295 0.164336 60.6073 0.844107 57.247 2.60911C47.5612 7.68279 38.5745 20.4124 40.9982 33.9505C42.58 42.8105 44.3864 50.5932 46.464 57.7897C48.0155 63.1034 50.2042 68.6039 53.1459 74.6219C53.8533 76.0659 54.729 77.0923 55.7813 77.7348C56.9388 78.4416 58.3535 78.7272 60.1015 78.609C66.9238 78.1773 73.7754 77.2719 80.3944 76.3689C83.2952 75.9716 86.2848 75.5706 89.2488 75.2118C92.8394 74.773 96.1916 74.0151 99.2842 72.9251C106.517 70.4018 112.478 66.1764 116.494 60.7347C120.497 55.3142 122.565 48.7113 122.504 41.6186C122.458 36.8197 120.915 32.5808 117.873 29.0459ZM51.1856 18.166C52.6542 15.4772 54.8231 13.0136 57.8713 10.6242C61.9285 7.4341 66.4533 6.55367 71.3569 7.98654C73.6568 8.66799 76.104 9.43942 78.1875 10.7117C79.7659 11.6755 80.9959 12.8314 81.9488 14.2519C83.9259 17.1652 84.9408 20.3296 85.0238 23.6478C85.0448 24.7016 85.1746 25.9086 86.0666 27.0027C86.3975 27.4072 86.7459 27.7356 87.1669 27.9926C88.4717 28.7894 89.9449 28.648 91.1586 27.6541C94.4721 24.8774 98.2183 24.5625 103.286 26.6736C104.921 27.3544 106.333 28.0716 107.616 28.8555C109.658 30.1021 111.309 31.515 112.695 33.1714C114.484 35.3047 115.434 37.6773 115.506 40.2083C115.665 45.1055 114.737 49.5122 112.777 53.2891C110.817 57.0661 107.758 60.3736 103.666 63.0515C99.5625 65.7504 95.0224 67.46 90.1059 68.1302C87.654 68.4547 85.1765 68.8214 82.7667 69.1717C75.5375 70.2224 68.0499 71.3178 60.6149 71.6645L60.526 71.6681C59.925 71.7059 59.3708 71.7145 59.2317 71.6585C59.1183 71.5603 58.8353 70.9827 58.619 70.5326C56.0947 65.2031 53.9469 59.3517 52.0681 52.6814C50.4932 47.1221 49.1931 41.0654 47.9515 33.5409C47.029 27.8594 48.0638 22.8526 51.1552 18.2632L51.1681 18.2421L51.1856 18.166Z" fill="#E3A849"/>
        <path d="M16.3418 40.1189C16.2997 40.0932 16.2365 40.0547 16.1944 40.029C13.7274 38.5803 10.249 38.2202 7.1541 39.0774C4.7502 39.7493 2.92505 41.0348 1.97213 42.7373C-0.577959 47.3393 -0.637656 54.156 5.30658 58.1905C5.43285 58.2677 5.53807 58.3319 5.66435 58.409C7.76891 59.6941 10.4733 60.0443 13.097 59.391C15.8225 58.713 18.1329 57.0587 19.4494 54.8554C20.856 52.5046 21.3412 49.5333 20.7508 46.7149C20.1522 43.8626 18.5516 41.4683 16.3418 40.1189ZM13.1638 51.1906C12.3488 52.5725 10.457 53.2101 9.04929 52.5819C8.95225 52.5515 8.88908 52.513 8.8049 52.4616C7.58425 51.7162 6.98329 49.6721 7.49542 48.0763C7.83801 47.0421 8.653 46.1807 9.70997 45.7273C10.7669 45.2739 11.9174 45.2825 12.8656 45.7169C12.9077 45.7426 12.9499 45.7683 12.9919 45.794C13.3497 46.0125 13.6046 46.3995 13.7648 46.9888C14.1798 48.4857 13.9998 49.8216 13.1638 51.1906Z" fill="#E3A849"/>
        <path d="M149.708 14.4803L149.624 14.4289C147.225 12.9638 144.052 12.5298 141.173 13.3167C138.693 13.9711 136.71 15.4205 135.637 17.3675C134.134 20.0646 133.531 22.9926 133.941 25.5854C134.367 28.3899 135.888 30.6778 138.337 32.2025C138.379 32.2282 138.422 32.2539 138.464 32.2796C140.863 33.7446 143.51 34.3779 145.949 34.0744C148.735 33.7227 151.049 32.1573 152.644 29.5455C154.337 26.8202 154.857 23.6969 154.145 20.7464C153.52 18.0801 151.897 15.8168 149.708 14.4803ZM144.237 27.1303C143.433 27.2174 142.702 27.0893 142.092 26.7166C141.755 26.5109 141.478 26.255 141.273 25.9276C140.337 24.575 140.992 23.1242 141.455 22.3659C141.532 22.2396 141.609 22.1132 141.72 21.9786L141.733 21.9576C141.771 21.8944 141.81 21.8312 141.836 21.7891L141.849 21.768C143.113 19.7928 144.521 19.2362 146.054 20.0854C146.096 20.1111 146.138 20.1368 146.181 20.1625C146.854 20.5738 147.218 21.1139 147.288 21.8507C147.419 22.9138 147.313 23.8905 146.993 24.7937C146.508 26.2035 145.613 26.9585 144.237 27.1303Z" fill="#E3A849"/>
      </svg>
    </div>

    <div className="mt-16 space-y-16">
      
    </div>
  </Container>
</Section>
      </Main>

      <Footer>
        <Container>
          <div className="py-8 flex items-center justify-between">
            <P.Caption>
              © 2024 Your Company. All rights reserved.
            </P.Caption>
            <div className="flex items-center gap-6">
              <Link href="#" size="sm">Privacy</Link>
              <Link href="#" size="sm">Terms</Link>
            </div>
          </div>
        </Container>
      </Footer>
    </>
  );
}
