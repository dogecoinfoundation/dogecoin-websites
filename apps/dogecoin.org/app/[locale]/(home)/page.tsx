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
              <H3 className="[font-family:var(--font-montserrat)] font-extralight inline-block mb-4 text-center">Much activity</H3>
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
