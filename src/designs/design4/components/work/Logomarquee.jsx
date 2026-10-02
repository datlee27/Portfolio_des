'use client';
import React, { useEffect, useMemo } from 'react';

// ─── Import Official Tech Stack Icons from Assets ───
import jsIcon from '@/assets/techicons/javascript.svg';
import html5Icon from '@/assets/techicons/html5.svg';
import css3Icon from '@/assets/techicons/css3.svg';
import springIcon from '@/assets/techicons/spring.svg';
import tsIcon from '@/assets/techicons/typescript.svg';
import csharpIcon from '@/assets/techicons/csharp.svg';
import javaIcon from '@/assets/techicons/java.svg';
import sqlIcon from '@/assets/techicons/sql.svg';
import swaggerIcon from '@/assets/techicons/swagger.svg';
import figmaIcon from '@/assets/techicons/figma.svg';
import arduinoIcon from '@/assets/techicons/arduino.svg';
import gitIcon from '@/assets/techicons/git.svg';
import bootstrapIcon from '@/assets/techicons/bootstrap.svg';
import viteIcon from '@/assets/techicons/vite.svg';
import reactIcon from '@/assets/techicons/react.svg';
import restfulIcon from '@/assets/techicons/restful.svg';
import lmstudioIcon from '@/assets/techicons/lmstudio.svg';
import sensorsIcon from '@/assets/techicons/sensors.svg';
import motorsIcon from '@/assets/techicons/motors.svg';

// ─── Icon mapping by skill name (lowercase) ───
const ICON_MAP = {
  js: jsIcon,
  javascript: jsIcon,
  html5: html5Icon,
  html: html5Icon,
  css3: css3Icon,
  css: css3Icon,
  spring: springIcon,
  'spring boot': springIcon,
  typescript: tsIcon,
  ts: tsIcon,
  'c#': csharpIcon,
  csharp: csharpIcon,
  java: javaIcon,
  sql: sqlIcon,
  mysql: sqlIcon,
  swagger: swaggerIcon,
  figma: figmaIcon,
  arduino: arduinoIcon,
  git: gitIcon,
  bootstrap: bootstrapIcon,
  vite: viteIcon,
  react: reactIcon,
  restful: restfulIcon,
  'restful api': restfulIcon,
  'lm studio': lmstudioIcon,
  ai: lmstudioIcon,
  sensors: sensorsIcon,
  motors: motorsIcon,
};

// ─── Color mapping by skill name ───
const COLOR_MAP = {
  js: '#f7df1e',
  javascript: '#f7df1e',
  html5: '#e34f26',
  html: '#e34f26',
  css3: '#1572b6',
  css: '#1572b6',
  spring: '#6db33f',
  'spring boot': '#6db33f',
  typescript: '#3178c6',
  ts: '#3178c6',
  'c#': '#9b4993',
  csharp: '#9b4993',
  java: '#f89820',
  sql: '#00758f',
  mysql: '#00758f',
  swagger: '#85ea2d',
  figma: '#f24e1e',
  arduino: '#00979d',
  git: '#f05032',
  bootstrap: '#7952b3',
  vite: '#bd34fe',
  react: '#61dafb',
  restful: '#25ff8d',
  'restful api': '#25ff8d',
  'lm studio': '#a259ff',
  ai: '#a259ff',
  sensors: '#25ff8d',
  motors: '#fe3c01',
};

const getCategoryColor = (cat = '') => {
  const c = cat.toUpperCase();
  if (c.includes('WEB')) return '#61dafb';
  if (c.includes('DATA') || c.includes('API')) return '#00758f';
  if (c.includes('AI') || c.includes('DESIGN')) return '#a259ff';
  if (c.includes('HARDWARE') || c.includes('IOT')) return '#00979d';
  if (c.includes('TOOL')) return '#bd34fe';
  return '#fe3c01';
};

// ─── Dat Lee's Actual Skills Datasets ───

