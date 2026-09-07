import React from 'react';
import ClotheslineGallery from './ClotheslineGallery';
import InteractiveBook from './InteractiveBook';

export default function IntroSection() {
  return (
    <section id="d4-intro" className="des4-intro-wrapper">
      <div className="des4-container" style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Editorial Narrative & Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* <div className="des4-intro-header-tag">
            <span style={{ color: '#fe3c01', fontSize: 16, fontWeight: 900 }}>*</span>
            <span>Craft &amp; Architecture • Lê Văn Đạt</span>
          </div> */}

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

            {/* Interactive 3D Journal / Book (Framer Component) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                justifySelf: 'end',
                padding: '10px 0',
              }}
            >
              <InteractiveBook width={220} height={300} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── CLOTHESLINE GALLERY (Full Width Screen Wire & Draggable) ─── */}
      <ClotheslineGallery />
    </section>
  );
}
