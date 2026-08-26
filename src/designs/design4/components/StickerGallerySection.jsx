import React from 'react';
import { stickerGallery } from '../data/homeData';

export default function StickerGallerySection() {
  return (
    <section
      id="d4-lab"
      style={{
        padding: '120px 40px',
        background: '#ffffff',
        position: 'relative',
      }}
    >
      <div className="des4-container">
        {/* Header */}
        <div style={{ marginBottom: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: 'clamp(36px, 6vw, 80px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#000000',
                margin: 0,
              }}
            >
              lab & experiments <span style={{ color: '#fe3c01' }}>*</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 16,
                color: '#888888',
                marginTop: 8,
              }}
            >
              For experiments, explorations, and side quests.
            </p>
          </div>
        </div>

        {/* Masonry / Floating Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
          }}
        >
          {stickerGallery.map((item, idx) => (
            <div
              key={item.id}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: '#f0f0f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                border: '1px solid #e0e0e0',
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(1.04) rotate(${item.rotate || '0deg'})`;
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                style={{
                  width: '100%',
                  height: 320,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ padding: '16px 20px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#000000',
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 12,
                    color: '#fe3c01',
                    fontWeight: 600,
                  }}
                >
                  EXP-{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
