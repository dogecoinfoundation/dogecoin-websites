import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@repo/internationalization';
import { BlurEffect } from '@/components/common/BlurEffect';
import { getAssetPath } from '@/lib/assets';

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  const locales = ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ko"];
  return locales.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'About the foundation | Dogecoin Foundation',
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const t = dictionary['dogecoin.org'].home;
  const ta = t.about;

  return (
    <Main>
      <Section>
        <Container>
          <div className="about-hero-grid">
            <div>
              <h1 className="about-foundation-heading about-hero-title">
                {ta.hero.title}
              </h1>

              <div className="about-hero-content">
                <p className="about-hero-intro">
                  {ta.hero.intro}
                </p>
                <ul className="about-hero-bullet-list">
                  {(ta.hero.bulletPoints || []).map((text: string) => (
                    <li key={text} className="activity-key-points-item">
                      <span
                        className="activity-key-points-bullet"
                        style={{ borderColor: 'var(--Base-Brand-color-primary-500, #E3A849)', borderWidth: 2, borderStyle: 'solid' }}
                      />
                      <span className="about-hero-bullet-text">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="about-hero-subtitle">
                {ta.hero.subtitleBefore} <span className="about-hero-subtitle-highlight">{ta.hero.subtitleHighlight}</span> {ta.hero.subtitleAfter}
              </h3>
            </div>

            <div className="about-hero-logo-container">
              <div
                className="about-hero-blur-wrapper"
                aria-hidden="true"
              >
                {/* Use a fixed square to avoid clipping; size approximates contained logo */}
                <div className="about-hero-blur-square">
                  <BlurEffect color="var(--Base-Brand-color-primary-500, #E3A849)" opacity={0.15} scale={{ x: 4, y: 4 }} />
                </div>
              </div>
              <Image src={getAssetPath("/assets/images/foundation-logo.png")} alt="Dogecoin Foundation Logo" fill style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div>
            <h2 className="about-manifesto-title">
              {ta.manifesto.title}
            </h2>

            <p className="about-manifesto-intro">
              {ta.manifesto.intro}
            </p>

            {/* Manifesto value cards */}
            <div className="about-manifesto-cards">
              {/* Being useful */}
              <div className="about-manifesto-card">
                                <div aria-hidden="true" className="about-manifesto-card-icon">
              <Image
              src={getAssetPath("/assets/svg/about/manifesto-useful.svg")}
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 className="about-manifesto-card-title about-manifesto-card-title-useful">{ta.manifesto.cards?.[0]?.title}</h4>
                <p className="about-manifesto-card-text">{ta.manifesto.cards?.[0]?.text}</p>
              </div>

              {/* Being personable */}
              <div className="about-manifesto-card">
                <div aria-hidden="true" className="about-manifesto-card-icon">
                <Image
              src={getAssetPath("/assets/svg/about/manifesto-personable.svg")}
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 className="about-manifesto-card-title about-manifesto-card-title-personable">{ta.manifesto.cards?.[1]?.title}</h4>
                <p className="about-manifesto-card-text">{ta.manifesto.cards?.[1]?.text}</p>
              </div>

              {/* Being welcoming */}
              <div className="about-manifesto-card">
                <div aria-hidden="true" className="about-manifesto-card-icon">
                <Image
              src={getAssetPath("/assets/svg/about/manifesto-welcoming.svg")}
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 className="about-manifesto-card-title about-manifesto-card-title-welcoming">{ta.manifesto.cards?.[2]?.title}</h4>
                <p className="about-manifesto-card-text">{ta.manifesto.cards?.[2]?.text}</p>
              </div>

              {/* Being reliable */}
              <div className="about-manifesto-card">
                <div aria-hidden="true" className="about-manifesto-card-icon">
                <Image
              src={getAssetPath("/assets/svg/about/manifesto-reliable.svg")}
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 className="about-manifesto-card-title about-manifesto-card-title-reliable">{ta.manifesto.cards?.[3]?.title}</h4>
                <p className="about-manifesto-card-text">{ta.manifesto.cards?.[3]?.text}</p>
              </div>
            </div>

            <div className="about-signatories-section">
              <h3 className="about-signatories-title">
                {ta.manifesto.signatoriesTitle}
              </h3>

              <div className="about-signatories-grid">
                {/* Column 1 */}
                <ul className="activity-key-points-list">
                  {['Billy Markus', 'Gary Lachance'].map((name) => (
                    <li key={name} className="activity-key-points-item">
                      <span className="activity-key-points-bullet" style={{ borderColor: 'var(--Base-Brand-color-primary-500, #E3A849)', borderWidth: 2, borderStyle: 'solid' }} />
                      <span className="activity-key-points-text">{name}</span>
                    </li>
                  ))}
                </ul>
                {/* Column 2 */}
                <ul className="activity-key-points-list">
                  {['Michi Lumin', 'Ross Nicoll'].map((name) => (
                    <li key={name} className="activity-key-points-item">
                      <span className="activity-key-points-bullet" style={{ borderColor: 'var(--Base-Brand-color-primary-500, #E3A849)', borderWidth: 2, borderStyle: 'solid' }} />
                      <span className="activity-key-points-text">{name}</span>
                    </li>
                  ))}
                </ul>
                {/* Column 3 */}
                <ul className="activity-key-points-list">
                  {['Jens Wiechers', 'Max Keller'].map((name) => (
                    <li key={name} className="activity-key-points-item">
                      <span className="activity-key-points-bullet" style={{ borderColor: 'var(--Base-Brand-color-primary-500, #E3A849)', borderWidth: 2, borderStyle: 'solid' }} />
                      <span className="activity-key-points-text">{name}</span>
                    </li>
                  ))}
                </ul>
                {/* Column 4 */}
                <ul className="activity-key-points-list">
                  {['Timothy Stebbing'].map((name) => (
                    <li key={name} className="activity-key-points-item">
                      <span className="activity-key-points-bullet" style={{ borderColor: 'var(--Base-Brand-color-primary-500, #E3A849)', borderWidth: 2, borderStyle: 'solid' }} />
                      <span className="activity-key-points-text">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="about-sign-section">
                <div className="about-sign-container">
                  <div className="about-sign-blur-wrapper" aria-hidden="true">
                    <BlurEffect color="var(--Base-Brand-color-primary-500, #9780FF)" opacity={0.1} scale={{ x: 6, y: 5 }} />
                  </div>
                  <div className="about-sign-content">
                    <h3 className="about-sign-title">
                      {ta.manifesto.sign.title}
                    </h3>
                    <p className="about-sign-text">
                      {ta.manifesto.sign.text}
                    </p>

                    <div className="about-sign-actions">
                      <Link href="https://x.com" className="about-post-button">
                        <span aria-hidden="true" className="about-post-button-icon">
                        <Image
                            src={getAssetPath("/assets/svg/icons/x.svg")}
                            alt="Section heading underline"
                            width={20}
                            height={21}
                        />
                        </span>
                        <span>{ta.manifesto.sign.button}</span>
                      </Link>
                      <span aria-hidden="true" className="about-sign-arrow">
                      <Image
                            src={getAssetPath("/assets/svg/about/sign-arrow.svg")}
                            alt="Section heading underline"
                            width={234}
                            height={140}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="about-history-container">
            <div className="about-history-content">
              <h2 className="about-history-title">
                {ta.history.title}
              </h2>
              <div className="about-history-underline" aria-hidden="true">
              <Image
                            src={getAssetPath("/assets/svg/underline.svg")}
                            alt="Section heading underline"
                            width={230}
                            height={11}
                        />
              </div>

              <p className="about-history-description">
                {ta.history.description}
              </p>
              <p className="about-history-description">
                {ta.history.description2}
              </p>
            </div>
            <div className="about-history-image-container">
              <div className="about-history-image-wrapper">
                <Image src={getAssetPath("/assets/images/history-doge.png")} alt="Dogecoin history" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer t={t} />
    </Main>
  );
}


