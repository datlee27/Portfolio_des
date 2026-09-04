import React from 'react';
import { whatIDoData } from '../data/homeData';

export default function WhatIDoSection() {
  return (
    <section
      id="d4-whatido"
      style={{
        padding: '60px 0',
        background: '#ff5500',
        color: '#000000',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div className="des4-container">
        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(40px, 9vw, 140px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#000000',
            margin: '0 0 20px 0',
          }}
        >
          what i do<span style={{ color: '#0b1dff' }}>*</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 14,
            fontWeight: 500,
            color: '#000000',
            maxWidth: 540,
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: '#0b1dff', fontWeight: 700 }}>* </span>
          {whatIDoData.subheading}
        </p>

        {/* Grid Layout: Left 3D Image + Right Capability Columns */}
        <div className="des4-project-row" style={{ borderTop: 'none', padding: 0 }}>
          {/* Left: 3D Workspace Screen */}
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              border: '1px solid rgba(0,0,0,0.15)',
              background: '#1e1e1e',
              width: '100%',
            }}
          >
            <img
              src="https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg?width=696&height=1024"
              alt="Blender 3D Workspace"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Right: 3 Interactive Capability Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {whatIDoData.columns.map((col, idx) => (
              <div key={idx}>
                <h3
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 'clamp(22px, 3.5vw, 44px)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#000000',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <span>{col.title}</span>
                  <span
                    style={{
                      display: 'inline-flex',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: col.color || '#0b1dff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 13,
                    }}
                  >
                    ✦
                  </span>
                  <span>{col.subtitle}</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, color: '#000' }}>
                    {col.num}
                  </span>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 500, color: '#000000', margin: 0 }}>
                    {col.description}
                  </p>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 13,
                    color: '#111111',
                    lineHeight: 1.8,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: 6,
                  }}
                >
                  {col.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ fontWeight: 600 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
