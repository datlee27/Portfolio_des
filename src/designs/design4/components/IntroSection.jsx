import React from 'react';
import ClotheslineGallery from './ClotheslineGallery';

export default function IntroSection() {
  return (
    <section id="d4-intro" className="des4-intro-wrapper">
      <div className="des4-container" style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
        {/* Editorial Narrative - Centered Single Statement (No Columns) */}
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
          <p
            className="des4-intro-narrative"
            style={{
              margin: 0,
              textAlign: 'center',
              maxWidth: 940,
            }}
          >
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
            <span className="des4-intro-serif" style={{ color: '#059669' }}>
              Tactile UI
            </span>{' '}
            into cohesive, production-ready digital products.
          </p>
        </div>
      </div>

      {/* ─── CLOTHESLINE GALLERY (Full Width Screen Wire & Draggable) ─── */}
      <ClotheslineGallery />
    </section>
  );
}

