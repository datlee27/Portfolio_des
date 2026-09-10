import React from 'react';
import ClotheslineGallery from './ClotheslineGallery';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { FlipWords } from '@/components/ui/flipwords';

export default function IntroSection() {
  const pillars = [
    'Clean Architectures',
    'Scalable Backends',
    'Tactile UI',
  ];

  const pillarColors = [
    '#fe3c01', // Clean Architectures (Orange)
    '#0b1dff', // Scalable Backends (Blue)
    '#059669', // Tactile UI (Emerald Green)
  ];

  return (
    <section id="d4-intro" className="des4-intro-wrapper">
      <div className="des4-container" style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
        {/* Editorial Narrative - Centered Single Statement (Animate on Scroll) */}
        <ScrollAnimation direction="up" viewport={{ amount: 0.35 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              margin: '0 auto 40px auto',
            }}
          >
            <div
              className="des4-intro-narrative"
              style={{
                margin: 0,
                textAlign: 'center',
                maxWidth: 960,
              }}
            >
              {/* Line 1: Role and Location */}
              <div style={{ marginBottom: 12 }}>
                Dat Le is a{' '}
                <span className="des4-intro-tag">
                  Fullstack Developer
                </span>{' '}
                and{' '}
                <span className="des4-intro-tag">
                  Technical Artisan
                </span>{' '}
                based in Da Nang, Vietnam.
              </div>

              {/* Line 2: Craftsmanship Pillars with continuous FlipWords */}
              <div>
                He builds{' '}
                <FlipWords
                  words={pillars}
                  colors={pillarColors}
                  duration={2500}
                  className="des4-intro-serif"
                />{' '}
                into cohesive, production-ready digital products.
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* ─── CLOTHESLINE GALLERY (Full Width Screen Wire & Draggable) ─── */}
      <ScrollAnimation direction="up" viewport={{ amount: 0.2 }}>
        <ClotheslineGallery />
      </ScrollAnimation>
    </section>
  );
}
