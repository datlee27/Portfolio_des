import React from 'react';

export default function WhatIDoSection() {
  return (
    <section
      id="d4-whatido"
      style={{
        padding: '140px 40px 180px',
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
            fontSize: 'clamp(54px, 10vw, 150px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#000000',
            margin: '0 0 24px 0',
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
            maxWidth: 480,
            marginBottom: 80,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#0b1dff', fontWeight: 700 }}>* </span>
          I approach design through brand strategy and experience storytelling, using visuals, motion, and interaction to create work that is not only visually strong but also purposeful and narrative-driven.
        </p>

        {/* Grid Layout: Left 3D Tomato Render + Right 3 Capability Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Left: 3D Workspace Screen */}
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              border: '1px solid rgba(0,0,0,0.15)',
              background: '#1e1e1e',
              position: 'sticky',
              top: 100,
            }}
          >
            <img
              src="https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg?width=696&height=1024"
              alt="Blender 3D Workspace"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Right: 3 Interactive Capability Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {/* Block 1 */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#000000',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span>digital (</span>
                <span
                  style={{
                    display: 'inline-flex',
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#0b1dff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 18,
                  }}
                >
                  💿
                </span>
                <span>)</span>
                <span>experiences</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, color: '#0b1dff' }}>(01)</span>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 500, color: '#000000', margin: 0 }}>
                  Design and build interactive systems that work. I bridge the gap between high-level strategy and technical reality.
                </p>
              </div>

              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#222222', lineHeight: 1.8 }}>
                <div>(01.01) Brand Identity</div>
                <div>(01.02) Experiential Design</div>
                <div>(01.03) 2D & 3D Animation</div>
                <div>(01.04) Environments & Spatial Design</div>
                <div>(01.05) Interactive Installations</div>
                <div>(01.06) Touchscreen & Website</div>
              </div>
            </div>

            {/* Block 2 */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#000000',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span>(</span>
                <span
                  style={{
                    display: 'inline-flex',
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: '#0b1dff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 18,
                  }}
                >
                  🪑
                </span>
                <span>) creative</span>
                <span>execution</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, color: '#0b1dff' }}>(02)</span>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 500, color: '#000000', margin: 0 }}>
                  Turning complex concepts into executable realities through a deep mastery of motion, 3D, and interactive pipelines.
                </p>
              </div>

              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#222222', lineHeight: 1.8 }}>
                <div>(02.01) Art Direction</div>
                <div>(02.02) Concept Development</div>
                <div>(02.03) Brand Systems</div>
                <div>(02.04) Motion Graphics</div>
                <div>(02.05) Interactive UI/UX</div>
                <div>(02.06) Post-Production</div>
                <div>(02.07) 3D Pipelines</div>
              </div>
            </div>

            {/* Block 3 */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#000000',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span>lead (</span>
                <span
                  style={{
                    display: 'inline-flex',
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#0b1dff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 18,
                  }}
                >
                  🎯
                </span>
                <span>)</span>
                <span>strategy</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, color: '#0b1dff' }}>(03)</span>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 500, color: '#000000', margin: 0 }}>
                  Aligning technical teams with creative vision. I lead designers and developers to ensure the narrative scales.
                </p>
              </div>

              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#222222', lineHeight: 1.8 }}>
                <div>(03.01) Project Pitching & Vision</div>
                <div>(03.02) Storytelling & Narrative</div>
                <div>(03.03) End-to-end Delivery</div>
                <div>(03.04) Team Leadership</div>
                <div>(03.05) Technical Feasibility & Strategy</div>
                <div>(03.06) Developer Collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
