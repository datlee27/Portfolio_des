import React, { useState } from 'react';
import { projectsData } from '../data/homeData';

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="d4-work" style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.label}>Selected Work</span>
          <h2 style={styles.heading}>
            Projects that <span style={styles.accentItalic}>speak</span>
          </h2>
        </div>

        {/* Project List */}
        <div style={styles.list}>
          {projectsData.map((project) => (
            <div
              key={project.id}
              style={{
                ...styles.projectRow,
                opacity: hoveredId && hoveredId !== project.id ? 0.3 : 1,
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={styles.projectLeft}>
                <span style={styles.projectIndex}>
                  {String(project.id).padStart(2, '0')}
                </span>
                <h3 style={styles.projectTitle}>{project.title}</h3>
              </div>

              <div style={styles.projectRight}>
                <span style={styles.projectCategory}>{project.category}</span>
                <span style={styles.projectYear}>{project.year}</span>
                <span
                  style={{
                    ...styles.projectDot,
                    background: project.color,
                  }}
                />
              </div>

              {/* Hover accent line */}
              <div
                style={{
                  ...styles.hoverLine,
                  background: project.color,
                  transform: hoveredId === project.id ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '120px 0',
    background: '#000',
    color: '#fff',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 48px',
  },
  header: {
    marginBottom: 80,
  },
  label: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#ababab',
    marginBottom: 16,
  },
  heading: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 'clamp(36px, 5vw, 64px)',
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: '#fff',
    margin: 0,
  },
  accentItalic: {
    fontFamily: "'EB Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 600,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  projectRow: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '36px 0',
    borderTop: '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer',
    transition: 'opacity 0.4s ease',
  },
  projectLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  projectIndex: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 400,
    color: '#666',
    minWidth: 28,
  },
  projectTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 'clamp(24px, 3vw, 42px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    margin: 0,
    lineHeight: 1.1,
  },
  projectRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  projectCategory: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: '#ababab',
  },
  projectYear: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: '#666',
  },
  projectDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    flexShrink: 0,
  },
  hoverLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    transformOrigin: 'left',
    transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
  },
};