// Row 1
const logos1 = [
  { id: 1, name: 'JS', category: 'WEB DEV', color: '#f7df1e', icon: jsIcon },
  { id: 2, name: 'HTML5', category: 'WEB DEV', color: '#e34f26', icon: html5Icon },
  { id: 3, name: 'CSS3', category: 'WEB DEV', color: '#1572b6', icon: css3Icon },
  { id: 4, name: 'Spring', category: 'WEB DEV', color: '#6db33f', icon: springIcon },
  { id: 5, name: 'TypeScript', category: 'WEB DEV', color: '#3178c6', icon: tsIcon },
  { id: 6, name: 'C#', category: 'WEB DEV', color: '#9b4993', icon: csharpIcon },
  { id: 7, name: 'SQL', category: 'DATA & API', color: '#00758f', icon: sqlIcon },
  { id: 8, name: 'RESTful', category: 'DATA & API', color: '#25ff8d', icon: restfulIcon },
  { id: 9, name: 'Java', category: 'WEB DEV', color: '#f89820', icon: javaIcon },
];

// Row 2
const logos2 = [
  { id: 10, name: 'Swagger', category: 'DATA & API', color: '#85ea2d', icon: swaggerIcon },
  { id: 11, name: 'LM Studio', category: 'AI & DESIGN', color: '#a259ff', icon: lmstudioIcon },
  { id: 12, name: 'Figma', category: 'AI & DESIGN', color: '#f24e1e', icon: figmaIcon },
  { id: 13, name: 'Arduino', category: 'HARDWARE (IOT)', color: '#00979d', icon: arduinoIcon },
  { id: 14, name: 'Sensors', category: 'HARDWARE (IOT)', color: '#25ff8d', icon: sensorsIcon },
  { id: 15, name: 'Motors', category: 'HARDWARE (IOT)', color: '#fe3c01', icon: motorsIcon },
  { id: 16, name: 'Git', category: 'TOOLS', color: '#f05032', icon: gitIcon },
  { id: 17, name: 'Bootstrap', category: 'TOOLS', color: '#7952b3', icon: bootstrapIcon },
  { id: 18, name: 'Vite', category: 'TOOLS', color: '#bd34fe', icon: viteIcon },
];

// Combine all for category filtering
const allSkillsList = [...logos1, ...logos2];

/**
 * Logomarquee component with dual-track infinite marquee
 * Matching the exact card shape, aspect ratio (1 / 1.2), mask gradient, and forward/reverse speeds.
 */
