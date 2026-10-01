import React, { useState, useMemo } from 'react';
import portfolioData from '../../../../portfolioData.json';
import { usePortfolio } from '../../../context/PortfolioContext';
import Logomarquee from './Logomarquee';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredSkill, setHoveredSkill] = useState({ color: '#fe3c01', name: '' });

  const { skills: liveSkills } = usePortfolio();
  const currentSkills = useMemo(() => {
    return liveSkills && liveSkills.length > 0 ? liveSkills : portfolioData?.skills || [];
  }, [liveSkills]);

  // Extract categories from dynamic skills
  const categories = useMemo(() => {
    const rawCats = currentSkills.map((s) => s.category) || [];
    return ['ALL', ...rawCats];
  }, [currentSkills]);

  return (
    <section
      id="d4-skills"
      style={{
        position: 'relative',
        background: '#FFFFFF',
        color: '#111111',
        padding: '96px 0 80px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(17, 17, 17, 0.12)',
        userSelect: 'none',
      }}
    >
      <div className="des4-container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            marginBottom: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#059669',
                boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.2)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'rgba(17, 17, 17, 0.55)',
                textTransform: 'uppercase',
              }}
            >
              technical capabilities &amp; stack
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-sans, "Inter", sans-serif)',
              fontSize: 'clamp(36px, 7vw, 92px)',
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              margin: 0,
              color: '#111111',
              textTransform: 'lowercase',
            }}
          >
            skills &amp; stack<span style={{ color: '#fe3c01' }}>*</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isActive ? '#111111' : '#ece8de',
                  color: isActive ? '#ffffff' : 'rgba(17, 17, 17, 0.75)',
                  border: isActive
                    ? '1px solid #111111'
                    : '1px solid rgba(17, 17, 17, 0.15)',
                  padding: '7px 16px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'lowercase',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#111111';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#111111';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#ece8de';
                    e.currentTarget.style.color = 'rgba(17, 17, 17, 0.75)';
                    e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.15)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual-Track Infinite Marquee with Clean White Card Style */}
      <div style={{ width: '100%', position: 'relative', zIndex: 5 }}>
        <Logomarquee
          activeCategory={activeCategory}
          currentSkills={currentSkills}
          onLogoHover={(logo) => setHoveredSkill({ color: logo.color, name: logo.name })}
        />
      </div>
    </section>
  );
}
