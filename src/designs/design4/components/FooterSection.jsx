import React from 'react';
import { siteMeta } from '../data/homeData';

export default function FooterSection() {
  return (
    <footer
      id="d4-footer"
      style={{
        padding: '140px 40px 180px',
        background: '#000000',
        color: '#ffffff',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div className="des4-container">
        {/* Contact Heading */}
        <div style={{ marginBottom: 120 }}>
          <div
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(32px, 5.5vw, 72px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            <div>got a project in mind?</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3em', flexWrap: 'wrap' }}>
              <span>let's talk</span>
              <a
                href={`mailto:${siteMeta.email}`}
                style={{
                  color: '#fe3c01',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {siteMeta.email}
              </a>
            </div>
          </div>
        </div>

        {/* Giant Centered Emblem DL* /26 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px 0',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(100px, 24vw, 320px)',
              fontWeight: 900,
              lineHeight: 0.82,
              letterSpacing: '-0.05em',
              color: '#ffffff',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            DL<span style={{ color: '#fe3c01' }}>*</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(60px, 14vw, 180px)',
              fontWeight: 900,
              lineHeight: 0.82,
              letterSpacing: '-0.05em',
              color: '#ffffff',
              marginTop: '0.05em',
            }}
          >
            /26
          </div>
        </div>
      </div>
    </footer>
  );
}
