import React, { useState } from 'react';
import { servicesData } from '../data/homeData';

export default function ServicesSection() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="d4-services" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.label}>Services</span>
          <h2 style={styles.heading}>
            What I <span style={styles.accentItalic}>do</span>
          </h2>
        </div>

        <div style={styles.list}>
          {servicesData.map((service) => {
            const isOpen = expandedId === service.id;
            return (
              <div
                key={service.id}
                style={styles.row}
                onClick={() => setExpandedId(isOpen ? null : service.id)}
              >
                <div style={styles.rowHeader}>
                  <div style={styles.rowLeft}>
                    <span style={styles.icon}>{service.icon}</span>
                    <h3 style={styles.serviceTitle}>{service.title}</h3>
                  </div>
                  <span
                    style={{
                      ...styles.toggle,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </div>

                <div
                  style={{
                    ...styles.expandable,
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? 20 : 0,
                  }}
                >
                  <p style={styles.description}>{service.description}</p>
                </div>
              </div>
            );
          })}
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
  header: {
    marginBottom: 64,
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
    color: '#000',
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
  row: {
    padding: '32px 0',
    borderTop: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  rowHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  icon: {
    fontSize: 20,
    color: '#fe3c01',
    width: 32,
    textAlign: 'center',
  },
  serviceTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 'clamp(20px, 2.5vw, 32px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#000',
    margin: 0,
  },
  toggle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 28,
    fontWeight: 300,
    color: '#ababab',
    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), color 0.2s ease',
    userSelect: 'none',
  },
  expandable: {
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    paddingLeft: 52,
  },
  description: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    lineHeight: 1.7,
    color: '#666',
    maxWidth: 560,
    margin: 0,
  },
};
