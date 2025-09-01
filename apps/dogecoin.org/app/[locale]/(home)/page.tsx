import React from 'react';
import Link from 'next/link';
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
import { ProjectCard } from '@/components/specific/ProjectCard';
import { PartyModeButton } from '@/components/specific/PartyModeButton';
import { ContentGrid } from '@/components/content/ContentGrid';
import { getAssetPath } from '@/lib/assets';
import { getFeaturedProjects, getFeaturedActivities } from '@/lib/content';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { ProjectMeta, ActivityMeta } from '@/lib/content';

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  // Using centralized language config
  return allLanguages.map((locale) => ({
    locale,
  }));
}


export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const t = dictionary["dogecoin.org"].home;
  
  // Load featured content on server side
  const [featuredProjects, featuredActivities] = await Promise.all([
    getFeaturedProjects(locale),
    getFeaturedActivities(locale)
  ]);
  
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
                <div className="hero-image-container">
                  <Image
                    src={getAssetPath("/assets/images/Doge.png")}
                    alt="Doge"
                    width={400}
                    height={400}
                    className="hero-image"
                  />
                  <PartyModeButton className="party-mode-button" />
                </div>
              </div>
            </div>
            <CarouselSection t={{ checkItOut: t.sections.donation.copy.checkItOut }} />
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                {t.projects.title}
              </h3>
              <Image
                src={getAssetPath("/assets/svg/home/activity-heading.svg")}
                alt="Section heading underline"
                width={146}
                height={26}
                className="section-heading-underline"
              />
            </div>

            <ContentGrid className="featured-projects-grid">
              {featuredProjects.map((project, index) => {
                const links = [];
                if (project.github) {
                  links.push({ label: 'GitHub', url: project.github, icon: 'github' as const });
                }
                if (project.website) {
                  links.push({ label: 'Website', url: project.website, icon: 'web' as const });
                }
                if (project.demo) {
                  links.push({ label: 'Demo', url: project.demo, icon: 'demo' as const });
                }

                const tags = [...(project.tags ?? [])];

                // Define a set of vibrant colors for project accent lines
                const accentColors = [
                  '#FF46CE', // Pink
                  '#2BF9FF', // Cyan
                  '#62FF46', // Green
                  '#FFFC36', // Yellow
                  '#FF7D47', // Orange
                  '#9B59FF', // Purple
                  '#FF5959', // Red
                  '#46C8FF', // Blue
                ];
                
                // Cycle through accent colors
                const accentColor = accentColors[index % accentColors.length];

                return (
                  <ProjectCard
                    key={project.slug}
                    slug={project.slug}
                    title={project.title}
                    image={project.image}
                    description={project.description}
                    tags={tags}
                    draft={project.draft}
                    links={links}
                    locale={locale}
                    accentColor={accentColor}
                    t={t.projects}
                  />
                );
              })}
            </ContentGrid>

            <div className="section-view-all-container">
              <Link href="/projects" className="view-all-button">
                {t.projects.viewAllProjects}
              </Link>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="section-heading-container">
              <h3 className="section-heading">
                {t.sections.activity.title}
              </h3>
              <Image
                src={getAssetPath("/assets/svg/home/activity-heading.svg")}
                alt="Section heading underline"
                width={146}
                height={26}
                className="section-heading-underline"
              />
            </div>

            <div className="section-content">
              {featuredActivities.map((activity, index) => (
                <Activity
                  key={activity.slug}
                  title={activity.title}
                  subtitle={activity.subtitle || ''}
                  text={activity.summary?.text || activity.description || ''}
                  slug={activity.slug}
                  locale={locale}
                  imageSrc={getAssetPath(activity.image)}
                  imageAlt={activity.title}
                  imagePosition={index % 2 === 0 ? 'right' : 'left'}
                  color={activity.color || '#FF46CE'}
                  imageBorderRadius={activity.imageBorderRadius}
                  keyPoints={activity.summary?.keyPoints}
                  t={t.activities}
                />
              ))}
            </div>

            <div className="section-view-all-container">
              <Link href="/activities" className="view-all-button">
                {t.activities.viewAllActivities}
              </Link>
            </div>
          </Container>
        </Section>

        <DonationSection t={t} DOGE_ADDRESS={DOGE_ADDRESS} />

        <Section>
          <Container>
            <div className="section-heading-container">
              <div className="mission-heading-with-svg">
                <Image
                  src={getAssetPath("/assets/svg/home/mission-heading.svg")}
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
