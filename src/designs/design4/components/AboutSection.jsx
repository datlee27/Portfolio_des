import React, { useEffect, useRef } from 'react';
import { aboutData } from '../data/homeData';

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="d4-about"
      ref={sectionRef}
      style={{
        ...styles.section,
        opacity: 0,
        transform: 'translateY(40px)',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div style={styles.container}>
        {/* Label */}
        <span style={styles.label}>{aboutData.label}</span>

        {/* Heading */}
        <h2 style={styles.heading}>{aboutData.heading}</h2>

        {/* Content grid */}
        <div style={styles.grid}>
          <div style={styles.textCol}>
            {aboutData.paragraphs.map((p, i) => (
              <p key={i} style={styles.paragraph}>{p}</p>
            ))}
          </div>

          <div style={styles.statsCol}>
            {aboutData.highlights.map((h, i) => (
              <div key={i} style={styles.stat}>
                <span style={styles.statValue}>{h.value}</span>
                <span style={styles.statLabel}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '120px 0',
    background: '#fff',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 48px',
  },
  label: {
    display: 'inline-block',
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#ababab',
    marginBottom: 24,
  },
  heading: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 'clamp(28px, 4vw, 48px)',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    color: '#000',
    maxWidth: 720,
    marginBottom: 64,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 80,
    alignItems: 'start',
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  paragraph: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    lineHeight: 1.75,
    color: '#555',
    margin: 0,
  },
  statsCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,
    paddingTop: 8,
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  statValue: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 48,
    fontWeight: 800,
    letterSpacing: '-0.03em',
    color: '#000',
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 400,
    color: '#ababab',
    letterSpacing: '0.02em',
  },
};
