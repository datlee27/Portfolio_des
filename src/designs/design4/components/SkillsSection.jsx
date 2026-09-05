import React, { useState, useMemo } from 'react';
import portfolioData from '../../../../portfolioData.json';
import LogoLoop from './LogoLoop';
import SkillTrailEffect from './SkillTrailEffect';

import {
  FaJava,
  FaNetworkWired,
  FaBrain,
  FaCog,
  FaCss3Alt,
} from 'react-icons/fa';

import {
  SiJavascript,
  SiHtml5,
  SiSpringboot,
  SiTypescript,
  SiMysql,
  SiSwagger,
  SiFigma,
  SiArduino,
  SiGit,
  SiBootstrap,
  SiVite,
} from 'react-icons/si';

import { TbCpu, TbBrandCSharp } from 'react-icons/tb';

// Mapping table for skills brand icons & colors
const SKILL_CONFIG = {
  JAVA: { node: <FaJava />, color: '#f89820', cat: 'WEB DEV' },
  JS: { node: <SiJavascript />, color: '#f7df1e', cat: 'WEB DEV' },
  HTML5: { node: <SiHtml5 />, color: '#e34f26', cat: 'WEB DEV' },
  CSS3: { node: <FaCss3Alt />, color: '#1572b6', cat: 'WEB DEV' },
  SPRING: { node: <SiSpringboot />, color: '#6db33f', cat: 'WEB DEV' },
  TYPESCRIPT: { node: <SiTypescript />, color: '#3178c6', cat: 'WEB DEV' },
  'C#': { node: <TbBrandCSharp />, color: '#239120', cat: 'WEB DEV' },

  SQL: { node: <SiMysql />, color: '#00758f', cat: 'DATA & API' },
  RESTFUL: { node: <FaNetworkWired />, color: '#25ff8d', cat: 'DATA & API' },
  SWAGGER: { node: <SiSwagger />, color: '#85ea2d', cat: 'DATA & API' },

  'LM STUDIO': { node: <FaBrain />, color: '#a259ff', cat: 'AI & DESIGN' },
  FIGMA: { node: <SiFigma />, color: '#f24e1e', cat: 'AI & DESIGN' },

  ARDUINO: { node: <SiArduino />, color: '#00979d', cat: 'HARDWARE (IOT)' },
  SENSORS: { node: <TbCpu />, color: '#25ff8d', cat: 'HARDWARE (IOT)' },
  MOTORS: { node: <FaCog />, color: '#ffe815', cat: 'HARDWARE (IOT)' },

  GIT: { node: <SiGit />, color: '#f05032', cat: 'TOOLS' },
  BOOTSTRAP: { node: <SiBootstrap />, color: '#7952b3', cat: 'TOOLS' },
  VITE: { node: <SiVite />, color: '#646cff', cat: 'TOOLS' },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredSkill, setHoveredSkill] = useState({ color: '#fe3c01', name: '' });

  // Extract categories & items from portfolioData.json
  const categories = useMemo(() => {
    const rawCats = portfolioData?.skills?.map((s) => s.category) || [];
    return ['ALL', ...rawCats];
  }, []);

  // Build full logo list with icons
  const allLogos = useMemo(() => {
    const list = [];
    (portfolioData?.skills || []).forEach((catGroup) => {
      catGroup.items.forEach((itemName) => {
        const key = itemName.toUpperCase();
        const conf = SKILL_CONFIG[key] || {
          node: <TbCpu />,
          color: '#fe3c01',
          cat: catGroup.category,
        };

        list.push({
          title: itemName,
          category: catGroup.category,
          node: conf.node,
          color: conf.color,
        });
      });
    });
    return list;
  }, []);

  // Filter logos according to active category
  const filteredLogos = useMemo(() => {
    if (activeCategory === 'ALL') return allLogos;
    return allLogos.filter((logo) => logo.category === activeCategory);
  }, [allLogos, activeCategory]);

  // Split into 2 rows for opposite scrolling marquees
  const row1Logos = useMemo(() => {
    const half = Math.ceil(filteredLogos.length / 2);
    return filteredLogos.slice(0, half);
  }, [filteredLogos]);

  const row2Logos = useMemo(() => {
    const half = Math.ceil(filteredLogos.length / 2);
    const slice = filteredLogos.slice(half);
    return slice.length > 0 ? slice : filteredLogos;
  }, [filteredLogos]);

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
            marginBottom: 40,
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

      {/* Marquee Row 1 (Moving Left) */}
      <div style={{ marginBottom: 20 }}>
        <LogoLoop
          logos={row1Logos}
          speed={190}
          direction="left"
          gap={32}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#090a0f"
          ariaLabel="Tech skills row 1"
          onLogoHover={(logo) => setHoveredSkill({ color: logo.color, name: logo.title })}
        />
      </div>

      {/* Marquee Row 2 (Moving Right) */}
      <div>
        <LogoLoop
          logos={row2Logos}
          speed={170}
          direction="right"
          gap={32}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#090a0f"
          ariaLabel="Tech skills row 2"
          onLogoHover={(logo) => setHoveredSkill({ color: logo.color, name: logo.title })}
        />
      </div>

      {/* Bottom Hint */}
      <div
        className="des4-container"
        style={{
          marginTop: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'var(--font-inter)',
        }}
      >
        <span>⚡ Move cursor over logos to trigger trail effect</span>
        <span style={{ color: '#25ff8d', fontWeight: 600 }}>● 100% PRODUCTION READY</span>
      </div>
    </section>
  );
}
