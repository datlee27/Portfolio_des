import React from 'react';

export default function IntroSection() {
  return (
    <section
      id="d4-intro"
      style={{
        padding: '160px 40px 140px',
        background: '#ffffff',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        className="des4-container"
        style={{
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(24px, 3.8vw, 44px)',
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
            color: '#000000',
            margin: 0,
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 900, marginRight: 8 }}>*</span>
          Dat Le is a multidisciplinary designer{' '}
          {/* Tomato Sticker */}
          <span
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              margin: '0 4px',
              fontSize: '0.85em',
            }}
          >
            🍅
          </span>{' '}
          and creative lead{' '}
          {/* Glowing storefront sign sticker */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 54,
              height: 28,
              borderRadius: 6,
              background: '#111',
              color: '#ffe815',
              fontSize: 10,
              fontWeight: 800,
              fontFamily: 'var(--font-inter)',
              verticalAlign: 'middle',
              margin: '0 6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              border: '1px solid #333',
            }}
          >
            LA CARAVELLE
          </span>{' '}
          who blends{' '}
          <span style={{ fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontWeight: 700 }}>
            Art Direction, Brand Systems, Motion,
          </span>{' '}
          and{' '}
          <span style={{ fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontWeight: 700 }}>
            Interactive Design
          </span>{' '}
          into{' '}
          {/* Orange mushroom lamp */}
          <span
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              margin: '0 4px',
              fontSize: '0.85em',
            }}
          >
            🏮
          </span>{' '}
          cohesive visual storytelling.{' '}
          {/* Water ripple badge */}
          <span
            style={{
              display: 'inline-flex',
              width: 36,
              height: 28,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
              verticalAlign: 'middle',
              margin: '0 6px',
              boxShadow: '0 2px 6px rgba(9,132,227,0.3)',
            }}
          />{' '}
          He leads projects{' '}
          <span style={{ fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontWeight: 700 }}>
            End-to-End,
          </span>{' '}
          {/* Skateboard shoe sticker */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 26,
              borderRadius: 6,
              background: '#2d3436',
              color: '#dfe6e9',
              fontSize: 10,
              verticalAlign: 'middle',
              margin: '0 6px',
            }}
          >
            👟
          </span>{' '}
          from discovery to implementation, guiding teams{' '}
          {/* Blue ceramic mug */}
          <span
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              margin: '0 4px',
              fontSize: '0.85em',
            }}
          >
            ☕
          </span>{' '}
          while staying hands-on, with a deep love for turning ideas into{' '}
          {/* .FINAL_FINAL Orange Badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 14px',
              borderRadius: 100,
              background: '#fe3c01',
              color: '#ffffff',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.45em',
              fontWeight: 800,
              letterSpacing: '0.04em',
              verticalAlign: 'middle',
              margin: '0 6px',
              boxShadow: '0 4px 12px rgba(254,60,1,0.35)',
            }}
          >
            .FINAL_FINAL
          </span>{' '}
          realities.
        </p>
      </div>
    </section>
  );
}
