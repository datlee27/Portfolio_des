import React from 'react';
import ClotheslineGallery from './ClotheslineGallery';

export default function IntroSection() {
  return (
    <section id="d4-intro" className="des4-intro-wrapper">
      <div className="des4-container" style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Editorial Narrative & Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="des4-intro-header-tag">
            <span style={{ color: '#fe3c01', fontSize: 16, fontWeight: 900 }}>*</span>
            <span>Craft &amp; Architecture • Lê Văn Đạt</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {/* Short, Punchy Editorial Narrative (No Text Clutter) */}
            <p className="des4-intro-narrative" style={{ margin: 0 }}>
              Dat Le is a{' '}
              <span className="des4-intro-tag">
                Fullstack Developer
              </span>{' '}
              and{' '}
              <span className="des4-intro-tag">
                Technical Artisan
              </span>{' '}
              based in Da Nang, Vietnam. He builds{' '}
              <span className="des4-intro-serif" style={{ color: '#fe3c01' }}>
                Clean Architectures,
              </span>{' '}
              <span className="des4-intro-serif" style={{ color: '#0b1dff' }}>
                Scalable Backends,
              </span>{' '}
              and{' '}
              <span className="des4-intro-serif" style={{ color: '#10b981' }}>
                Tactile UI
              </span>{' '}
              into cohesive, production-ready digital products.
            </p>

            {/* Thoughtful Prototype Quote matching user reference */}
            <div
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                lineHeight: 1.7,
                color: '#64748b',
                maxWidth: 440,
                justifySelf: 'end',
                borderLeft: '2px solid #e2e8f0',
                paddingLeft: 18,
              }}
            >
              “it's a messy prototype nobody's seen yet. This back-and-forth between imagining and building is where the real work happens — and it's what keeps things interesting.”
            </div>
          </div>
        </div>

        {/* ─── CLOTHESLINE GALLERY (Hanging Polaroids on Curved Wire) ─── */}
        <ClotheslineGallery />
      </div>
    </section>
  );
}
