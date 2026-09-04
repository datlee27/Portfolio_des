import React, { useState } from 'react';
import { showreelData } from '../data/homeData';

export default function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="d4-showreel"
      style={{
        padding: '30px 0 50px',
        background: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="des4-container"
        style={{
          width: '100%',
          maxWidth: 1100,
          aspectRatio: '16/9',
          borderRadius: 24,
          overflow: 'hidden',
          background: '#f2f2f2',
          position: 'relative',
          boxShadow: '0 24px 80px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          padding: 0,
        }}
      >
        {!isPlaying ? (
          /* Colorful Bento Grid Collage */
          <div
            onClick={() => setIsPlaying(true)}
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.9fr 1.3fr 0.2fr',
              gridTemplateRows: '1fr 1fr',
              gap: 12,
              padding: 16,
              background: '#f9f9f9',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {/* Tile 1: Top Left Yellow */}
            <div
              style={{
                background: '#ffe815',
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 48,
                  background: 'repeating-linear-gradient(90deg, #ffd000 0px, #ffd000 20px, transparent 20px, transparent 40px)',
                  borderRadius: '20px 20px 0 0',
                }}
              />
            </div>

            {/* Tile 2: Red with Sparkles */}
            <div
              style={{
                gridRow: '1 / 3',
                gridColumn: '2',
                background: '#fe3c01',
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                color: '#ff75f6',
                fontSize: 'clamp(24px, 4vw, 48px)',
                padding: 16,
              }}
            >
              <span>✹</span>
              <span>✹</span>
            </div>

            {/* Tile 3: Purple with 3D Blob */}
            <div
              style={{
                gridRow: '1 / 3',
                gridColumn: '3',
                background: '#c084fc',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '60%',
                  height: '60%',
                  background: '#e9d5ff',
                  borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                  boxShadow: 'inset 0 10px 30px rgba(255,255,255,0.6)',
                  animation: 'floatGentle 4s ease-in-out infinite',
                }}
              />
            </div>

            {/* Tile 4: Bottom Left Green with Cassette Counter */}
            <div
              style={{
                gridRow: '2',
                gridColumn: '1',
                background: '#00d66c',
                borderRadius: 20,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#000000',
                fontFamily: 'monospace',
              }}
            >
              <div style={{ fontSize: 'clamp(12px, 2vw, 20px)', fontWeight: 700 }}>2 : 18 : 54</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#000' }} />
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#000' }} />
                </div>
              </div>
            </div>

            {/* Right side gray edge */}
            <div
              style={{
                gridRow: '1 / 3',
                gridColumn: '4',
                background: '#e5e7eb',
                borderRadius: 14,
              }}
            />

            {/* Center Floating 'play' Pill */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                padding: '10px 28px',
                borderRadius: 100,
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid #00d66c',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-outfit)',
                fontSize: 18,
                fontWeight: 900,
                color: '#00b894',
                letterSpacing: '-0.02em',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)')}
            >
              play
            </div>
          </div>
        ) : (
          /* Actual Video Player */
          <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
            <video
              src={showreelData.videoUrl}
              autoPlay
              controls
              loop
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              onClick={() => setIsPlaying(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 20,
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: 100,
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              ✕ Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
