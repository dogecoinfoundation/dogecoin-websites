import React from 'react';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import { H1, H2 } from '@/components/typography';
import { BlurEffect } from '@/components/common/BlurEffect';
import Image from 'next/image';
import DogePaw from '@/components/icons/DogePaw';
import { Activity } from '@/components/specific/Activity';
import { ProfileImage } from '@/components/specific/ProfileImage';
import { PartnerBanner } from '@/components/specific/PartnerBanner';
import { MissionCards } from '@/components/specific/MissionCards';
import { DonationSection } from '@/components/specific/DonationSection';
import { CarouselSection } from '@/components/specific/CarouselSection';
import { DogeImage } from '@/components/specific/DogeImage';
import { getDictionary } from '@repo/internationalization';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata(dictionary["dogecoin.org"].home.meta);
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const t = dictionary["dogecoin.org"].home;
  
  const DOGE_ADDRESS = 'D8r9gCj8YncjQmxBJmQzS6Ef7TCTonC1Nm';

  return (
    <>
      <Main>
        <Section>
          <Container className="flex flex-col relative">
            
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-text-container relative">
                  <H1 className="hero-title">{t.hero.title}</H1>
                  <div className="hero-subtitle-wrap">
                    <H2 className="hero-subtitle">{t.hero.subtitle}</H2>
                  </div>
                  <div className="hero-tagline">{t.hero.tagline} <DogePaw className="hero-tagline-icon" /></div>
                  <div className="hero-blur-effect">
                    <BlurEffect color="#A88F33" scale={{ x: 3, y: 5 }} />
                  </div>
                </div>
              </div>
              <div className="hero-image-section">
                <DogeImage className="hero-image" width={400} height={400} />
              </div>
            </div>
            <CarouselSection />
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                {t.sections.activity.title}
              </h3>
              <Image
                src="/assets/svg/home/activity-heading.svg"
                alt="Section heading underline"
                width={146}
                height={26}
                className="section-heading-underline"
              />
            </div>

            <div className="section-content">
              <Activity
                title={t.sections.activity.gigawallet.title}
                subtitle={t.sections.activity.gigawallet.subtitle}
                text={t.sections.activity.gigawallet.text}
                primaryText={t.sections.activity.gigawallet.primaryText}
                secondaryText={t.sections.activity.gigawallet.secondaryText}
                imageSrc="/assets/images/activity-gigawallet.gif"
                imageAlt="GigaWallet animation"
                imagePosition="right"
                color="#FF46A5"
              />

              <Activity
                title={t.sections.activity.core.title}
                subtitle={t.sections.activity.core.subtitle}
                text={t.sections.activity.core.text}
                primaryText={t.sections.activity.core.primaryText}
                secondaryText={t.sections.activity.core.secondaryText}
                imageSrc="/assets/images/activity-dogecoin.png"
                imageAlt="Dogecoin Core logo"
                imagePosition="left"
                color="#FFFC36"
              />

              <Activity
                title={t.sections.activity.teamseas.title}
                subtitle={t.sections.activity.teamseas.subtitle}
                text={t.sections.activity.teamseas.text}
                primaryText={t.sections.activity.teamseas.primaryText}
                secondaryText={t.sections.activity.teamseas.secondaryText}
                imageSrc="/assets/images/activity-teamseas.png"
                imageAlt="TeamSeas logo"
                imagePosition="right"
                color="#2BF9FF"
                imageBorderRadius={32}
                keyPoints={t.sections.activity.teamseas.keyPoints}
              />

              <Activity
                title={t.sections.activity.kabosu.title}
                subtitle={t.sections.activity.kabosu.subtitle}
                text={t.sections.activity.kabosu.text}
                primaryText={t.sections.activity.kabosu.primaryText}
                imageSrc="/assets/images/activity-kabosu.png"
                imageAlt="Kabosu statue"
                imagePosition="left"
                color="#62FF46"
                imageBorderRadius={32}
                keyPoints={t.sections.activity.kabosu.keyPoints}
              />
            </div>
          </Container>
        </Section>

        <DonationSection t={t} DOGE_ADDRESS={DOGE_ADDRESS} />

        <Section>
          <Container>
            <div className="section-heading-container">
              <div className="mission-heading-with-svg">
                <Image
                  src="/assets/svg/home/mission-heading.svg"
                  alt="Mission heading"
                  width={131}
                  height={88}
                  className="mission-heading-svg"
                />
                <h3 className="section-heading">
                  {t.sections.mission.title}
                </h3>
              </div>
              <p className="section-description">
                {t.sections.mission.description}
              </p>
              
              <MissionCards cards={t.sections.mission.cards} />
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                {t.sections.members.title}
              </h3>
              <p className="section-description">
                {t.sections.members.description}
              </p>
              
              <div className="profile-grid">
                <ProfileImage
                  imageSrc="/assets/images/dp-1.jpg"
                  imageAlt="Donna"
                  name="Donna"
                  description={t.sections.members.profiles.donna.description}
                  color="#2BF9FF"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-2.jpg"
                  imageAlt="Dereck"
                  name="Dereck"
                  description={t.sections.members.profiles.dereck.description}
                  color="#9780FF"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-3.jpg"
                  imageAlt="David"
                  name="David"
                  description={t.sections.members.profiles.david.description}
                  color="#FF46CE"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-4.jpg"
                  imageAlt="Debbie"
                  name="Debbie"
                  description={t.sections.members.profiles.debbie.description}
                  color="#FFFC36"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-5.jpg"
                  imageAlt="Dick"
                  name="Dick"
                  description={t.sections.members.profiles.dick.description}
                  color="#FF7D47"
                />
                <ProfileImage
                  imageSrc="/assets/images/dp-6.png"
                  imageAlt="Erick"
                  name="Erick"
                  description={t.sections.members.profiles.erick.description}
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
                {t.sections.partners.title}
              </h3>
              <p className="section-description">
                {t.sections.partners.description}
              </p>
              
              <div className="partners-list">
                <PartnerBanner
                  icon="/assets/images/houseofdoge-logo.png"
                  name={t.sections.partners.houseOfDoge.name}
                  description={t.sections.partners.houseOfDoge.description}
                  buttonText={t.sections.partners.houseOfDoge.buttonText}
                  buttonLink="https://www.houseofdoge.com/"
                  backgroundImage="/assets/images/houseofdoge-stars.jpeg"
                  lowerImage="/assets/images/houseofdoge-wave.png"
                />
              </div>
            </div>
          </Container>
        </Section>

      </Main>

      <Footer t={t} />
    </>
  );
}
