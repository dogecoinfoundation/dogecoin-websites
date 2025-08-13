import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@repo/internationalization';
import { BlurEffect } from '@/components/common/BlurEffect';

interface PageProps {
  params: Promise<{ locale: string }>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 24, alignItems: 'center' }}>
            <div>
              <h1 style={{
                color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                fontSize: 'var(--Typography-Heading-H1-font-size, 64px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--Typography-Heading-H1-line-height, 72px)',
                margin: 0,
              }}>
                {ta.hero.title}
              </h1>

              <div style={{ marginTop: 16 }}>
                <p style={{
                  color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                  fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
                  fontSize: 'var(--Typography-Paragraph-Body-Lead-font-size, 24px)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'var(--Typography-Paragraph-Body-Lead-line-height, 34px)',
                  marginBottom: 8,
                }}>
                  {ta.hero.intro}
                </p>
                <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                  {(ta.hero.bulletPoints || []).map((text: string) => (
                    <li key={text} className="activity-key-points-item">
                      <span
                        className="activity-key-points-bullet"
                        style={{ borderColor: 'var(--Base-Brand-color-primary-500, #E3A849)', borderWidth: 2, borderStyle: 'solid' }}
                      />
                      <span style={{
                        color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                        fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
                        fontSize: 'var(--Typography-Paragraph-Body-Lead-font-size, 24px)',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'var(--Typography-Paragraph-Body-Lead-line-height, 34px)',
                      }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 style={{
                marginTop: 16,
                color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                fontSize: 'var(--Typography-Heading-H3-font-size, 40px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--Typography-Heading-H3-line-height, 48px)',
              }}>
                {ta.hero.subtitleBefore} <span style={{ color: 'var(--Base-Brand-color-primary-500, #E3A849)' }}>{ta.hero.subtitleHighlight}</span> {ta.hero.subtitleAfter}
              </h3>
            </div>

            <div style={{ position: 'relative', width: '100%', height: 340, borderRadius: 16, overflow: 'visible' }}>
              <div
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none' }}
                aria-hidden="true"
              >
                {/* Use a fixed square to avoid clipping; size approximates contained logo */}
                <div style={{ width: 340, height: 340 }}>
                  <BlurEffect color="var(--Base-Brand-color-primary-500, #E3A849)" opacity={0.15} scale={{ x: 4, y: 4 }} />
                </div>
              </div>
              <Image src="/assets/images/foundation-logo.png" alt="Dogecoin Foundation Logo" fill style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div>
            <h2 style={{
              color: 'var(--Colour-Text-text-primary-dark, #FFF)',
              fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
              fontSize: 'var(--Typography-Heading-H2-font-size, 48px)',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'var(--Typography-Heading-H2-line-height, 56px)',
              margin: 0,
            }}>
              {ta.manifesto.title}
            </h2>

            <p style={{
              marginTop: 12,
              color: 'var(--Colour-Text-text-primary-dark, #FFF)',
              fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
              fontSize: 'var(--Typography-Paragraph-Body-font-size, 20px)',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'var(--Typography-Paragraph-Body-line-height, 30px)',
            }}>
              {ta.manifesto.intro}
            </p>

            {/* Manifesto value cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              marginTop: 80,
            }}>
              {/* Being useful */}
              <div style={{
                borderRadius: 16,
                border: '4px solid var(--Dark-Border-Primary, #333230)',
                background: 'var(--Dark-Background-Secondary, #201F1D)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}>
                <div aria-hidden="true">
              <Image
              src="/assets/svg/about/manifesto-useful.svg"
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 style={{
                  color: 'var(--Colour-Base-Accent-color-accent-purple, #9780FF)',
                  textAlign: 'center',
                  fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                  fontSize: 'var(--Typography-Heading-H5-font-size, 24px)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'var(--Typography-Heading-H5-line-height, 32px)',
                  margin: 0,
                }}>{ta.manifesto.cards?.[0]?.title}</h4>
                <p style={{
                  color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                  textAlign: 'center',
                  fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
                  fontSize: 'var(--Typography-Paragraph-Caption-font-size, 16px)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'var(--Typography-Paragraph-Caption-line-height, 26px)',
                  margin: 0,
                }}>{ta.manifesto.cards?.[0]?.text}</p>
              </div>

              {/* Being personable */}
              <div style={{
                borderRadius: 16,
                border: '4px solid var(--Dark-Border-Primary, #333230)',
                background: 'var(--Dark-Background-Secondary, #201F1D)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}>
                <div aria-hidden="true">
                <Image
              src="/assets/svg/about/manifesto-personable.svg"
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 style={{
                  color: 'var(--Colour-Base-Accent-color-accent-purple, #FFFC36)',
                  textAlign: 'center',
                  fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                  fontSize: 'var(--Typography-Heading-H5-font-size, 24px)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'var(--Typography-Heading-H5-line-height, 32px)',
                  margin: 0,
                }}>{ta.manifesto.cards?.[1]?.title}</h4>
                <p style={{
                  color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                  textAlign: 'center',
                  fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
                  fontSize: 'var(--Typography-Paragraph-Caption-font-size, 16px)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'var(--Typography-Paragraph-Caption-line-height, 26px)',
                  margin: 0,
                }}>{ta.manifesto.cards?.[1]?.text}</p>
              </div>

              {/* Being welcoming */}
              <div style={{
                borderRadius: 16,
                border: '4px solid var(--Dark-Border-Primary, #333230)',
                background: 'var(--Dark-Background-Secondary, #201F1D)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}>
                <div aria-hidden="true">
                <Image
              src="/assets/svg/about/manifesto-welcoming.svg"
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 style={{
                  color: 'var(--Colour-Base-Accent-color-accent-purple, #2BF9FF)',
                  textAlign: 'center',
                  fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                  fontSize: 'var(--Typography-Heading-H5-font-size, 24px)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'var(--Typography-Heading-H5-line-height, 32px)',
                  margin: 0,
                }}>{ta.manifesto.cards?.[2]?.title}</h4>
                <p style={{ color: 'var(--Colour-Text-text-primary-dark, #FFF)', fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")', fontSize: 'var(--Typography-Paragraph-Caption-font-size, 16px)', fontStyle: 'normal', fontWeight: 400, lineHeight: 'var(--Typography-Paragraph-Caption-line-height, 26px)', textAlign: 'center', margin: 0 }}>{ta.manifesto.cards?.[2]?.text}</p>
              </div>

              {/* Being reliable */}
              <div style={{
                borderRadius: 16,
                border: '4px solid var(--Dark-Border-Primary, #333230)',
                background: 'var(--Dark-Background-Secondary, #201F1D)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}>
                <div aria-hidden="true">
                <Image
              src="/assets/svg/about/manifesto-reliable.svg"
              alt="Section heading underline"
              width={146}
              height={26}
            />
                </div>
                <h4 style={{
                  color: 'var(--Colour-Base-Accent-color-accent-purple, #62FF46)',
                  textAlign: 'center',
                  fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                  fontSize: 'var(--Typography-Heading-H5-font-size, 24px)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'var(--Typography-Heading-H5-line-height, 32px)',
                  margin: 0,
                }}>{ta.manifesto.cards?.[3]?.title}</h4>
                <p style={{
                  color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                  textAlign: 'center',
                  fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
                  fontSize: 'var(--Typography-Paragraph-Caption-font-size, 16px)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'var(--Typography-Paragraph-Caption-line-height, 26px)',
                  margin: 0,
                }}>{ta.manifesto.cards?.[3]?.text}</p>
              </div>
            </div>

            <div style={{ marginTop: 80 }}>
              <h3 style={{
                color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                textAlign: 'center',
                fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                fontSize: 'var(--Typography-Heading-H3-font-size, 40px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--Typography-Heading-H3-line-height, 48px)',
                margin: 0,
              }}>
                {ta.manifesto.signatoriesTitle}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '24px 80px', alignItems: 'start', justifyItems: 'start', marginTop: 16 }}>
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
                {/* Column 3 */}
                <ul className="activity-key-points-list">
                  {['Timothy Stebbing'].map((name) => (
                    <li key={name} className="activity-key-points-item">
                      <span className="activity-key-points-bullet" style={{ borderColor: 'var(--Base-Brand-color-primary-500, #E3A849)', borderWidth: 2, borderStyle: 'solid' }} />
                      <span className="activity-key-points-text">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 80, textAlign: 'left' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
                    <BlurEffect color="var(--Base-Brand-color-primary-500, #9780FF)" opacity={0.1} scale={{ x: 6, y: 5 }} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{
                      color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                      textAlign: 'left',
                      fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                      fontSize: 'var(--Typography-Heading-H3-font-size, 40px)',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'var(--Typography-Heading-H3-line-height, 48px)',
                      margin: 0,
                    }}>
                      {ta.manifesto.sign.title}
                    </h3>
                    <p style={{
                      marginTop: 8,
                      color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                      fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
                      fontSize: 'var(--Typography-Paragraph-Body-font-size, 20px)',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'var(--Typography-Paragraph-Body-line-height, 30px)',
                    }}>
                      {ta.manifesto.sign.text}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-start', marginTop: 12 }}>
                      <Link href="https://x.com" className="about-post-button" style={{
                        display: 'inline-flex',
                        height: 48,
                        padding: '0 24px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 8,
                        borderRadius: 1000,
                        background: 'transparent',
                        color: '#FFF',
                        fontFamily: 'var(--Typography-font-family-button, "Comic Neue")',
                        fontSize: 'var(--Typography-Button-Medium-font-size, 16px)',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'var(--Typography-Button-Medium-line-height, 24px)',
                        border: '2px solid #FFF',
                        textDecoration: 'none',
                      }}>
                        <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                        <Image
                            src="/assets/svg/icons/x.svg"
                            alt="Section heading underline"
                            width={20}
                            height={21}
                        />
                        </span>
                        <span>{ta.manifesto.sign.button}</span>
                      </Link>
                      <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                      <Image
                            src="/assets/svg/about/sign-arrow.svg"
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
          <div style={{
            display: 'flex',
            maxWidth: 'var(--Container-max-width, 1440px)',
            padding: 64,
            justifyContent: 'space-between',
            alignItems: 'stretch',
            gap: 'var(--Container-gap, 80px)',
            alignSelf: 'stretch',
            borderRadius: 24,
            border: '4px solid var(--Base-Grey-color-grey-700, #333230)',
            background: 'var(--Base-Grey-color-grey-800, #201F1D)'
          }}>
            <div style={{ flex: '0 1 60%' }}>
              <h2 style={{
                color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                fontFamily: 'var(--Typography-font-family-heading, "Comic Neue")',
                fontSize: 'var(--Typography-Heading-H2-font-size, 48px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--Typography-Heading-H2-line-height, 56px)',
                margin: 0,
              }}>
                {ta.history.title}
              </h2>
              <div style={{ marginTop: 8 }} aria-hidden="true">
              <Image
                            src="/assets/svg/underline.svg"
                            alt="Section heading underline"
                            width={230}
                            height={11}
                        />
              </div>

              <p style={{
                marginTop: 12,
                color: 'var(--Colour-Text-text-primary-dark, #FFF)',
                fontFamily: 'var(--Typography-font-family-paragraph, "Comic Neue")',
                fontSize: 'var(--Typography-Paragraph-Caption-font-size, 16px)',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'var(--Typography-Paragraph-Caption-line-height, 26px)'
              }}>
                {ta.history.description}
              </p>
            </div>
            <div style={{ flex: '0 1 40%', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 520, height: 360, borderRadius: 16, overflow: 'hidden' }}>
                <Image src="/assets/images/history-doge.png" alt="Dogecoin history" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer t={t} />
    </Main>
  );
}


