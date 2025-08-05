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
import { Carousel } from '@/components/specific/Carousel';
import Image from 'next/image';
import DogePaw from '@/components/icons/DogePaw';

export default function Home() {
  return (
    <>
      <Header>
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
          <div>
            <Carousel className="-mt-2" />
          </div>
        </Container>
      </Header>

      <Main>
        <Section>
          <Container>
            <div className="flex flex-col items-center text-center gap-8">
              <P.Leading className="max-w-2xl">
                Build something amazing with our modern and flexible components
              </P.Leading>
              <div className="flex items-center gap-4">
                <Button variant="primary" size="lg">
                  Get started
                </Button>
                <Button variant="secondary" size="lg">
                  Learn more
                </Button>
              </div>
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
