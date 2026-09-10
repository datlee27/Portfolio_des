import React, { useState, useMemo } from 'react';
import portfolioData from '../../../../portfolioData.json';
import Logomarquee from './Logomarquee';
import SkillTrailEffect from './SkillTrailEffect';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredSkill, setHoveredSkill] = useState({ color: '#fe3c01', name: '' });

  // Extract categories from portfolioData.json
  const categories = useMemo(() => {
    const rawCats = portfolioData?.skills?.map((s) => s.category) || [];
    return ['ALL', ...rawCats];
  }, []);

  return (
    <section
      id="d4-skills"
      style={{
        position: 'relative',
        background: '#090a0f',
        color: '#ffffff',
        padding: '90px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        userSelect: 'none',
      }}
    >
      {/* Interactive Cursor Trail Canvas in background */}
      <SkillTrailEffect activeColor={hoveredSkill.color} activeSkillText={hoveredSkill.name} />

      <div className="des4-container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#25ff8d',
                boxShadow: '0 0 12px #25ff8d',
                animation: 'pulseGlow 1.5s infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#25ff8d',
                textTransform: 'uppercase',
              }}
            >
              TECHNICAL CAPABILITIES &amp; STACK
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(36px, 7vw, 100px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              margin: 0,
              color: '#ffffff',
            }}
          >
            skills &amp; tech stack<span style={{ color: '#fe3c01' }}>*</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 44,
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isActive ? '#fe3c01' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  border: isActive
                    ? '1.5px solid #fe3c01'
                    : '1.5px solid rgba(255, 255, 255, 0.12)',
                  padding: '8px 18px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: 'var(--font-inter)',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 8px 24px rgba(254,60,1,0.35)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual-Track Infinite Marquee with User's Card Style & Exact Tech Stack */}
      <div style={{ width: '100%', position: 'relative', zIndex: 5 }}>
        <Logomarquee
          activeCategory={activeCategory}
          onLogoHover={(logo) => setHoveredSkill({ color: logo.color, name: logo.name })}
        />
      </div>

      {/* Subtle Counter / Indicator Info */}
      <div
        className="des4-container"
        style={{
          marginTop: 36,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'var(--font-inter)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <span>Dual-track continuous hardware-accelerated marquee</span>
        <span>Hover to inspect technical profile &amp; pulse effect</span>
      </div>
    </section>
  );
}