function Logomarquee({ activeCategory = 'ALL', currentSkills = null, onLogoHover = () => {} }) {
  // Inject mathematical keyframes for smooth, infinite, subpixel-precise loop
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'd4-marquee-keyframes';
    styleSheet.innerText = `
      @keyframes marquee-move {
        0% {
          transform: translate3d(0, 0, 0);
        }
        100% {
          transform: translate3d(-50%, 0, 0);
        }
      }
      .d4-marquee-card-item {
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                    border-color 0.28s ease,
                    box-shadow 0.28s ease,
                    background 0.28s ease;
      }
      .d4-marquee-card-item:hover {
        transform: translateY(-5px) scale(1.05) !important;
        background: rgba(255, 255, 255, 0.12) !important;
      }
      .d4-marquee-track-container:hover .d4-marquee-animated-track {
        animation-play-state: paused !important;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      const el = document.getElementById('d4-marquee-keyframes');
      if (el) document.head.removeChild(el);
    };
  }, []);

  // Dynamically resolve skills dataset from currentSkills or fallback
  const dynamicSkillsList = useMemo(() => {
    if (!currentSkills || !Array.isArray(currentSkills) || currentSkills.length === 0) {
      return allSkillsList;
    }
    const list = [];
    let idCounter = 100;
    currentSkills.forEach((catObj) => {
      const catName = catObj.category || 'GENERAL';
      const items = Array.isArray(catObj.items) ? catObj.items : [];
      items.forEach((item) => {
        const name = String(item).trim();
        if (!name) return;
        const key = name.toLowerCase();
        const iconSrc = ICON_MAP[key] || ICON_MAP[key.replace(/\s+/g, '')];
        const color = COLOR_MAP[key] || COLOR_MAP[key.replace(/\s+/g, '')] || getCategoryColor(catName);
        list.push({
          id: idCounter++,
          name,
          category: catName,
          color,
          icon: iconSrc || null,
        });
      });
    });
    return list.length > 0 ? list : allSkillsList;
  }, [currentSkills]);

  // Filter skills by selected category if user clicked a filter pill
  const { filteredRow1, filteredRow2 } = useMemo(() => {
    const listToFilter = dynamicSkillsList;
    let matches = listToFilter;

    if (activeCategory && activeCategory !== 'ALL') {
      matches = listToFilter.filter(
        (s) => s.category.trim().toUpperCase() === activeCategory.trim().toUpperCase()
      );
    }

    if (matches.length === 0) {
      matches = listToFilter;
    }

    // Ensure we have enough items to maintain continuous marquee without gaps
    const ensureCount = (arr, min = 6) => {
      if (!arr || arr.length === 0) return listToFilter;
      let res = [...arr];
      while (res.length < min) {
        res = [...res, ...arr];
      }
      return res;
    };

    const half = Math.ceil(matches.length / 2);
    const r1 = matches.slice(0, half);
    const r2 = matches.slice(half).length > 0 ? matches.slice(half) : matches;

    return {
      filteredRow1: ensureCount(r1),
      filteredRow2: ensureCount(r2),
    };
  }, [activeCategory, dynamicSkillsList]);

  const Marquee = ({ logos, direction = 'forwards' }) => {
    const numItems = logos.length;
    const speed = '26s';
    const itemWidth = '120px';
    const itemGap = '25px';

    return (
      <div
        className="d4-marquee-track-container max-w-full overflow-hidden"
        style={{
          width: '100%',
          overflow: 'hidden',
          padding: '8px 0',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)',
          '--speed': speed,
          '--numItems': numItems,
          '--item-width': itemWidth,
          '--item-gap': itemGap,
          '--direction': direction,
        }}
      >
        <div
          className="d4-marquee-animated-track w-max flex"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `marquee-move var(--speed) linear infinite ${direction}`,
            willChange: 'transform',
          }}
        >
          {/* Double the list for mathematically seamless infinite scroll */}
          {[...logos, ...logos].map((logo, index) => {
            const cardColor = logo.color || '#fe3c01';
            return (
              <div
                key={`${logo.name || logo.id}-${index}`}
                className="d4-marquee-card-item flex-shrink-0 flex flex-col justify-center items-center rounded-2xl"
                style={{
                  width: 'var(--item-width)',
                  aspectRatio: '1 / 1.2',
                  marginRight: 'var(--item-gap)',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: '1px solid rgba(17, 17, 17, 0.1)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  padding: '16px 12px 14px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  onLogoHover(logo);
                  e.currentTarget.style.borderColor = '#fe3c01';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(254, 60, 1, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Icon Image */}
                <div
                  style={{
                    width: '52%',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {logo.icon ? (
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                      loading="lazy"
                      draggable={false}
                    />
                  ) : (
                    /* Fallback generic code icon */
                    <svg viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  )}
                </div>

                {/* Skill Name & Domain Tag */}
                <div
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#111111',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {logo.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 9,
                      fontWeight: 500,
                      color: 'rgba(17, 17, 17, 0.5)',
                      letterSpacing: '0.04em',
                      textTransform: 'lowercase',
                    }}
                  >
                    {logo.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="items-center overflow-hidden"
      style={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className="w-full max-w-6xl flex flex-col gap-y-6"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '24px',
        }}
      >
        <Marquee logos={filteredRow1} direction="forwards" />
        <Marquee logos={filteredRow2} direction="reverse" />
      </div>
    </div>
  );
}

export default Logomarquee;
