import React from 'react';
import { Code, Sparkles } from 'lucide-react';
import { siteMeta, defaultJourney } from '../../data/homeData';
import { usePortfolio } from '../../../../context/PortfolioContext';
import FooterSection from '../common/FooterSection';

export default function AboutPage({ onGoHome }) {
  const { experience } = usePortfolio();
  const journeyItems = (Array.isArray(experience) && experience.length > 0) ? experience : defaultJourney;

  const containerStyle = {
    maxWidth: '1160px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 48px)',
  };

  return (
    <div
      style={{
        backgroundColor: '#F6F4EF',
        color: '#111111',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '60px',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <main style={{ width: '100%' }}>
        {/* ─── HERO SECTION ─── */}
        <section style={{ backgroundColor: '#F6F4EF', paddingBottom: 'clamp(56px, 8vw, 90px)' }}>
          <div style={containerStyle}>
          {/* Availability bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: 'rgba(17, 17, 17, 0.58)',
              marginBottom: '28px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#059669',
                boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.2)',
              }}
            />
            <span>available for select engineering roles & architectural contracts</span>
            <span style={{ color: 'rgba(17, 17, 17, 0.25)' }}>/</span>
            <span style={{ color: 'rgba(17, 17, 17, 0.45)' }}>[2026]</span>
          </div>

          {/* Giant Lowercase Display Headline */}
          <h1
            style={{
              fontSize: 'clamp(44px, 8.5vw, 104px)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 0.94,
              color: '#111111',
              textTransform: 'lowercase',
              margin: '0 0 20px 0',
            }}
          >
            about dat le
            <span style={{ color: 'rgba(17, 17, 17, 0.4)', fontWeight: 300 }}>*</span>
          </h1>

          {/* Footnote Below Headline */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              color: 'rgba(17, 17, 17, 0.58)',
              letterSpacing: '-0.01em',
              margin: '0 0 32px 0',
            }}
          >
            *software engineer & technical artisan based in da nang, vietnam.
          </p>

          {/* Pill Outline Tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '48px',
            }}
          >
            {['fullstack', 'clean architecture', 'da nang, vietnam', 'gmt +7'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(17, 17, 17, 0.15)',
                  fontSize: '12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'rgba(17, 17, 17, 0.65)',
                  backgroundColor: 'transparent',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Editorial Statement Sentence with Inline Badges */}
          <div
            style={{
              fontSize: 'clamp(20px, 3.2vw, 36px)',
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: '-0.02em',
              color: '#111111',
              maxWidth: '920px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(17, 17, 17, 0.12)',
            }}
          >
            i build scalable digital products{' '}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
                margin: '0 6px',
                padding: '3px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(17, 17, 17, 0.15)',
                backgroundColor: '#ece8de',
                fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                gap: '6px',
              }}
            >
              <img
                src={siteMeta.avatarUrl}
                alt="Dat Le"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                }}
              />
              <span style={{ fontSize: '11px', color: 'rgba(17, 17, 17, 0.6)' }}>dat</span>
            </span>{' '}
            with clean code{' '}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
                margin: '0 6px',
                padding: '3px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(17, 17, 17, 0.15)',
                backgroundColor: '#ece8de',
                fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                gap: '5px',
              }}
            >
              <Code size={13} style={{ color: '#111111' }} />
              <span style={{ fontSize: '11px', color: 'rgba(17, 17, 17, 0.6)' }}>src</span>
            </span>{' '}
            and thoughtful systems{' '}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
                margin: '0 6px',
                padding: '3px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(17, 17, 17, 0.15)',
                backgroundColor: '#ece8de',
                fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                gap: '5px',
              }}
            >
              <Sparkles size={12} style={{ color: '#b45309' }} />
              <span style={{ fontSize: '11px', color: 'rgba(17, 17, 17, 0.6)' }}>vn</span>
            </span>{' '}
            that make real-world impact.
          </div>
          </div>
        </section>

        {/* ─── 01 // PHILOSOPHY* ─── */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            padding: 'clamp(72px, 8vw, 110px) 0',
            borderTop: '1px solid rgba(17, 17, 17, 0.08)',
            borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
          }}
        >
          <div style={containerStyle}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
              }}
            >
            {/* Sidebar Column */}
            <div style={{ maxWidth: '320px' }}>
              <h2
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(17, 17, 17, 0.55)',
                  margin: '0 0 16px 0',
                }}
              >
                01 // philosophy*
              </h2>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'rgba(17, 17, 17, 0.4)',
                  lineHeight: 1.8,
                }}
              >
                core manifesto
                <br />
                deterministic design
                <br />
                system durability
              </div>
            </div>

            {/* Content Column */}
            <div
              style={{
                maxWidth: '640px',
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'rgba(17, 17, 17, 0.82)',
              }}
            >
              <p style={{ margin: '0 0 28px 0', fontSize: '18px', lineHeight: 1.6, color: '#111111', fontWeight: 450 }}>
                my work begins at the intersection of architectural discipline and tactile digital craft.
                i focus on predictable data flows, responsive interfaces, and systems built to last.
              </p>

              {/* Quote Block */}
              <blockquote
                style={{
                  margin: '36px 0',
                  paddingLeft: '24px',
                  borderLeft: '2px solid #111111',
                  fontSize: 'clamp(20px, 2.5vw, 24px)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  fontStyle: 'italic',
                }}
              >
                “software should be transparent, observable, and stripped of unnecessary ornament.”
              </blockquote>

              <p style={{ margin: 0, color: 'rgba(17, 17, 17, 0.65)' }}>
                based in da nang, vietnam, i collaborate with teams worldwide on fullstack systems—from high-throughput spring backends to fluid react interfaces.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* ─── 02 // JOURNEY* ─── */}
        <section
          style={{
            backgroundColor: '#F6F4EF',
            padding: 'clamp(72px, 8vw, 110px) 0',
          }}
        >
          <div style={containerStyle}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
              }}
            >
            {/* Sidebar Column */}
            <div style={{ maxWidth: '320px' }}>
              <h2
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(17, 17, 17, 0.55)',
                  margin: '0 0 16px 0',
                }}
              >
                02 // journey*
              </h2>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'rgba(17, 17, 17, 0.4)',
                  lineHeight: 1.8,
                }}
              >
                academic foundation
                <br />
                technical milestone logs
              </div>
            </div>

            {/* Timeline Rows */}
            <div style={{ maxWidth: '720px', width: '100%' }}>
              {journeyItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  style={{
                    padding: '24px 0',
                    borderTop: idx === 0 ? 'none' : '1px solid rgba(17, 17, 17, 0.12)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#111111',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.place || item.company}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'rgba(17, 17, 17, 0.55)',
                        marginTop: '4px',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.role || item.title}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      color: 'rgba(17, 17, 17, 0.55)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.period}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        {/* ─── 03 // CRAFT TAXONOMY* ─── */}
        <section
          style={{
            backgroundColor: '#ECE8DE',
            padding: 'clamp(72px, 8vw, 110px) 0',
            borderTop: '1px solid rgba(17, 17, 17, 0.08)',
            borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
          }}
        >
          <div style={containerStyle}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
              }}
            >
            {/* Sidebar Column */}
            <div style={{ maxWidth: '320px' }}>
              <h2
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(17, 17, 17, 0.55)',
                  margin: '0 0 16px 0',
                }}
              >
                03 // craft taxonomy*
              </h2>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'rgba(17, 17, 17, 0.4)',
                  lineHeight: 1.8,
                }}
              >
                verified toolchains
                <br />
                operational competencies
              </div>
            </div>

            {/* Taxonomy Rows */}
            <div style={{ maxWidth: '720px', width: '100%' }}>
              {[
                {
                  code: '(01)',
                  category: 'frontend',
                  items: [
                    ['01.01', 'react'],
                    ['01.02', 'typescript'],
                    ['01.03', 'next.js'],
                    ['01.04', 'tailwind css'],
                    ['01.05', 'html5 / dom api'],
                    ['01.06', 'state & caching'],
                  ],
                },
                {
                  code: '(02)',
                  category: 'backend',
                  items: [
                    ['02.01', 'spring boot'],
                    ['02.02', 'java'],
                    ['02.03', 'sql & postgresql'],
                    ['02.04', 'rest api'],
                    ['02.05', 'spring security'],
                    ['02.06', 'orm & hibernate'],
                  ],
                },
                {
                  code: '(03)',
                  category: 'tools & systems',
                  items: [
                    ['03.01', 'git & github'],
                    ['03.02', 'vite'],
                    ['03.03', 'figma'],
                    ['03.04', 'docker'],
                    ['03.05', 'postman'],
                    ['03.06', 'linux / zsh'],
                  ],
                },
              ].map((group, idx) => (
                <div
                  key={idx}
                  style={{
                    paddingBottom: '28px',
                    marginBottom: '28px',
                    borderBottom: idx === 2 ? 'none' : '1px solid rgba(17, 17, 17, 0.12)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#111111',
                      marginBottom: '16px',
                    }}
                  >
                    <span>{group.code}</span>
                    <span style={{ letterSpacing: '0.05em' }}>{group.category}</span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                      gap: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                    }}
                  >
                    {group.items.map(([num, name]) => (
                      <div key={num} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ color: 'rgba(17, 17, 17, 0.4)' }}>{num}</span>
                        <span style={{ color: '#111111' }}>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── 04 // SYNCHRONIZED FOOTER COMPONENT ─── */}
      <FooterSection />
    </div>
  );
}
