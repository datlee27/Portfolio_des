import React from 'react';
import { whatIDoData } from '../../data/homeData';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { optimizeCloudinaryUrl } from '@/services/cloudinary';

export default function WhatIDoSection() {
  return (
    <section
      id="d4-whatido"
      style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(64px, 8vh, 100px) 0',
        background: '#ECE8DE',
        color: '#111111',
        position: 'relative',
        borderTop: '1px solid rgba(17, 17, 17, 0.08)',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
      }}
    >
      <div className="des4-container">
        {/* Title & Subtitle */}
        <ScrollAnimation direction="up">
          <h2
            style={{
              fontFamily: 'var(--font-sans, "Inter", sans-serif)',
              fontSize: 'clamp(38px, 8vw, 110px)',
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#111111',
              margin: '0 0 16px 0',
              textTransform: 'lowercase',
            }}
          >
            what i do<span style={{ color: '#fe3c01' }}>*</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans, "Inter", sans-serif)',
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(17, 17, 17, 0.65)',
              maxWidth: 520,
              marginBottom: 48,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
            clean architecture, fullstack systems, and tactile web interfaces.
          </p>
        </ScrollAnimation>

        {/* Grid Layout: Left 3D Image + Right Capability Columns */}
        <div className="des4-project-row" style={{ borderTop: 'none', padding: 0 }}>
          {/* Left: 3D Workspace Screen */}
          <ScrollAnimation
            direction="left"
            delay={0.06}
            style={{ width: '100%' }}
          >
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                border: '1px solid rgba(17, 17, 17, 0.12)',
                background: '#ffffff',
                width: '100%',
                aspectRatio: '696 / 1024',
                position: 'relative',
              }}
            >
              <img
                src={optimizeCloudinaryUrl('https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg', { width: 800 })}
                alt="datlee avatar"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 60%',
                  display: 'block',
                }}
              />
            </div>
          </ScrollAnimation>

          {/* Right: 3 Interactive Capability Blocks */}
          <ScrollAnimation
            direction="right"
            delay={0.12}
            style={{ width: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {whatIDoData.columns.map((col, idx) => (
                <div key={idx} style={{ borderBottom: idx < 2 ? '1px solid rgba(17, 17, 17, 0.1)' : 'none', paddingBottom: idx < 2 ? 32 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'rgba(17, 17, 17, 0.45)',
                      }}
                    >
                      {col.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                        fontSize: 'clamp(20px, 2.8vw, 32px)',
                        fontWeight: 500,
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        color: '#111111',
                        margin: 0,
                        textTransform: 'lowercase',
                      }}
                    >
                      {col.title} {col.subtitle}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                      fontSize: 13.5,
                      color: 'rgba(17, 17, 17, 0.6)',
                      lineHeight: 1.6,
                      margin: '0 0 16px 0',
                      maxWidth: 480,
                    }}
                  >
                    {col.description}
                  </p>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 12,
                      color: 'rgba(17, 17, 17, 0.75)',
                      lineHeight: 1.8,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                      gap: 6,
                    }}
                  >
                    {col.items.map((item, itemIdx) => (
                      <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: 'rgba(17, 17, 17, 0.35)' }}>›</span>
                        <span>{item.replace(/^\(\d+\.\d+\)\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
