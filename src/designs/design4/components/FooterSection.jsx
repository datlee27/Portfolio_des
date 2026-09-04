import React from 'react';
import { siteMeta } from '../data/homeData';

export default function FooterSection() {
  return (
    <footer
      id="d4-footer"
      style={{
        padding: '60px 0 80px',
        background: '#000000',
        color: '#ffffff',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div className="des4-container">
        {/* Contact Heading */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(24px, 5vw, 64px)',
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
                href={siteMeta.emailHref}
                style={{
                  color: '#fe3c01',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                  wordBreak: 'break-all',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {siteMeta.email}
              </a>
            </div>
          </div>

          {/* Social Links Row */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              marginTop: 24,
            }}
          >
            <a
              href={siteMeta.emailHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 18px',
                minHeight: 44,
                borderRadius: 100,
                background: '#ffffff',
                color: '#000000',
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                touchAction: 'manipulation',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fe3c01';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
              }}
            >
              ✉ EMAIL ME
            </a>

            <a
              href={siteMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 18px',
                minHeight: 44,
                borderRadius: 100,
                background: '#222222',
                color: '#ffffff',
                border: '1px solid #444444',
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                touchAction: 'manipulation',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#444444';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🐙 GITHUB (DATLEE27) ↗
            </a>

            <a
              href={siteMeta.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 18px',
                minHeight: 44,
                borderRadius: 100,
                background: '#222222',
                color: '#ffffff',
                border: '1px solid #444444',
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                touchAction: 'manipulation',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0b1dff';
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#444444';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📘 FACEBOOK ↗
            </a>
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
            padding: '10px 0 0 0',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(64px, 18vw, 240px)',
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
              fontSize: 'clamp(40px, 11vw, 150px)',
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
