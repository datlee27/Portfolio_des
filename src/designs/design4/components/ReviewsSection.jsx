import React from 'react';
import { reviewsData } from '../data/homeData';

export default function ReviewsSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.label}>Testimonials</span>
          <h2 style={styles.heading}>
            Kind <span style={styles.accentItalic}>words</span>
          </h2>
        </div>

        <div style={styles.grid}>
          {reviewsData.map((review) => (
            <div key={review.id} style={styles.card}>
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.quote}>{review.quote}</p>
              <div style={styles.author}>
                <span style={styles.authorName}>{review.author}</span>
                <span style={styles.authorRole}>{review.role}</span>
              </div>
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
    background: '#fafafa',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 32,
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    padding: '40px 32px 32px',
    border: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
    cursor: 'default',
  },
  quoteIcon: {
    fontFamily: "'EB Garamond', serif",
    fontSize: 64,
    lineHeight: 0.6,
    color: '#fe3c01',
    fontWeight: 700,
  },
  quote: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    lineHeight: 1.7,
    color: '#333',
    margin: 0,
    flex: 1,
  },
  author: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderTop: '1px solid #e0e0e0',
    paddingTop: 16,
  },
  authorName: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: '#000',
  },
  authorRole: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: '#ababab',
  },
};
